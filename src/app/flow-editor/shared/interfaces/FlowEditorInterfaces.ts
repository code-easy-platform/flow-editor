import { IFlowItem } from "./../interfaces/FlowItemInterfaces";

/** Specific set of settings used in the flow editor */
export interface IFlowEditorConfigs {

    /** Usado para custumizar o background do painel */
    backgroundType?: 'dotted' | 'checkered' | 'custom';

    /** Ajustar à grade enquanto arrasta */
    snapGridWhileDragging?: boolean;

    /** Se "true" desabilita a área de seleção na tela. */
    disableSelection?: boolean;

    /** Used when a flow item is disabled */
    disableOpacity?: number;

    /** Used when a flow item is disabled */
    dottedSize?: number;

    /** Used to define which items are allowed in the flow */
    typesAllowedToDrop?: string[];

    /** Used to define the color of the text that will be displayed above a flow item */
    flowItemTextColor?: string;

}

/** Set of events used by FlowEditorBoard */
export interface IFlowEditorBoardEvents {
    onMouseEnter?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
    onMouseLeave?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

/** Set of properties used by FlowEditorBoard */
export interface IFlowEditorBoardProps extends IFlowEditorBoardEvents {
    id?: string;

    /** The component is showed when the items props is empty  */
    childrenWhenItemsEmpty?: React.ReactNode
}

/** Set of all properties used in FlowEditor component */
export interface IFlowEditorProps extends IFlowEditorBoardProps {

    /** FlowItem[] - Usado para exibir os items na tela do editor */
    items: IFlowItem[];

    /**
     * Configurations for the Flow editor component
     */
    configs: IFlowEditorConfigs

}
