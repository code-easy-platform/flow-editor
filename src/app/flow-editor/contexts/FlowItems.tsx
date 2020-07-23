import React, { createContext, useState, useCallback, useContext, memo } from 'react';

import { IFlowItem } from '../../code-editor/shared/Interfaces';

interface IFlowItemsContextData {
    setItems(items: IFlowItem[]): void;
    items: IFlowItem[];
    boardSize: {
        width: number,
        height: number,
    }
}

const FlowItemsContext = createContext<IFlowItemsContextData>({} as IFlowItemsContextData);

export const FlowItemsProvider: React.FC<{ items: IFlowItem[] }> = memo(({ children, items }) => {

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

    const [state, setState] = useState<IFlowItemsContextData>({
        boardSize: getBoardSize(items),
        setItems: setItems,
        items,
    });

    return (
        <FlowItemsContext.Provider value={state} >
            {children}
        </FlowItemsContext.Provider>
    );
});

export const useFlowItems = () => useContext(FlowItemsContext);
