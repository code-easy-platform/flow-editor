export interface ItemFluxo {
    isSelecionado: boolean
    sucessorId: number,
    itemType: ItemType
    height: number,
    width: number,
    nome: string,
    left: number,
    top: number,
    id: number,
    select(item: FlowItem, startTop: number, startLeft: number, endTop: number, endLeft: number): any;
}

export enum ItemType {
    ASSIGN = "ASSIGN",
    ACTION = "ACTION",
    START = "START",
    END = "END",
    IF = "IF",
}

export class FlowItem implements ItemFluxo {

    public isSelecionado: boolean = false;
    public sucessorId: number = 0;
    public itemType: ItemType = ItemType.START;
    public height: number = 0;
    public width: number = 0;
    public nome: string = "";
    public left: number = 0;
    public top: number = 0;
    public id: number = 0;

    select = (item: FlowItem, startTop: number, startLeft: number, endTop: number, endLeft: number) => {
        const top2 = this.props.top + this.props.height;
        const left2 = this.props.left + this.props.width;
        this.isSelecionado = (
            (
                ((endTop - startTop) > 0)
                    ? ((this.props.top >= startTop) || (top2 >= startTop)) && ((this.props.top <= endTop) || (top2 <= endTop))
                    : ((this.props.top <= startTop) || (top2 <= startTop)) && ((this.props.top >= endTop) || (top2 >= endTop))
            )
            &&
            (
                ((endLeft - startLeft) > 0)
                    ? ((this.props.left >= startLeft) || (left2 >= startLeft)) && ((this.props.left <= endLeft) || (left2 <= endLeft))
                    : ((this.props.left <= startLeft) || (left2 <= startLeft)) && ((this.props.left >= endLeft) || (left2 >= endLeft))
            )
        );
    };

    constructor(
        private props: {
            isSelecionado: boolean,
            sucessorId: number,
            itemType: ItemType,
            height: number,
            width: number,
            nome: string,
            left: number,
            top: number,
            id: number,
        }
    ) {
        this.isSelecionado = this.props.isSelecionado;
        this.sucessorId = this.props.sucessorId;
        this.itemType = this.props.itemType;
        this.height = this.props.height;
        this.width = this.props.width;
        this.nome = this.props.nome;
        this.left = this.props.left;
        this.top = this.props.top;
        this.id = this.props.id;
    }
}
