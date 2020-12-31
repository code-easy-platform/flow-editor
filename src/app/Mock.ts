import { IconFlowStart, IconFlowIf, IconFlowForeach, IconFlowAction, IconFlowAssign, IconFlowComment, IconFlowEnd, IconFlowSwitch } from 'code-easy-components';
import { observe } from 'react-observing';

import { IFlowItem } from "./flow-editor/shared/interfaces/FlowItemInterfaces";
import { EItemType } from './flow-editor/shared/enums/EItemType';
import { EFlowItemType } from './flow-editor/shared/enums';
import { IBreadCrumbButton } from './flow-editor';

export const ItemsLogical: IFlowItem[] = [
    { id: observe('1'), isDisabled: observe(false), isSelected: observe(false), hasWarning: observe(false), hasError: observe(false), itemType: observe(EItemType.START), isEnabledNewConnetion: observe(true), connections: observe([{ id: observe('110'), targetId: observe('2'), originId: observe('1'), isSelected: observe(false), connectionLabel: observe('Linha 01'), connectionDescription: observe('Descrição da linha 01') }]), icon: observe(IconFlowStart), label: observe('Start'), description: observe('Minha descrição legal'), flowItemType: observe(EFlowItemType.acorn), left: observe(105), top: observe(100), height: observe(40), width: observe(40) },
    { id: observe('2'), isDisabled: observe(false), isSelected: observe(false), hasWarning: observe(false), hasError: observe(false), itemType: observe(EItemType.IF), isEnabledNewConnetion: observe(true), connections: observe([{ id: observe('111'), targetId: observe('3'), originId: observe('2'), isSelected: observe(false), connectionLabel: observe(undefined), connectionDescription: observe(undefined) }]), icon: observe(IconFlowIf), label: observe('If'), description: observe('Minha descrição legal'), flowItemType: observe(EFlowItemType.acorn), left: observe(105), top: observe(250), height: observe(40), width: observe(40) },
    { id: observe('3'), isDisabled: observe(false), isSelected: observe(false), hasWarning: observe(false), hasError: observe(false), itemType: observe(EItemType.FOREACH), isEnabledNewConnetion: observe(true), connections: observe([{ id: observe('112'), targetId: observe('4'), isSelected: observe(false), originId: observe('3'), connectionLabel: observe(undefined), connectionDescription: observe(undefined) }]), icon: observe(IconFlowForeach), label: observe('Foreach'), description: observe('Minha descrição legal'), flowItemType: observe(EFlowItemType.acorn), left: observe(105), top: observe(400), height: observe(40), width: observe(40) },
    { id: observe('4'), isDisabled: observe(false), isSelected: observe(false), hasWarning: observe(false), hasError: observe(false), itemType: observe(EItemType.ACTION), isEnabledNewConnetion: observe(true), connections: observe([{ id: observe('113'), targetId: observe('5'), originId: observe('4'), isSelected: observe(false), connectionLabel: observe(undefined), connectionDescription: observe(undefined) }]), icon: observe(IconFlowAction), label: observe('Action'), description: observe('Minha descrição legal'), flowItemType: observe(EFlowItemType.acorn), left: observe(105), top: observe(550), height: observe(40), width: observe(40) },
    { id: observe('5'), isDisabled: observe(false), isSelected: observe(false), hasWarning: observe(false), hasError: observe(false), itemType: observe(EItemType.ASSIGN), isEnabledNewConnetion: observe(true), connections: observe([{ id: observe('114'), targetId: observe('4'), originId: observe('5'), isSelected: observe(false), connectionLabel: observe('Linha 05'), connectionDescription: observe('Descrição da linha 01') }]), icon: observe(IconFlowAssign), label: observe('Assign'), description: observe('Minha descrição legal'), flowItemType: observe(EFlowItemType.acorn), left: observe(105), top: observe(700), height: observe(40), width: observe(40) },
    { id: observe('6'), isDisabled: observe(false), isSelected: observe(false), hasWarning: observe(false), hasError: observe(false), itemType: observe(EItemType.COMMENT), isEnabledNewConnetion: observe(true), connections: observe([]), description: observe('Write here your comment\nWrite here your comment\nWrite here your comment'), flowItemType: observe(EFlowItemType.comment), left: observe(210), top: observe(200), height: observe(40), width: observe(40), icon: observe(IconFlowComment), label: observe("") },
]

export const ToolItems: IFlowItem[] = [
    { id: observe(undefined), left: observe(0), top: observe(0), height: observe(0), width: observe(0), isDisabled: observe(false), isSelected: observe(false), hasError: observe(false), hasWarning: observe(false), label: observe(""), isEnabledNewConnetion: observe(false), connections: observe([]), flowItemType: observe(EFlowItemType.acorn), icon: observe(IconFlowStart), itemType: observe(EItemType.START), description: observe("") },
    { id: observe(undefined), left: observe(0), top: observe(0), height: observe(0), width: observe(0), isDisabled: observe(false), isSelected: observe(false), hasError: observe(false), hasWarning: observe(false), label: observe(""), isEnabledNewConnetion: observe(false), connections: observe([]), flowItemType: observe(EFlowItemType.acorn), icon: observe(IconFlowAssign), itemType: observe(EItemType.ASSIGN), description: observe("") },
    { id: observe(undefined), left: observe(0), top: observe(0), height: observe(0), width: observe(0), isDisabled: observe(false), isSelected: observe(false), hasError: observe(false), hasWarning: observe(false), label: observe(""), isEnabledNewConnetion: observe(false), connections: observe([]), flowItemType: observe(EFlowItemType.acorn), icon: observe(IconFlowIf), itemType: observe(EItemType.IF), description: observe("") },
    { id: observe(undefined), left: observe(0), top: observe(0), height: observe(0), width: observe(0), isDisabled: observe(false), isSelected: observe(false), hasError: observe(false), hasWarning: observe(false), label: observe(""), isEnabledNewConnetion: observe(false), connections: observe([]), flowItemType: observe(EFlowItemType.acorn), icon: observe(IconFlowAction), itemType: observe(EItemType.ACTION), description: observe("") },
    { id: observe(undefined), left: observe(0), top: observe(0), height: observe(0), width: observe(0), isDisabled: observe(false), isSelected: observe(false), hasError: observe(false), hasWarning: observe(false), label: observe(""), isEnabledNewConnetion: observe(false), connections: observe([]), flowItemType: observe(EFlowItemType.acorn), icon: observe(IconFlowSwitch), itemType: observe(EItemType.SWITCH), description: observe("") },
    { id: observe(undefined), left: observe(0), top: observe(0), height: observe(0), width: observe(0), isDisabled: observe(false), isSelected: observe(false), hasError: observe(false), hasWarning: observe(false), label: observe(""), isEnabledNewConnetion: observe(false), connections: observe([]), flowItemType: observe(EFlowItemType.acorn), icon: observe(IconFlowForeach), itemType: observe(EItemType.FOREACH), description: observe("") },
    { id: observe(undefined), left: observe(0), top: observe(0), height: observe(0), width: observe(0), isDisabled: observe(false), isSelected: observe(false), hasError: observe(false), hasWarning: observe(false), label: observe(""), isEnabledNewConnetion: observe(false), connections: observe([]), flowItemType: observe(EFlowItemType.acorn), icon: observe(IconFlowEnd), itemType: observe(EItemType.END), description: observe("") },
    { id: observe(undefined), left: observe(0), top: observe(0), height: observe(0), width: observe(0), isDisabled: observe(false), isSelected: observe(false), hasError: observe(false), hasWarning: observe(false), label: observe(""), isEnabledNewConnetion: observe(false), connections: observe([]), itemType: observe(EItemType.COMMENT), flowItemType: observe(EFlowItemType.comment), icon: observe(IconFlowComment), description: observe("") },
];

export const BreadCrumps: IBreadCrumbButton[] = [
    {
        label: 'src',
        disabled: false,
        onClick: console.log,
    },
    {
        label: 'app',
        disabled: false,
        onClick: console.log,
    },
    {
        label: 'App.tsx',
        disabled: false,
        onClick: console.log,
    },
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
