import { IFlowItem } from "../../../code-editor/shared/Interfaces";

export interface IFlowEditorConfigs {

    /** Usado para custumizar o background do painel */
    backgroundType?: 'dotted' | 'checkered' | 'custom';

    /** Se "true" desabilita a área de seleção na tela. */
    enabledSelection?: boolean;

    /** Ajustar à grade enquanto arrasta */
    snapGridWhileDragging?: boolean;

    /** Used when a flow item is disabled */
    disableOpacity?: number;

}

export interface IFlowEditorBoardEvents {
    onMouseEnter?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
    onMouseLeave?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

export interface IFlowEditorBoardProps extends IFlowEditorBoardEvents {
    id?: string;
}

export interface IFlowEditorProps extends IFlowEditorBoardProps {

    /** FlowItem[] - Usado para exibir os items na tela do editor */
    items: IFlowItem[];

    /**
     * Configurations for the Flow editor component
     */
    configs: IFlowEditorConfigs

}