import { Coords } from "../shared/Interfaces/CodeEditorInterfaces";

export interface IConnections {
    connectionLabel?: string;
    isSelected?: boolean;
    conectionId: string;
}

export interface ItemFluxo {
    connections: IConnections[];
    id: string | undefined;
    isSelected: boolean;
    hasError?: boolean;
    itemType: ItemType;
    height: number;
    width: number;
    name: string;
    left: number;
    top: number;
    icon: any;
    select(coords: Coords): any;
}

/** Tipos de itens existentes na toolbar. */
export enum ItemType {
    COMMENT = "COMMENT",
    FOREACH = "FOREACH",
    SWITCH = "SWITCH",
    ASSIGN = "ASSIGN",
    ACTION = "ACTION",
    START = "START",
    END = "END",
    IF = "IF",
}

/** Elemento que é reinderizado na para cada item de fluxo. */
export class FlowItem implements ItemFluxo {

    public itemType: ItemType = ItemType.START;
    public id: string | undefined = undefined;
    public connections: IConnections[] = [];
    public isSelected: boolean = false;
    public hasError?: boolean = false;
    public height: number = 50;
    public width: number = 50;
    public name: string = "";
    public left: number = 0;
    public top: number = 0;
    public icon: any;

    constructor(
        private props: {
            connections?: IConnections[],
            id: string | undefined,
            isSelected?: boolean,
            hasError?: boolean,
            itemType: ItemType,
            height?: number,
            width?: number,
            left?: number,
            name: string,
            top?: number,
            icon?: any,
        }
    ) {
        this.isSelected = this.props.isSelected || false;
        this.connections = this.props.connections || [];
        this.height = this.props.height || 50;
        this.itemType = this.props.itemType;
        this.hasError = this.props.hasError;
        this.width = this.props.width || 50;
        this.left = this.props.left || 0;
        this.top = this.props.top || 0;
        this.name = this.props.name;
        this.icon = this.props.icon;
        this.id = this.props.id;
    }

    /** Valida se o elemento está ou não na área que está sendo selecionada pelo mouse. */
    public select = (coords: Coords) => {
        const top2 = this.top + this.height;
        const left2 = this.left + this.width;
        this.isSelected = (
            (
                ((coords.endY - coords.startY) > 0)
                    ? ((this.top >= coords.startY) || (top2 >= coords.startY)) && ((this.top <= coords.endY) || (top2 <= coords.endY))
                    : ((this.top <= coords.startY) || (top2 <= coords.startY)) && ((this.top >= coords.endY) || (top2 >= coords.endY))
            )
            &&
            (
                ((coords.endX - coords.startX) > 0)
                    ? ((this.left >= coords.startX) || (left2 >= coords.startX)) && ((this.left <= coords.endX) || (left2 <= coords.endX))
                    : ((this.left <= coords.startX) || (left2 <= coords.startX)) && ((this.left >= coords.endX) || (left2 >= coords.endX))
            )
        );
    };

    public connectionSelect(conectionId: string | undefined) {

        if (!conectionId) return;

        this.connections.forEach(connection => {
            if (connection.conectionId === conectionId) {
                connection.isSelected = true;
            }
        });

    }

}
