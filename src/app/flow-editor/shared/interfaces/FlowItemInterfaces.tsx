export enum EFlowItemType {
    /**
     * Used to connect a acorn in other
     */
    line = "LINE",
    /**
     * Represents the logical components
     */
    acorn = "ACORN",
    /**
     * Used to help in the code documentation
     */
    comment = "COMMENT",
}
/**
 * Used to represente lines in the flow between flow items
 */
export interface IConnection {
    /**
     * This will apper in the line as a tooltip
     */
    connectionDescription?: string;
    /**
     * This will apper in the line as a title
     */
    connectionLabel?: string;
    /**
     * Unique id to identify the connection
     */
    id: string | undefined;
    /**
     * Used to identify when the usre click over the line
     */
    isSelected?: boolean;
    /**
     * Identifier of the element that is connected by the line 
     */
    connectionId: string;
}
/**
 * 
 */
export interface ILine {
    top1: number;
    top2?: number;
    left1: number;
    label?: string;
    left2?: number;
    radius?: number;
    isCurved?: boolean;
    description?: string;
    isDisabled?: boolean;
    isSelected?: boolean;
    id: string | undefined;
    lineType?: 'dotted' | 'normal';
}
export interface IFlowItem {
    icon?: any;
    id?: string;
    title?: string;
    width?: number;
    height?: number;
    top: number | 0;
    left: number | 0;
    /**
     * Used to define a type of the item.
     * Ex: start, assign, foreach, etc...
     */
    itemType?: string;
    hasError?: boolean;
    isDisabled?: boolean;
    isSelected?: boolean;
    hasWarning?: boolean;
    description?: string;
    connections?: IConnection[]
    flowItemType: EFlowItemType;
    isDisabledNewConnetions?: boolean;
}