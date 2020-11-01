import { EFlowItemType } from "../enums/EFlowItemType";
import { IObservable } from 'react-observing';

/**
 * Used to represente lines in the flow between flow items
 */
export interface IConnection {
    /**
     * This will apper in the line as a tooltip
     */
    connectionDescription?: IObservable<string>;
    /**
     * This will apper in the line as a title
     */
    connectionLabel?: IObservable<string>;
    /**
     * Unique id to identify the connection
     */
    id: IObservable<string | undefined>;
    /**
     * Used to identify when the user click over the line
     */
    isSelected: IObservable<boolean>;
    /**
     * Identifier of the element that is connected by the line 
     */
    originId: IObservable<string>;
    /**
     * Identifier of the element that is connected by the line 
     */
    targetId: IObservable<string>;
}
/**
 * 
 */
export interface IBasicFlowItem {
    top: IObservable<number | 0>;
    left: IObservable<number | 0>;
    isSelected: IObservable<boolean>;
    isDisabled: IObservable<boolean>;
    label: IObservable<string | undefined>;
    description: IObservable<string | undefined>;
    /**
     * Unique id to identify the element
     */
    id: IObservable<string | undefined>;
    flowItemType: IObservable<EFlowItemType>;
}
/**
 * 
 */
export interface ILine {
    /**
     * Unique id to identify the element
     */
    id: IObservable<string>;
    originId?: IObservable<string>;
    targetId?: IObservable<string | undefined>;
}
/**
 * 
 */
export interface IFlowItem extends IBasicFlowItem {
    icon: IObservable<any | undefined>;
    width: IObservable<number | undefined>;
    height: IObservable<number | undefined>;
    /**
     * Used to define a type of the item.
     * Ex: start, assign, foreach, etc...
     */
    itemType?: IObservable<string>;
    connections?: IObservable<IConnection[]>;
    hasError: IObservable<boolean | undefined>;
    hasWarning: IObservable<boolean | undefined>;
    /**
     * Used to validate that this item can be connected with another item
     */
    isEnabledNewConnetion: IObservable<boolean | undefined>;
}
