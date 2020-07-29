import { useRecoilValue, useRecoilState } from "recoil";

import { FlowItemsStore, FlowItemStore, GetFlowItemsSelector } from "../stores";

export const useFlowItems = () => {
    return useRecoilValue(FlowItemsStore);
}

export const useFlowItem = (id: string) => {
    return useRecoilState(FlowItemStore(id));
}

export const useFlowItemsCompleteSelector = () => {
    return useRecoilValue(GetFlowItemsSelector);
}
