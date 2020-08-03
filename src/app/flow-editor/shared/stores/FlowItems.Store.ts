import { atom, atomFamily, selector } from "recoil";

import { IFlowItem } from "../interfaces/FlowItemInterfaces";

export const FlowItemsStore = atom<string[]>({
    key: 'flow-items',
    default: []
});

export const FlowItemStore = atomFamily<IFlowItem, string>({
    key: 'flow-item',
    default: {} as IFlowItem,
});

export const GetFlowItemsSelector = selector<IFlowItem[]>({
    key: 'get-flow-items',
    get: ({ get }) => get(FlowItemsStore).map((id) => get(FlowItemStore(id))),
});

export const GetSelectedFlowItemsSelector = selector<IFlowItem[]>({
    key: 'get-selecteds-flow-items',
    get: ({ get }) => {
        return get(FlowItemsStore)
            .map((id) => get(FlowItemStore(id)))
            .filter(item => (
                item.isSelected ||
                (item.connections || []).some(connection => connection.isSelected)
            ));
    },
});

export const GetBoardSize = selector<{ width: number, height: number }>({
    key: 'get-board-size',
    get: ({ get }) => {
        const flowItems = get(GetFlowItemsSelector).map(item => item);

        try {
            return {
                width: flowItems.length > 0 ? flowItems.sort((a, b) => b.left - a.left)[0].left + 200 : 0,
                height: flowItems.length > 0 ? flowItems.sort((a, b) => b.top - a.top)[0].top + 300 : 0,
            }
        } catch (e) {
            console.log(e)
            return {
                width: 0,
                height: 0,
            }
        }
    }
});

export const GetFlowItemsConnections = selector<{ id: string | undefined, originId: string | undefined, targetId: string | undefined }[]>({
    key: 'get-flow-items-connection',
    get: ({ get }) => {
        let res: any[] = [];
        get(GetFlowItemsSelector).forEach(({ connections }) => {
            res = [
                ...res,
                ...(connections || []).map(({ id, originId, targetId }) => ({ id, originId, targetId, })),
            ];
        });
        return res;
    }
});
