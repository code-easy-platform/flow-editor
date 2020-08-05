import { IFlowItem } from "./FlowItemInterfaces";
import { IBreadCampButton } from "./BreadCampButton";

/** Specific set of settings used in the flow editor */
export interface IFlowEditorConfigs {
    /**
     * Usado para custumizar o background do painel
     */
    backgroundType?: 'dotted' | 'checkered' | 'custom';
    /**
     * Ajustar à grade enquanto arrasta
     */
    snapGridWhileDragging?: boolean;
    /**
     * Se "true" desabilita a área de seleção na tela.
     */
    disableSelection?: boolean;
    /**
     * Used when a flow item is disabled 
     */
    disableOpacity?: number;
    /**
     * Used when a flow item is disabled
     */
    dottedSize?: number;
    /**
     * Used to define which items are allowed in the flow
     */
    typesAllowedToDrop?: string[];
    /**
     * Used to define the color of the text that will be displayed above a flow item
     */
    flowItemTextColor?: string;
    /**
     * Color used to represent that an item is selected
     */
    flowItemSelectedColor?: string;
    /**
     * Color used to represent an warning in some flow item
     */
    flowItemWarningColor?: string;
    /**
     * Color used to represent an error in some flow item
     */
    flowItemErrorColor?: string;
    /**
     * Color used to the texts in comments in the flow
     */
    commentTextColor?: string;
    /**
     * Color used in comments in the flow
     */
    commentColor?: string;
    /**
     * Color used in lines in the flow
     */
    linesColor?: string;
    /**
     * Stroke width used in lines in the flow
     */
    lineWidth?: number;
    /**
     * Selection border type
     */
    selectionBorderType?: 'dash' | 'normal',
    /**
     * Selection border width
     */
    selectionBorderWidth?: number,
    /**
     * Selection border color
     */
    selectionBorderColor?: string,
    /**
     * Selection background color
     */
    selectionBackgroundColor?: string,
    /**
     * Board background color
     */
    backgroundColor?: string,
    /**
     * Dot color
     * 
     * This property is used only when the background type is set to "dotted"
     */
    dotColor?: string,
}

/** Set of events used by FlowEditorBoard */
export interface IFlowEditorBoardEvents {
    onChangeItems?(items: IFlowItem[]): void;
    onContextMenu?(event: React.MouseEvent<any, MouseEvent>): void;
    onMouseEnter?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
    onMouseLeave?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

/** Set of properties used by FlowEditorBoard */
export interface IFlowEditorBoardProps extends IFlowEditorBoardEvents {
    /**
     * Unique identifier
     */
    id: string;
    /**
     * The component is showed when the items props is empty
     */
    childrenWhenItemsEmpty?: React.ReactNode;
    /**
     * 
     */
    breadcrumbs?: IBreadCampButton[];
}

/** Set of all properties used in FlowEditor component */
export interface IFlowEditorProps extends IFlowEditorBoardProps {
    /**
     * FlowItem[] - Usado para exibir os items na tela do editor
     */
    items: IFlowItem[];
    /**
     * Configurations for the Flow editor component
     */
    configs: IFlowEditorConfigs
}
