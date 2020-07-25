import { FlowItem } from "./code-editor/models/FlowItem";
import { ItemType } from "./code-editor/shared/enums/ItemType";
import { IFlowItem as NewFlowItem, EFlowItemType } from "./flow-editor/shared/interfaces/FlowItemInterfaces";
import { IconFlowStart } from 'code-easy-components';

export const items: FlowItem[] = [
    new FlowItem({ hasWarning: false, id: '1', connections: [{ id: '0', connectionId: '2' }], isDisabled: true, top: 105, left: 90, name: "START", itemType: ItemType.START }),
    new FlowItem({ hasWarning: false, id: '2', connections: [{ id: '1', connectionId: '3', connectionLabel: 'True' }, { id: '8', connectionId: '0' }], top: 210, left: 90, name: "IF", itemType: ItemType.IF }),
    new FlowItem({ hasWarning: false, id: '3', connections: [{ id: '2', connectionId: '4', connectionLabel: 'Circle' }, { id: '9', connectionId: '5' }], top: 370, left: 90, name: "FOREACH", itemType: ItemType.FOREACH }),
    new FlowItem({ hasWarning: false, id: '4', connections: [{ id: '3', connectionId: '3' }], top: 370, left: 280, name: "ACTION", itemType: ItemType.ACTION }),
    new FlowItem({ hasWarning: false, id: '5', connections: [{ id: '4', connectionId: '6' }], top: 525, left: 90, name: "SWITCH", itemType: ItemType.SWITCH }),
    new FlowItem({ hasWarning: true, id: '6', connections: [{ id: '5', connectionId: '7' }], top: 630, left: 90, name: "ASSIGN", itemType: ItemType.ASSIGN }),
    new FlowItem({ hasWarning: false, id: '7', connections: [{ id: '6', connectionId: '0' }], top: 735, left: 90, name: "END", itemType: ItemType.END, hasError: true }),
    new FlowItem({ hasWarning: false, id: '8', connections: [{ id: '7', connectionId: '0' }], top: 105, left: 200, name: "COMMENT COMMENTCOMMENT \n xcvb cvb xc zxc zx cvxcv", itemType: ItemType.COMMENT }),
];
export const itemsLogica: FlowItem[] = [
    new FlowItem({ hasWarning: false, id: '1', name: "START", itemType: ItemType.START }),
    new FlowItem({ hasWarning: false, id: '2', name: "ACTION", itemType: ItemType.ACTION }),
    new FlowItem({ hasWarning: false, id: '3', name: "IF", itemType: ItemType.IF }),
    new FlowItem({ hasWarning: false, id: '4', name: "FOREACH", itemType: ItemType.FOREACH }),
    new FlowItem({ hasWarning: false, id: '6', name: "SWITCH", itemType: ItemType.SWITCH }),
    new FlowItem({ hasWarning: false, id: '7', name: "ASSIGN", itemType: ItemType.ASSIGN }),
    new FlowItem({ hasWarning: false, id: '8', name: "END", itemType: ItemType.END }),
    new FlowItem({ hasWarning: false, id: '9', name: "COMMENT", itemType: ItemType.COMMENT }),
];
export const newItemsLogical: NewFlowItem[] = [
    { id: '1', itemType: ItemType.SWITCH, connections: [{ id: '0', connectionId: '2', connectionLabel: 'Linha 01', connectionDescription: 'Descrição da linha 01' }], icon: IconFlowStart, title: 'Start', description: 'Minha descrição legal', flowItemType: EFlowItemType.acorn, left: 105, top: 100, height: 40, width: 40 },
    { id: '2', itemType: ItemType.SWITCH, connections: [{ id: '1', connectionId: '3' }], icon: IconFlowStart, title: 'Start', description: 'Minha descrição legal', flowItemType: EFlowItemType.acorn, left: 105, top: 250, height: 40, width: 40 },
    { id: '3', itemType: ItemType.SWITCH, connections: [{ id: '2', connectionId: '4' }], icon: IconFlowStart, title: 'Start', description: 'Minha descrição legal', flowItemType: EFlowItemType.acorn, left: 105, top: 400, height: 40, width: 40 },
    { id: '4', itemType: ItemType.SWITCH, connections: [{ id: '3', connectionId: '5' }], icon: IconFlowStart, title: 'Start', description: 'Minha descrição legal', flowItemType: EFlowItemType.acorn, left: 105, top: 550, height: 40, width: 40 },
    { id: '5', itemType: ItemType.SWITCH, connections: [{ id: '3', connectionId: '4', connectionLabel: 'Linha 05', connectionDescription: 'Descrição da linha 01' }], icon: IconFlowStart, title: 'Start', description: 'Minha descrição legal', flowItemType: EFlowItemType.acorn, left: 105, top: 700, height: 40, width: 40 },
]
