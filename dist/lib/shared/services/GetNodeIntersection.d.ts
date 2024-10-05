interface IIntersectionNode {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare function getEdgeParams(source: IIntersectionNode, target: IIntersectionNode): {
    sourcePos: string;
    targetPos: string;
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
};
export {};
