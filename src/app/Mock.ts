import { IconFlowStart, IconFlowIf, IconFlowForeach, IconFlowAction, IconFlowAssign, IconFlowComment, IconFlowEnd, IconFlowSwitch } from 'code-easy-components';

import { IFlowItem } from "./flow-editor/shared/interfaces/FlowItemInterfaces";
import { EItemType } from './flow-editor/shared/enums/EItemType';
import { EFlowItemType } from './flow-editor/shared/enums';

export const ItemsLogical: IFlowItem[] = [
    { id: '1', hasWarning: true, itemType: EItemType.START, isEnabledNewConnetion: true, connections: [{ id: '110', targetId: '2', originId: '1', isSelected: false, connectionLabel: 'Linha 01', connectionDescription: 'Descrição da linha 01' }], icon: IconFlowStart, label: 'Start', description: 'Minha descrição legal', flowItemType: EFlowItemType.acorn, left: 105, top: 100, height: 40, width: 40 },
    { id: '2', hasWarning: true, itemType: EItemType.IF, isEnabledNewConnetion: true, connections: [{ id: '111', targetId: '3', originId: '2', isSelected: false }], icon: IconFlowIf, label: 'If', description: 'Minha descrição legal', flowItemType: EFlowItemType.acorn, left: 105, top: 250, height: 40, width: 40 },
    { id: '3', hasWarning: true, itemType: EItemType.FOREACH, isEnabledNewConnetion: true, connections: [{ id: '112', targetId: '4', isSelected: false, originId: '3' }], icon: IconFlowForeach, label: 'Foreach', description: 'Minha descrição legal', flowItemType: EFlowItemType.acorn, left: 105, top: 400, height: 40, width: 40 },
    { id: '4', hasWarning: true, itemType: EItemType.ACTION, isEnabledNewConnetion: true, connections: [{ id: '113', targetId: '5', originId: '4', isSelected: false }], icon: IconFlowAction, label: 'Action', description: 'Minha descrição legal', flowItemType: EFlowItemType.acorn, left: 105, top: 550, height: 40, width: 40 },
    { id: '5', hasWarning: true, itemType: EItemType.ASSIGN, isEnabledNewConnetion: true, connections: [{ id: '114', targetId: '4', originId: '5', isSelected: false, connectionLabel: 'Linha 05', connectionDescription: 'Descrição da linha 01' }], icon: IconFlowAssign, label: 'Assign', description: 'Minha descrição legal', flowItemType: EFlowItemType.acorn, left: 105, top: 700, height: 40, width: 40 },
    { id: '6', hasWarning: true, itemType: EItemType.COMMENT, isEnabledNewConnetion: true, connections: [], description: 'Write here \n your comment', flowItemType: EFlowItemType.comment, left: 210, top: 200 },
]

export const ToolItems: IFlowItem[] = [
    { id: undefined, left: 0, top: 0, flowItemType: EFlowItemType.acorn, icon: IconFlowStart, itemType: EItemType.START },
    { id: undefined, left: 0, top: 0, flowItemType: EFlowItemType.acorn, icon: IconFlowAssign, itemType: EItemType.ASSIGN },
    { id: undefined, left: 0, top: 0, flowItemType: EFlowItemType.acorn, icon: IconFlowIf, itemType: EItemType.IF },
    { id: undefined, left: 0, top: 0, flowItemType: EFlowItemType.acorn, icon: IconFlowAction, itemType: EItemType.ACTION },
    { id: undefined, left: 0, top: 0, flowItemType: EFlowItemType.acorn, icon: IconFlowSwitch, itemType: EItemType.SWITCH },
    { id: undefined, left: 0, top: 0, flowItemType: EFlowItemType.acorn, icon: IconFlowForeach, itemType: EItemType.FOREACH },
    { id: undefined, left: 0, top: 0, flowItemType: EFlowItemType.acorn, icon: IconFlowEnd, itemType: EItemType.END },
    { id: undefined, left: 0, top: 0, itemType: EItemType.COMMENT, flowItemType: EFlowItemType.comment, icon: IconFlowComment },
];

export const AllowedsInDrop: string[] = [
    EItemType.COMMENT,
    EItemType.FOREACH,
    EItemType.ACTION,
    EItemType.ASSIGN,
    EItemType.SWITCH,
    EItemType.START,
    EItemType.END,
    EItemType.IF,
];
