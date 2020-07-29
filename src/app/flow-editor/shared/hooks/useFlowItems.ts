import { useRecoilValue, useRecoilState, useRecoilCallback } from "recoil";

import { FlowItemsStore, FlowItemStore, GetFlowItemsSelector, GetSelectedFlowItemsSelector, ConfigurationsStore, GetBoardSize } from "../stores";

export const useFlowItems = () => {
    return useRecoilValue(FlowItemsStore);
}

export const useFlowItem = (id: string) => {
    return useRecoilState(FlowItemStore(id));
}

export const useFlowItemsCompleteSelector = () => {
    return useRecoilValue(GetFlowItemsSelector);
}

export const useSelectedFlowItemsSelector = () => {
    return useRecoilValue(GetSelectedFlowItemsSelector);
}

export const useBoardSize = () => {
    return useRecoilValue(GetBoardSize);
}

export const useDragAllElements = () => useRecoilCallback(({ snapshot, set }) => async (targetId: string | undefined, top: number, left: number) => {
    const { snapGridWhileDragging } = await snapshot.getPromise(ConfigurationsStore);

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
