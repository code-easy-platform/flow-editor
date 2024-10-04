interface IIntersectionNode {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare function getEdgeParams(source: IIntersectionNode, target: IIntersectionNode): {
    sx: number;
    sy: number;
    tx: number;
    ty: number;
    sourcePos: string;
    targetPos: string;
};
export {};
