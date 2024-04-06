import { default as React } from 'react';

export interface ICoords {
    startY: number;
    startX: number;
    endY: number;
    endX: number;
}
interface SelectorAreaProps {
    isDisabled?: boolean;
    onSelectionEnd?(e: MouseEvent): void;
    onSelectionStart?(e: MouseEvent): void;
    onCoordsChange?(coords: ICoords): void;
    boardRef: React.RefObject<HTMLDivElement>;
}
export declare const SelectorArea: React.FC<SelectorAreaProps>;
export {};
