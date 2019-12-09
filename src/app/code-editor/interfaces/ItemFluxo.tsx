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
}

export enum ItemType {
    ASSIGN="ASSIGN",
    ACTION="ACTION",
    START="START",
    END="END",
    IF="IF",
}
