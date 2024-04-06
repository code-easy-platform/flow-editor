interface IUseLinePathProps {
    top1: number;
    top2: number;
    left1: number;
    left2: number;
    width1: number;
    width2: number;
    height1: number;
    height2: number;
    isCurved?: boolean;
}
export declare const useLinePath: (props: IUseLinePathProps) => {
    y1: number;
    y2: number;
    x1: number;
    x2: number;
    top1: number;
    top2: number;
    left1: number;
    left2: number;
    angle: number;
    width1: number;
    width2: number;
    height1: number;
    height2: number;
    sideAngle: number;
    extraSpace: number;
    currentSide: string | undefined;
};
export {};
