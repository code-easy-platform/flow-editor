import { atom, atomFamily, selector } from "recoil";

import { IFlowItem } from "../interfaces/FlowItemInterfaces";

export const FlowItemsStore = atom<string[]>({
    key: 'flow-items',
    default: []
});

export const LinesStore = atom<string[]>({
    key: 'lines',
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
            .filter(item => item.isSelected);
    },
});

export const GetBoardSize = selector<{ width: number, height: number }>({
    key: 'get-board-size',
    get: ({ get }) => {
        const flowItems = get(GetFlowItemsSelector);

        // console.log(flowItems/* .sort((a, b) => b.top - a.top) */)

        try {
            const maiorTop = flowItems.sort((a, b) => b.top - a.top).shift();
            const maiorLeft = flowItems.sort((a, b) => b.left - a.left).shift();

            return {
                width: maiorLeft ? maiorLeft.left + 200 : 0,
                height: maiorTop ? maiorTop.top + 300 : 0,
            }
        } catch (e) {
            //console.log(e)
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
        get(GetFlowItemsSelector).forEach(({ connections, isEnabledNewConnetion, id }) => {
            res = [
                ...res,
                ...(connections || []).map(({ id, originId, targetId }) => ({ id, originId, targetId, })),
                ...(!isEnabledNewConnetion ? [] : [{ id: undefined, originId: id, targetId: undefined }]),
            ];
        });
        console.log(res)
        return res;
    }
});

/**
 * Aqui vou mapear as connecões para uma atomo de array.
 * Vou criar uma linha dentro de um atomFamily com o estado completo da linha pelo id, validar se é possível montar o estado escutndo apenas pelo ID da linha e ao outros items que compoem o estado da linha
 * Na tela consulto a lista dentro do atomo
 *  No atomo modifico apenas se ouver adição ou deleção de novas linhas
 * Posso criar um seletor para pegar  
 */