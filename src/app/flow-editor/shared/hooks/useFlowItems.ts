import { set, useObserverValue } from "react-observing";

import { FlowItemsState } from "../stores";

/**
 * DragAll allow you drag all elements selecteds in the board.
 */
export const useDragAllElements = () => (targetId: string | undefined, top: number, left: number, snapGridWhileDragging: boolean | undefined) => {

    // Pega do selector todos os selecionados
    const selectedItems = FlowItemsState.value.filter(item => item.isSelected?.value);
    console.log(selectedItems)
    console.log(top, left)

    // Encontra o item alvo do mouse
    const targetItem = selectedItems.find(selectedItem => selectedItem.id.value === targetId);
    if (!targetItem) return;

    // Valida se o usuário optou pela ajuda no encaixe na grid
    if (snapGridWhileDragging) {
        top = Math.round(top / 15) * 15;
        left = Math.round(left / 15) * 15;

        // Valida se realmente houve alguma mudança
        if (targetItem.top.value === top && targetItem.left.value === left) return;
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

        let newCompLeft = !stop.left ? comp.left.value + (left - old.left.value) : comp.left;
        let newCompTop = !stop.top ? comp.top.value + (top - old.top.value) : comp.top;

        // Garante que um item não seja arrastado para posições negativas
        if (newCompTop < 0) {
            newCompTop = oldCompTop;
            stop.top = true;
        }

        if (newCompLeft < 0) {
            newCompLeft = oldCompLeft;
            stop.left = true;
        }

        set(comp.top, newCompTop);
        set(comp.left, newCompLeft);
    });
};

export const useSelectItemById = () => (id: string | undefined, keepSelecteds: boolean) => {

    // Get all selecteds items
    const items = FlowItemsState.value;

    if (keepSelecteds) {
        items.forEach(_item => {
            if (_item.id.value === id) {
                if (_item.isSelected) {
                    set(_item.isSelected, true);
                }

            } else if (_item.connections) {
                _item.connections.value.forEach(connection => {
                    if (connection.id.value === id) {
                        set(connection.isSelected, !connection.isSelected.value);
                    }
                });
            }
        });
    } else {
        // Serve para o caso de você clicar em um item que que já está selecionado, deve ser mantida a seleção de todos
        const keepMULTselect = items.filter(item => item.isSelected.value).some(item => item.id.value === id);

        if (!keepMULTselect) {

            items.forEach(item => {

                if (item.isSelected && item.id.value === id) {
                    set(item.isSelected, true);
                    item.connections?.value.forEach(conection => {
                        set(conection.isSelected, true);
                    });
                } else {
                    item.connections?.value.forEach(connection => {
                        if (connection.id.value === id) {
                            set(connection.isSelected, true);
                        } else {
                            set(connection.isSelected, false);
                        }
                    });

                    if (item.isSelected) {
                        set(item.isSelected, false);
                    }
                }
            });
        }
    }
};

export const useCreateOrUpdateConnection = () => (
    /**
     * Id on the line being changed.
     * 
     * If creating a new line, this property will be empty 
     */
    connectionId: string | undefined,
    /**
     * Line source item identifier
     */
    originItemId: string,
    /**
     * Line target item identifier
     */
    targetItemId: string
) => {

    /**
     *
     * If the "connectionId" is undefined it means that a new connection is being created
     * 
     */

    // Validate that you are connecting to yourself
    if (originItemId === targetItemId) return false;

    // Find all items from the board
    const items = FlowItemsState.value;

    /** Validates that the target item does exist */
    if (!items.some(item => item.id.value === targetItemId)) return false;

    // Validates that the source item is already connected
    if (items.some(item => item.id.value === originItemId && (item.connections?.value || []).some(connection => connection.targetId.value === targetItemId))) return false;

    /*     let lines = await snapshot.getPromise(FlowLinesStore);
    
        set(FlowItemStore(originItemId), ({ connections = [], ...itemCurrent }) => {
    
            // Validates whether you are creating a new connection or just editing an existing one
            if (connectionId) {
    
                lines = [
                    ...lines.map(line =>
                        (line.id === connectionId)
                            ? ({ ...line, targetId: targetItemId })
                            : line
                    ),
                ];
    
                return {
                    ...itemCurrent,
                    connections: connections.map(connection => {
                        if (connection.id === connectionId) {
                            connection = {
                                ...connection,
                                targetId: targetItemId
                            };
                        }
                        return connection;
                    }),
                };
            } else {
                const newConnectionId = Utils.getUUID();
                lines = [
                    ...lines,
                    {
                        id: newConnectionId,
                        originId: originItemId,
                        targetId: targetItemId,
                    }
                ];
    
                return {
                    ...itemCurrent,
                    connections: [
                        ...connections,
                        {
                            originId: originItemId,
                            targetId: targetItemId,
                            id: newConnectionId,
                            isSelected: false,
                        }
                    ]
                };
            }
        }); */

    // If has changed connection or create
    return true;
};

export const useSizeByText = () => (text: string) => {

    const span = document.createElement("div");
    document.body.appendChild(span);
    span.style.whiteSpace = 'pre-line';
    span.style.position = 'absolute';
    span.style.lineHeight = '14px';
    span.style.textAlign = 'start';
    span.style.fontSize = 'small';
    span.style.height = 'auto';
    span.style.width = 'auto';
    span.innerText = text;

    const formattedWidth = span.clientWidth;
    const formattedHeight = span.clientHeight;

    document.body.removeChild(span);

    return {
        width: formattedWidth,
        height: formattedHeight,
    };
};

export const useBoardSize = () => {
    const flowItems = useObserverValue(FlowItemsState);

    try {
        return {
            width: flowItems.length > 0 ? flowItems.sort((a, b) => b.left.value - a.left.value)[0].left.value + 200 : 0,
            height: flowItems.length > 0 ? flowItems.sort((a, b) => b.top.value - a.top.value)[0].top.value + 300 : 0,
        }
    } catch (e) {
        console.log(e)
        return {
            width: 0,
            height: 0,
        }
    }
};