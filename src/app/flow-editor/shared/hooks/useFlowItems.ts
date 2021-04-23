import { useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { set, observe, useObserver } from "react-observing";
import { Utils } from "code-easy-components";

import { useConfigs } from "./useConfigurations";
import { IConnection } from "../interfaces";
import { ItemsContext } from "../contexts";
import { useZoom } from "./useZoom";

export const useItems = () => useContext(ItemsContext);


/**
 * DragAll allow you drag all elements selecteds in the board.
 */
export const useDragAllElements = () => {
    const topLeftRedundant = useRef<{ [key: string]: { top: number, left: number } }>({});
    const { snapGridWhileDragging } = useConfigs();
    const itemsStore = useItems();
    const { zoom } = useZoom();

    useEffect(() => {
        const clear = () => {
            topLeftRedundant.current = {};
        }

        window.addEventListener('mouseup', clear);

        return () => {
            window.removeEventListener('mouseup', clear);
        }
    });

    const dragSnapGridSize = useMemo(() => 15, []);

    const snapGrid = useCallback((type: 'X' | 'Y', position: string | undefined, oldMovement: number, newMovement: number) => {
        if (!position) return oldMovement + newMovement;

        if (!snapGridWhileDragging) return oldMovement + newMovement;

        if (type === 'X') {
            topLeftRedundant.current[position].left += newMovement;

            if (topLeftRedundant.current[position].left <= -dragSnapGridSize || topLeftRedundant.current[position].left >= dragSnapGridSize) {
                const movement = oldMovement + topLeftRedundant.current[position].left;
                topLeftRedundant.current[position].left = 0;
                return movement;
            } else {
                return oldMovement;
            }
        } else {
            topLeftRedundant.current[position].top += newMovement;

            if (topLeftRedundant.current[position].top <= -dragSnapGridSize || topLeftRedundant.current[position].top >= dragSnapGridSize) {
                const movement = oldMovement + topLeftRedundant.current[position].top;
                topLeftRedundant.current[position].top = 0;
                return movement;
            } else {
                return oldMovement;
            }
        }
    }, [snapGridWhileDragging, dragSnapGridSize])

    return (movementX: number, movementY: number) => {
        const selectedItems = itemsStore.value.filter(item => item.isSelected?.value);

        selectedItems.forEach(comp => {
            if (!comp.id.value) return;

            if (!topLeftRedundant.current[comp.id.value]) {
                topLeftRedundant.current[comp.id.value] = { left: 0, top: 0 };
            }

            set(comp.top, oldTop => snapGrid('Y', comp.id.value, oldTop, ((movementY / devicePixelRatio) / zoom)));
            set(comp.left, oldLeft => snapGrid('X', comp.id.value, oldLeft, ((movementX / devicePixelRatio) / zoom)));
        });
    }
}

// Se undefined desmarca todos
export const useSelectItemById = () => {
    const itemsStore = useItems();

    return (id: string | undefined, isPressedCtrlKey: boolean) => {
        if (isPressedCtrlKey) {
            itemsStore.value.forEach(item => {
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
            const keepSelection = itemsStore.value.some(item => (
                (item.isSelected.value && item.id.value === id) ||
                (item.connections.value.some(conn => conn.isSelected.value && conn.id.value === id))
            ));

            if (!keepSelection) {
                itemsStore.value.forEach(item => {
                    set(item.isSelected, item.id.value === id);
                    item.connections.value.forEach(conn => set(conn.isSelected, conn.id.value === id));
                });
            }
        }
    }
};

export const useDeleteSelecteds = () => {
    const itemsStore = useItems();
    const [items, setItems] = useObserver(itemsStore);

    return () => {
        const itemsSelecteds = items.filter(item => item.isSelected.value);

        items.forEach(item => {

            // Remove all selecteds lines
            if (item.connections.value.some(conn => conn.isSelected.value)) {
                set(item.connections, oldConns => oldConns.filter(oldConn => !oldConn.isSelected.value));
            }

            // Remove all connections connected with removed item
            set(item.connections, oldConns => ([
                ...oldConns.filter(oldConn => !itemsSelecteds.some(selectedItem => selectedItem.id.value === oldConn.targetId.value))
            ]));
        });

        // Remove all selecteds items
        if (items.some(item => item.isSelected.value)) {
            const newListItems = items.filter(item => !item.isSelected.value);

            setItems(newListItems);

            return newListItems;
        }

        return items;
    };
};

export const useCreateOrUpdateConnection = () => {

    // Find all items from the board
    const itemsStore = useItems();

    return (
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
    ): boolean => {

        /**
         *
         * If the "connectionId" is undefined it means that a new connection is being created
         *
         */

        // Validate that you are connecting to yourself
        if (originItemId === targetItemId) return false;

        /** Validates that the target item does exists */
        if (!itemsStore.value.some(item => item.id.value === targetItemId)) return false;

        // Validates that the source item is already connected
        if (itemsStore.value.some(item => item.id.value === originItemId && (item.connections.value || []).some(connection => connection.targetId.value === targetItemId))) return false;

        // Validates whether you are creating a new connection or just editing an existing one
        if (connectionId) {
            const originItem = itemsStore.value.find(item => item.id.value === originItemId);
            if (!originItem) return false;

            originItem.connections.value.forEach(connection => {
                if (connection.id.value === connectionId) {
                    set(connection.targetId, targetItemId);
                }
            });

            set(originItem.connections, originItem.connections.value);
        } else {
            const originItem = itemsStore.value.find(item => item.id.value === originItemId);
            if (!originItem) return false;

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

        // If has changed connection or create
        return true;
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
