import { atom, atomFamily, selector } from "recoil";
import { IFlowItem } from "../interface/FlowItemInterfaces";

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
