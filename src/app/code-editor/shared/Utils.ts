import { ItemType } from "../models/ItemFluxo";

export class Utils {

    /**
     * Retorna um valor randomico.
     */
    public static getRandomId() {
        const min = Math.ceil(10000);
        const max = Math.floor(100000000);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public static useNewBranch = (currentBranchsLength: number, itemType: ItemType) => {
        switch (itemType) {
            case ItemType.IF:
                return currentBranchsLength < 2; // Só usa nova branch para um if se ele ainda tiver menos de 2 branchs.
                break;

            case ItemType.SWITCH:
                return true; // Sempre usa uma nova branch para um swicth.
                break;

            case ItemType.END:
                return false; // Nunca usa uma nova branch para um END.
                break;

            case ItemType.ASSIGN:
                return currentBranchsLength < 1; // Apenas uma nova branch para um assing.
                break;

            case ItemType.FOREACH:
                return currentBranchsLength < 2; // Apenas duas branchs para um FOREACH.
                break;

            case ItemType.START:
                return currentBranchsLength < 1; // Apenas uma branchs para um START.
                break;

            default:
                return currentBranchsLength < 1;
                break;

        }
    }

}
