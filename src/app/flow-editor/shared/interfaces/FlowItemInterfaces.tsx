export enum EFlowItemType {
    line = "LINE",
    acorn = "ACORN",
    comment = "COMMENT",
}

export interface IFlowItem {
    icon?: any;
    id?: string;
    top: number;
    left: number;
    title?: string;
    width?: number;
    height?: number;
    hasError?: boolean;
    isSelected?: boolean;
    hasWarning?: boolean;
    description?: string;
    flowItemType: EFlowItemType;
    onMouseUp?(e?: React.MouseEvent<SVGGElement, MouseEvent>): void;
    onMouseDown?(e?: React.MouseEvent<SVGGElement, MouseEvent>): void;
    onContextMenu?(data?: any, e?: React.MouseEvent<SVGGElement, MouseEvent>): void;
}