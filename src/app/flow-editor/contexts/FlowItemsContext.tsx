import React, { createContext, useState, useCallback, useContext, memo } from 'react';

import { IFlowItem } from './../shared/interfaces/FlowItemInterfaces';
import { useConfigs } from './Configurations';

interface IFlowItemsContextData {

    /**
     * Depois que um elemento já está na tela, esta função muda a posição dele!
     * @param targetId Source element that is triggering the event
     * @param mousePositionTop Posição do mouse com relação ao topo(top) do quadro do editor
     * @param mousePositionLeft Posição do mouse com relação a esquerda(left) do quadro do editor
     */
    changePosition(targetId: string | undefined, top: number, left: number): void;
    /** Toggle isSelected prop from a element by their id */
    selectItemById(id: string | undefined, keepSelecteds?: boolean): void;
    setItemById(id: string | undefined, item: IFlowItem): void;
    setItems(items: IFlowItem[]): void;
    removeSelection(): void;
    /** Select all items from the board */
    selectAll(): void;
    items: IFlowItem[];
    boardSize: {
        width: number,
        height: number,
    }
}

const FlowItemsContext = createContext<IFlowItemsContextData>({} as IFlowItemsContextData);

export const FlowItemsProvider: React.FC<{ items: IFlowItem[] }> = memo(({ children, items }) => {
    const { snapGridWhileDragging } = useConfigs();

    const getBoardSize = useCallback((flowItems: IFlowItem[]) => {
        return {
            width: flowItems.length > 0 ? flowItems.sort((a, b) => b.left - a.left)[0].left + 200 : 0,
            height: flowItems.length > 0 ? flowItems.sort((a, b) => b.top - a.top)[0].top + 300 : 0,
        }
    }, []);

    const setItems = useCallback((items: IFlowItem[]) => {
        setState(oldState => ({
            ...oldState,
            items
        }));
    }, []);

    const setItemById = useCallback((id: string | undefined, item: IFlowItem) => {
        if (!id) return;

        setState(oldState => {
            let itemById = oldState.items.find(_item => _item.id === id);

            if (itemById) itemById = item;

            return { ...oldState, items: oldState.items };
        });
    }, []);

    const selectItemById = useCallback((id: string | undefined, keepSelecteds?: boolean) => {
        if (!id) return;

        setState(oldState => {
            if (keepSelecteds) {
                oldState.items.forEach(_item => {
                    if (_item.id === id) {
                        _item.isSelected = !_item.isSelected;
                    }
                });
            } else {
                const flowItemSelecteds = oldState.items.filter(item => item.isSelected);
                const keepMultiselect = flowItemSelecteds.length > 1 && flowItemSelecteds.some(item => item.id === id);

                if (!keepMultiselect) {
                    oldState.items.forEach(item => {
                        if (item.id === id) {
                            item.isSelected = true;
                        } else {
                            item.isSelected = false;
                        }
                    });
                }
            }
            return { ...oldState, items: oldState.items };
        });
    }, []);

    const removeSelection = useCallback(() => {
        setState(oldState => {
            oldState.items.forEach(_item => _item.isSelected = false);
            return { ...oldState };
        });
    }, []);

    const changePosition = useCallback((targetId: string | undefined, top: number, left: number) => {
        setState(oldState => {

            let selectedItems = oldState.items.filter(item => item.isSelected).sort((a, b) => ((a.top + b.top) - (a.left + b.left)));
            const targetItem = selectedItems.find(selectedItem => selectedItem.id === targetId);
            if (!targetItem) return oldState;

            // Valida se o usuário optou pela ajuda no encaixe na grid
            if (snapGridWhileDragging) {
                top = Math.round(top / 15) * 15;
                left = Math.round(left / 15) * 15;

                // Valida se realmente houve alguma mudança
                if (targetItem.top === top && targetItem.left === left) return oldState;
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

                if (!stop.left) comp.left += (left - old.left);
                if (!stop.top) comp.top += (top - old.top);

                // Garante que um item não seja arrastado para posições negativas
                if (comp.top < 0) {
                    comp.top = oldCompTop;
                    stop.top = true;
                }
                if (comp.left < 0) {
                    comp.left = oldCompLeft;
                    stop.left = true;
                }
            });

            return { ...oldState, items: oldState.items, boardSize: getBoardSize(oldState.items) };
        });
    }, [snapGridWhileDragging, getBoardSize]);

    const selectAll = useCallback(() => {
        setState(oldState => {
            oldState.items.forEach(item => item.isSelected = true);
            return { ...oldState, items: oldState.items };
        });
    }, []);

    const [state, setState] = useState<IFlowItemsContextData>({
        boardSize: getBoardSize(items),
        removeSelection,
        changePosition,
        selectItemById,
        setItemById,
        selectAll,
        setItems,
        items,
    });

    return (
        <FlowItemsContext.Provider value={state} >
            {children}
        </FlowItemsContext.Provider>
    );
});

export const useFlowItems = () => useContext(FlowItemsContext);
