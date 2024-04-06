import { useCallback, useMemo } from 'react';


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
export const useLinePath = (props: IUseLinePathProps) => {
  const curvedSpace = useMemo(() => props.isCurved ? (10 * 100) / 90 : 0, [props.isCurved]);
  const extraSpace = useMemo(() => 8, []);


  const top1 = useMemo(() => props.top1 - extraSpace, [props.top1, extraSpace]);
  const top2 = useMemo(() => props.top2 - extraSpace, [props.top2, extraSpace]);
  const left1 = useMemo(() => props.left1 - extraSpace, [props.left1, extraSpace]);
  const left2 = useMemo(() => props.left2 - extraSpace, [props.left2, extraSpace]);
  const width1 = useMemo(() => props.width1 + (extraSpace * 2), [props.width1, extraSpace]);
  const width2 = useMemo(() => props.width2 + (extraSpace * 2), [props.width2, extraSpace]);
  const height1 = useMemo(() => props.height1 + (extraSpace * 2), [props.height1, extraSpace]);
  const height2 = useMemo(() => props.height2 + (extraSpace * 2), [props.height2, extraSpace]);

  const angle = useMemo(() => {
    let angle = Math.atan2(left1 - left2, top1 - top2) * (180 / Math.PI);

    if (angle < 0) {
      angle = Math.abs(angle);
    } else {
      angle = 360 - angle;
    }

    return angle;
  }, [left2, top2, left1, top1]);

  const sideAngle = useMemo(() => {
    if (angle >= 45 && angle <= 135) {// Left
      return angle - 45;
    } else if (angle >= 135 && angle <= 225) {// Top
      return angle - 135;
    } else if (angle >= 225 && angle <= 315) {// Right
      return angle - 225;
    } else if ((angle >= 315 && angle <= 360) || (angle >= 0 && angle <= 45)) {// Bottom
      if (angle >= 315 && angle <= 360) {// Bottom - Left
        return angle - 315;
      } else {// Bottom - Right
        return angle + 45;
      }
    } else {
      return 0;
    }
  }, [angle]);

  const currentSide = useMemo(() => {
    if (angle >= 45 && angle <= 135) {// Left
      return 'left';
    } else if (angle >= 135 && angle <= 225) {// Top
      return 'top';
    } else if (angle >= 225 && angle <= 315) {// Right
      return 'right';
    } else if ((angle >= 315 && angle <= 360) || (angle >= 0 && angle <= 45)) {// Bottom
      return 'bottom';
    }
  }, [angle]);


  const getPositionByAngle = useCallback((value: number, space: number) => {
    const sideAnglePercent = (sideAngle * 100) / 90;

    const spaceBySideAnglePercent = (space * sideAnglePercent) / 100;

    return value - spaceBySideAnglePercent;
  }, [sideAngle]);


  const x1 = useMemo(() => {
    switch (currentSide) {
      case 'left':
        return left1 + width1;
      case 'top':
        return getPositionByAngle(left1 + width1, width1);
      case 'right':
        return left1;
      case 'bottom':
        return getPositionByAngle(left1, -width1);
      default:
        return 0;
    }
  }, [currentSide, left1, width1, curvedSpace, sideAngle, getPositionByAngle]);
  const y1 = useMemo(() => {
    switch (currentSide) {
      case 'left':
        return getPositionByAngle(top1, -height1);
      case 'top':
        return top1 + height1;
      case 'right':
        return getPositionByAngle(top1 + height1, height1);
      case 'bottom':
        return top1;
      default:
        return 0;
    }
  }, [currentSide, top1, height1, curvedSpace, sideAngle, getPositionByAngle]);
  const x2 = useMemo(() => {
    switch (currentSide) {
      case 'left':
        return left2;
      case 'top':
        return getPositionByAngle(left2, -width2);
      case 'right':
        return left2 + width2;
      case 'bottom':
        return getPositionByAngle(left2 + width2, width2);
      default:
        return 0;
    }
  }, [currentSide, left2, width2, curvedSpace, sideAngle, getPositionByAngle]);
  const y2 = useMemo(() => {
    switch (currentSide) {
      case 'left':
        return getPositionByAngle(top2 + height2, height2);
      case 'top':
        return top2;
      case 'right':
        return getPositionByAngle(top2, -height2);
      case 'bottom':
        return top2 + height2;
      default:
        return 0;
    }
  }, [currentSide, top2, height2, curvedSpace, sideAngle, getPositionByAngle]);


  return {
    y1,
    y2,
    x1,
    x2,
    top1,
    top2,
    left1,
    left2,
    angle,
    width1,
    width2,
    height1,
    height2,
    sideAngle,
    extraSpace,
    currentSide,
  };
}
