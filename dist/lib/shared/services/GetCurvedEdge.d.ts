export declare const getCurvedPath: ({ sourceX, sourceY, targetX, targetY }: {
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
}, { offset }: {
    offset: number;
}) => readonly [`M ${number} ${number} Q ${number} ${number} ${number} ${number}`, {
    readonly sourceX: number;
    readonly sourceY: number;
    readonly controlX: number;
    readonly controlY: number;
    readonly targetX: number;
    readonly targetY: number;
}];
