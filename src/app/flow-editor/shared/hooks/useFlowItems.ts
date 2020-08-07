import { useRecoilValue, useRecoilState, useRecoilCallback } from "recoil";
import { Utils } from "code-easy-components";

import { FlowItemsStore, FlowItemStore, GetFlowItemsSelector, GetSelectedFlowItemsSelector, GetBoardSizeSelector, FlowLinesStore } from "../stores";
import { IConnection, IFlowItem, ILine } from "../interfaces";

export const useFlowItems = () => {
    return useRecoilValue(FlowItemsStore);
}

export const useFlowItem = (id: string) => {
    return useRecoilState(FlowItemStore(id));
}

export const useFlowItemsCompleteSelector = () => {
    return useRecoilValue(GetFlowItemsSelector);
}

export const useFlowItemsConnetionsSelector = () => {
    return useRecoilValue(FlowLinesStore);
}

export const useSelectedFlowItemsSelector = () => {
    return useRecoilValue(GetSelectedFlowItemsSelector);
}

export const useBoardSize = () => {
    return useRecoilValue(GetBoardSizeSelector);
}

export const useDragAllElements = () => useRecoilCallback(({ snapshot, set }) => async (targetId: string | undefined, top: number, left: number, snapGridWhileDragging: boolean | undefined) => {

    // Pega do selector todos os selecionados
    const selectedItems = await snapshot.getPromise(GetSelectedFlowItemsSelector);

    // Encontra o item alvo do mouse
    const targetItem = selectedItems.find(selectedItem => selectedItem.id === targetId);
    if (!targetItem) return;

    // Valida se o usuário optou pela ajuda no encaixe na grid
    if (snapGridWhileDragging) {
        top = Math.round(top / 15) * 15;
        left = Math.round(left / 15) * 15;

        // Valida se realmente houve alguma mudança
        if (targetItem.top === top && targetItem.left === left) return;
    }

    /** Evita esses valores sejam alterados pela referência entre as variáveis */
    const old = {
        left: targetItem.left,
        top: targetItem.top,
    }

    /** Ajuda a evitar que os item=ns seja amontuados quando arrastados para um dos cantos */
    let stop = {
        left: false,
        top: false,
    }

    // Muda a posição de todos os items que estão selecionados
    selectedItems.forEach(comp => {
        const oldCompLeft = comp.left;
        const oldCompTop = comp.top;

        let newCompLeft = !stop.left ? comp.left + (left - old.left) : comp.left;
        let newCompTop = !stop.top ? comp.top + (top - old.top) : comp.top;

        // Garante que um item não seja arrastado para posições negativas
        if (newCompTop < 0) {
            newCompTop = oldCompTop;
            stop.top = true;
        }

        if (newCompLeft < 0) {
            newCompLeft = oldCompLeft;
            stop.left = true;
        }

        set(FlowItemStore(`${comp.id}`), { ...comp, left: newCompLeft, top: newCompTop });
    });
});

export const useSelectItemById = () => useRecoilCallback(({ snapshot, set }) => async (id: string | undefined, keepSelecteds: boolean) => {

    // Pega todos os selecionados
    const items = await snapshot.getPromise(GetFlowItemsSelector);

    const selectConnection = (connections: IConnection[], hasChange: boolean) => {
        connections = [
            ...connections.map(conection => {
                if (conection.id === id) {
                    hasChange = conection.isSelected !== true;
                    conection = {
                        ...conection,
                        isSelected: true,
                    }
                } else {
                    hasChange = (conection.isSelected !== false && conection.isSelected !== undefined) || hasChange;
                    conection = {
                        ...conection,
                        isSelected: false,
                    }
                }
                return conection;
            }),
        ];
        return { connections, hasChange };
    }

    if (keepSelecteds) {
        items.forEach(_item => {
            let hasChange = false;  

            if (_item.id === id) {

                hasChange = true;
                _item = { ..._item, isSelected: !_item.isSelected };

            } else {
                _item = {
                    ..._item,
                    connections: (_item.connections || []).map(connection => {
                        if (connection.id === id) {
                            hasChange = true;
                            connection = { ...connection, isSelected: !connection.isSelected };
                        }
                        return connection;
                    })
                };
            }

            if (hasChange) {
                set(FlowItemStore(String(_item.id)), _item);
            }
        });
    } else {
        // Serve para o caso de você clicar em um item que que já está selecionado, deve ser mantida a seleção de todos
        const keepMULTselect = items.filter(item => item.isSelected).some(item => item.id === id);

        if (!keepMULTselect) {

            items.forEach(item => {
                let hasChange = false;

                if (item.id === id) {
                    hasChange = item.isSelected !== true;
                    item = { ...item, isSelected: true };

                    item = {
                        ...item,
                        connections: (item.connections || []).map(conection => {
                            hasChange = (conection.isSelected !== false) || hasChange;
                            return {
                                ...conection,
                                isSelected: false
                            };
                        }),
                    };
                } else {
                    hasChange = item.isSelected !== false;

                    const { connections, hasChange: change } = selectConnection(item.connections || [], hasChange);
                    hasChange = change || hasChange;

                    item = {
                        ...item,
                        connections,
                        isSelected: false,
                    };
                }

                if (hasChange) {
                    set(FlowItemStore(String(item.id)), item);
                }
            });
        }
    }
});

export const useCreateOrUpdateConnection = () => useRecoilCallback(({ snapshot, set }) => async (connectionId: string | undefined, originItemId: string | undefined, targetItemId: string | undefined) => {

    /**
     *
     * If the "connectionId" is undefined it means that a new connection is being created
     * 
     */

    // Validate that you are connecting to yourself
    if (originItemId === targetItemId) return false;

    // Find all items from the board
    const items = await snapshot.getPromise(GetFlowItemsSelector);

    /** Validates that the target item does exist */
    if (!items.some(item => item.id === targetItemId)) return false;

    // Validates that the source item is already connected
    if (items.some(item => item.id === originItemId && (item.connections || []).some(connection => connection.targetId === targetItemId))) return false;

    set(FlowItemStore(String(originItemId)), ({ connections = [], ...itemCurrent }) => {

        // Validates whether you are creating a new connection or just editing an existing one
        if (connectionId) {
            connections = connections.map(connection => {
                if (connection.id === connectionId) {
                    connection = {
                        ...connection,
                        targetId: String(targetItemId)
                    };
                }
                return connection;
            });

            set(FlowLinesStore, oldLinesState => {
                return [
                    ...oldLinesState.map(line =>
                        (line.id === connectionId)
                            ? ({ ...line, targetId: String(targetItemId) })
                            : line
                    ),
                ];
            });

        } else {
            const newConnectionId = Utils.getUUID();
            connections = [
                ...connections,
                {
                    originId: String(originItemId),
                    targetId: String(targetItemId),
                    connectionDescription: '',
                    connectionLabel: '',
                    id: newConnectionId,
                    isSelected: false,
                }
            ];

            set(FlowLinesStore, oldLinesState => {
                return [
                    ...oldLinesState,
                    {
                        id: newConnectionId,
                        originId: String(originItemId),
                        targetId: String(targetItemId),
                    }
                ];
            });
        }

        return { ...itemCurrent, connections };
    });

    // If has changed connection or create
    return true;
});

/** Copy selected flow items */
export const useCopySelecteds = () => useRecoilCallback(({ snapshot }) => async () => {
    const selectedFlowItems = await snapshot.getPromise(GetSelectedFlowItemsSelector);
    navigator.clipboard.writeText(JSON.stringify(selectedFlowItems));
});

/** Paste selected flow items */
export const usePasteSelecteds = () => useRecoilCallback(({ snapshot, set }) => async () => {
    try {
        navigator
            .clipboard
            .readText()
            .then(async text => {
                try {
                    // Transforma clipboard text in IFlowItems
                    const components: IFlowItem[] = JSON.parse(text || '[]');

                    // Used to add all new lines
                    let newLines: ILine[] = [];

                    // Getting older ids
                    let itemIds = await snapshot.getPromise(FlowItemsStore);
                    itemIds.forEach(id => {

                        // Deselects all items that were already in the flow
                        set(FlowItemStore(String(id)), oldState => ({ ...oldState, isSelected: false }));
                    });

                    // For each component that was on the clipboard
                    components.forEach((item, index) => {
                        item.top = item.top + 50;
                        item.id = Utils.getUUID();
                        item.left = item.left + 100;

                        // Complete state for the new item
                        item = {
                            ...item,
                            connections: (item.connections || []).map(connection => {

                                // Add new lines
                                if (connection.id && connection.targetId) {
                                    newLines = [
                                        ...newLines,
                                        {
                                            id: connection.id,
                                            originId: String(item.id),
                                            targetId: connection.targetId,
                                        }
                                    ];
                                }

                                return {
                                    ...connection,
                                    originId: String(item.id),
                                };
                            }),
                        };

                        itemIds = [
                            ...itemIds,
                            String(item.id),
                        ];

                        set(FlowItemStore(String(item.id)), item);
                    });

                    set(FlowItemsStore, itemIds);
                    set(FlowLinesStore, oldLinesState => ([...oldLinesState, ...newLines]));
                } catch (_) { }
            });
    } catch (e) { console.log(e) }
});

export const useSizeByText = () => useRecoilCallback(() => (text: string) => {
    var span = document.createElement("span");
    document.body.appendChild(span);
    span.style.whiteSpace = 'pre-line';
    span.style.position = 'absolute';
    span.style.textAlign = 'start';
    span.style.fontSize = 'small';
    span.style.height = 'auto';
    span.style.width = 'auto';
    span.innerText = text;
    var formattedWidth = Math.ceil(span.clientWidth);
    var formattedHeight = Math.ceil(span.clientHeight);
    document.body.removeChild(span);
    return {
        width: (formattedWidth < 100 ? 100 : formattedWidth) + 10,
        height: (formattedHeight < 70 ? 70 : formattedHeight) + 10,
    };
});
