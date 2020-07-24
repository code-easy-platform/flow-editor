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
    onContextMenu?(data?: any, e?: React.MouseEvent<SVGGElement, MouseEvent>): void;
}