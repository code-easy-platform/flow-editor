export interface ItemFluxo {
    sucessorId: number,
    itemType: ItemType
    height: number,
    width: number,
    nome: string,
    left: number,
    top: number,
    id: number,
}

export enum ItemType {
    ASSIGN="ASSAGN",
}
