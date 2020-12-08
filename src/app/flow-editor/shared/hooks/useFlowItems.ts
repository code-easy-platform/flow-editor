import { useEffect, useState } from "react";
import { set, useObserverValue, observe, ISubscription } from "react-observing";
import { Utils } from "code-easy-components";

import { IConnection } from "../interfaces";
import { FlowItemsState } from "../stores";

/**
 * DragAll allow you drag all elements selecteds in the board.
 */
export const useDragAllElements = () => (targetId: string | undefined, top: number, left: number, snapGridWhileDragging: boolean | undefined) => {

    // Encontra todos os item selecionados
    const selectedItems = FlowItemsState.value.filter(item => item.isSelected?.value);

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

    /** Evita que esses valores sejam alterados pela referência entre as variáveis */
    const old = {
        left: targetItem.left.value,
        top: targetItem.top.value,
    }

    /** Ajuda a evitar que os items sejam amontuados quando arrastados para um dos cantos */
    let stop = {
        left: false,
        top: false,
    }

    // Muda a posição de todos os items que estão selecionados
    selectedItems.forEach(comp => {
        const oldCompLeft = comp.left.value;
        const oldCompTop = comp.top.value;

        // Find the new postions
        let newCompLeft = !stop.left ? comp.left.value + (left - old.left) : comp.left.value;
        let newCompTop = !stop.top ? comp.top.value + (top - old.top) : comp.top.value;

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

// Se undefined desmarca todos
export const useSelectItemById = () => (id: string | undefined, isPressedCtrlKey: boolean) => {
    const items = FlowItemsState.value;

    if (isPressedCtrlKey) {
        items.forEach(item => {
            if (item.id.value === id) {
                set(item.isSelected, !item.isSelected.value);
            } else {
                item.connections.value.forEach(connection => {
                    if (connection.id.value === id) {
                        set(connection.isSelected, !connection.isSelected.value);
                    }
                });
            }
        });
    } else {

        // Serve para o caso de você clicar em um item que que já está selecionado, deve ser mantida a seleção de todos
        const keepSelection = items.some(item => (
            (item.isSelected.value && item.id.value === id) ||
            (item.connections.value.some(conn => conn.isSelected.value && conn.id.value === id))
        ));

        if (!keepSelection) {
            items.forEach(item => {
                set(item.isSelected, item.id.value === id);
                item.connections.value.forEach(conn => set(conn.isSelected, conn.id.value === id));
            });
        }
    }
};

export const useDeleteSelecteds = () => () => {
    const items = FlowItemsState.value;
    const itemsSelecteds = FlowItemsState.value.filter(item => item.isSelected.value);

    if (items.some(item => item.isSelected.value)) {

        items.forEach(item => {
            set(item.connections, oldConns => ([
                ...oldConns.filter(oldConn => !itemsSelecteds.some(selectedItem => selectedItem.id.value === oldConn.targetId.value))
            ]));
        });

        set(FlowItemsState, [
            ...items.filter(item => !item.isSelected.value)
        ]);

    }

    items.forEach(item => {
        if (item.connections.value.some(conn => conn.isSelected.value)) {
            set(item.connections, oldConns => oldConns.filter(oldConn => !oldConn.isSelected.value));
        }
    });
}

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
    if (originItemId === targetItemId) return;

    // Find all items from the board
    const items = FlowItemsState.value;

    /** Validates that the target item does exists */
    if (!items.some(item => item.id.value === targetItemId)) return;

    // Validates that the source item is already connected
    if (items.some(item => item.id.value === originItemId && (item.connections.value || []).some(connection => connection.targetId.value === targetItemId))) return;

    // Validates whether you are creating a new connection or just editing an existing one
    if (connectionId) {
        const originItem = FlowItemsState.value.find(item => item.id.value === originItemId);
        if (!originItem) return;

        originItem.connections.value.forEach(connection => {
            if (connection.id.value === connectionId) {
                set(connection.targetId, targetItemId);
            }
        });

        set(originItem.connections, originItem.connections.value);
    } else {
        const originItem = FlowItemsState.value.find(item => item.id.value === originItemId);
        if (!originItem) return;

        set<IConnection[]>(originItem.connections, [
            ...originItem.connections.value,
            {
                isSelected: observe(false),
                id: observe(Utils.getUUID()),
                connectionLabel: observe(''),
                targetId: observe(targetItemId),
                originId: observe(originItemId),
                connectionDescription: observe(''),
            }
        ]);
    }
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
    const [coords, setCoords] = useState({ width: 0, height: 0 });
    const items = useObserverValue(FlowItemsState);

    useEffect(() => {
        const subscriptions: ISubscription[] = [];

        items.forEach((item, _, arrayItems) => {
            subscriptions.push(
                item.top.subscribe(top => {
                    setCoords(_coords => {
                        if (!arrayItems.some(item => item.top.value > top)) {
                            return { ..._coords, height: top + 300 };
                        } else {
                            return _coords;
                        }
                    });
                })
            );

            subscriptions.push(
                item.left.subscribe(left => {
                    setCoords(_coords => {
                        if (!arrayItems.some(item => item.left.value > left)) {
                            return { ..._coords, width: left + 300 };
                        } else {
                            return _coords;
                        }
                    });
                })
            );
        });

        return () => subscriptions.forEach(subscrition => subscrition.unsubscribe());
    }, [items]);

    return coords;
};
