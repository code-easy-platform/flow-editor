import { IconFlowStart, IconFlowIf, IconFlowForeach, IconFlowAction, IconFlowAssign } from 'code-easy-components';

import { IFlowItem, EFlowItemType } from "./flow-editor/shared/interface/FlowItemInterfaces";
import { ItemType } from './flow-editor/shared/enums/ItemType';

export const ItemsLogical: IFlowItem[] = [
    { id: '1', itemType: ItemType.START, connections: [{ id: '110', connectionId: '2', connectionLabel: 'Linha 01', connectionDescription: 'Descrição da linha 01' }], icon: IconFlowStart, label: 'Start', description: 'Minha descrição legal', flowItemType: EFlowItemType.acorn, left: 105, top: 100, height: 40, width: 40 },
    { id: '2', itemType: ItemType.IF, connections: [{ id: '111', connectionId: '3' }], icon: IconFlowIf, label: 'Start', description: 'Minha descrição legal', flowItemType: EFlowItemType.acorn, left: 105, top: 250, height: 40, width: 40 },
    { id: '3', itemType: ItemType.FOREACH, connections: [{ id: '112', connectionId: '4' }], icon: IconFlowForeach, label: 'Start', description: 'Minha descrição legal', flowItemType: EFlowItemType.acorn, left: 105, top: 400, height: 40, width: 40 },
    { id: '4', itemType: ItemType.ACTION, connections: [{ id: '113', connectionId: '5' }], icon: IconFlowAction, label: 'Start', description: 'Minha descrição legal', flowItemType: EFlowItemType.acorn, left: 105, top: 550, height: 40, width: 40 },
    { id: '5', itemType: ItemType.ASSIGN, connections: [{ id: '114', connectionId: '4', connectionLabel: 'Linha 05', connectionDescription: 'Descrição da linha 01' }], icon: IconFlowAssign, label: 'Start', description: 'Minha descrição legal', flowItemType: EFlowItemType.acorn, left: 105, top: 700, height: 40, width: 40 },
    { id: '6', itemType: ItemType.COMMENT, connections: [], description: 'Write here \n your comment', flowItemType: EFlowItemType.comment, left: 210, top: 200 },
]
