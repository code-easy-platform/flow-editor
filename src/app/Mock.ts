import { IconFlowStart, IconFlowIf, IconFlowForeach, IconFlowAction, IconFlowAssign } from 'code-easy-components';

import { IFlowItem, EFlowItemType } from "./flow-editor/shared/interfaces/FlowItemInterfaces";
import { ItemType } from './flow-editor/shared/enums/ItemType';

export const ItemsLogical: IFlowItem[] = [
    { id: '1', itemType: ItemType.START, isEnabledNewConnetion: true, connections: [{ id: '110', targetId: '2', originId: '1', connectionLabel: 'Linha 01', connectionDescription: 'Descrição da linha 01' }], icon: IconFlowStart, label: 'Start', description: 'Minha descrição legal', flowItemType: EFlowItemType.acorn, left: 105, top: 100, height: 40, width: 40 },
    { id: '2', itemType: ItemType.IF, isEnabledNewConnetion: true, connections: [{ id: '111', targetId: '3', originId: '2' }], icon: IconFlowIf, label: 'If', description: 'Minha descrição legal', flowItemType: EFlowItemType.acorn, left: 105, top: 250, height: 40, width: 40 },
    { id: '3', itemType: ItemType.FOREACH, isEnabledNewConnetion: true, connections: [{ id: '112', targetId: '4', originId: '3' }], icon: IconFlowForeach, label: 'Foreach', description: 'Minha descrição legal', flowItemType: EFlowItemType.acorn, left: 105, top: 400, height: 40, width: 40 },
    { id: '4', itemType: ItemType.ACTION, isEnabledNewConnetion: true, connections: [{ id: '113', targetId: '5', originId: '4' }], icon: IconFlowAction, label: 'Action', description: 'Minha descrição legal', flowItemType: EFlowItemType.acorn, left: 105, top: 550, height: 40, width: 40 },
    { id: '5', itemType: ItemType.ASSIGN, isEnabledNewConnetion: true, connections: [{ id: '114', targetId: '4', originId: '5', connectionLabel: 'Linha 05', connectionDescription: 'Descrição da linha 01' }], icon: IconFlowAssign, label: 'Assign', description: 'Minha descrição legal', flowItemType: EFlowItemType.acorn, left: 105, top: 700, height: 40, width: 40 },
    { id: '6', itemType: ItemType.COMMENT, isEnabledNewConnetion: true, connections: [], description: 'Write here \n your comment', flowItemType: EFlowItemType.comment, left: 210, top: 200 },
]
