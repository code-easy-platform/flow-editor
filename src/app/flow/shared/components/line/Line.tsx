import { useCallback, useMemo, useState } from 'react';
import { IObservable, useObserverValue } from 'react-observing';

import { useIsSelectedItemById, useToggleSelectedItem } from '../../context';
import { getCtrlKeyBySystem } from '../../services';
import { DraggableLine } from './DraggableLine';
import { TId } from '../../types';


interface IDraggableContainerProps {
  lineIdObservable: IObservable<TId>;
  blockIdObservable: IObservable<TId>;

  top1Observable: IObservable<number>;
  left1Observable: IObservable<number>;
  top2Observable: IObservable<number>;
  left2Observable: IObservable<number>;

  width1Observable: IObservable<number>;
  width2Observable: IObservable<number>;
  height1Observable: IObservable<number>;
  height2Observable: IObservable<number>;
}
export const Line: React.FC<IDraggableContainerProps> = (lineProps) => {
  const [isDraggingLine, setIsDraggingLine] = useState(false);

  const rawTop1 = useObserverValue(lineProps.top1Observable);
  const rawTop2 = useObserverValue(lineProps.top2Observable);
  const lineId = useObserverValue(lineProps.lineIdObservable);
  const rawLeft1 = useObserverValue(lineProps.left1Observable);
  const rawLeft2 = useObserverValue(lineProps.left2Observable);
  const blockId = useObserverValue(lineProps.blockIdObservable);
  const rawWidth1 = useObserverValue(lineProps.width1Observable);
  const rawWidth2 = useObserverValue(lineProps.width2Observable);
  const rawHeight1 = useObserverValue(lineProps.height1Observable);
  const rawHeight2 = useObserverValue(lineProps.height2Observable);

  const addSelectedItem = useToggleSelectedItem();
  const isSelected = useIsSelectedItemById(lineId);


  const extraSpace = useMemo(() => 4, []);
  const arrowSize = useMemo(() => 2.5, []);
  const lineWidth = useMemo(() => 1, []);

  const top1 = useMemo(() => rawTop1 - extraSpace, [rawTop1, extraSpace]);
  const top2 = useMemo(() => rawTop2 - extraSpace, [rawTop2, extraSpace]);
  const left1 = useMemo(() => rawLeft1 - extraSpace, [rawLeft1, extraSpace]);
  const left2 = useMemo(() => rawLeft2 - extraSpace, [rawLeft2, extraSpace]);
  const width1 = useMemo(() => rawWidth1 + (extraSpace * 2), [rawWidth1, extraSpace]);
  const width2 = useMemo(() => rawWidth2 + (extraSpace * 2), [rawWidth2, extraSpace]);
  const height1 = useMemo(() => rawHeight1 + (extraSpace * 2), [rawHeight1, extraSpace]);
  const height2 = useMemo(() => rawHeight2 + (extraSpace * 2), [rawHeight2, extraSpace]);


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
  }, [currentSide, left1, width1, getPositionByAngle]);
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
  }, [currentSide, top1, height1, getPositionByAngle]);
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
  }, [currentSide, left2, width2, getPositionByAngle]);
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
  }, [currentSide, top2, height2, getPositionByAngle]);


  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    addSelectedItem(lineId, getCtrlKeyBySystem(e.nativeEvent));
  }, [lineId]);


  return (
    <>
      <defs>
        <marker orient="auto" refX={2.8 * arrowSize} refY={2.4 * arrowSize} markerWidth={10 * arrowSize} markerHeight={8 * arrowSize} id={`end-line-arrow-${lineId}`}>
          <polygon points={`0 ${1 * arrowSize}, ${3 * arrowSize} ${2.4 * arrowSize}, 0 ${4 * arrowSize}`} stroke={isSelected ? "#0f77bf" : "gray"} fill={isSelected ? "#0f77bf" : "gray"} />
        </marker>
      </defs>

      {!isDraggingLine && (
        <>
          <line
            y1={y1}
            y2={y2}
            x1={x1}
            x2={x2}
            fill="none"
            strokeLinecap="round"
            strokeWidth={lineWidth}
            style={{ pointerEvents: 'none' }}
            stroke={isSelected ? "#0f77bf" : "gray"}
            markerEnd={`url(#end-line-arrow-${lineId})`}
          />
          <line
            y1={y1}
            y2={y2}
            x1={x1}
            x2={x2}
            fill="none"
            strokeWidth="14"
            stroke="transparent"
            strokeLinecap="round"
            onClick={handleMouseDown}
            style={{ pointerEvents: 'auto' }}
          />
        </>
      )}

      <DraggableLine
        top1={rawTop1}
        top2={rawTop2}
        lineId={lineId}
        left1={rawLeft1}
        left2={rawLeft2}
        nodeId={blockId}
        width1={rawWidth1}
        width2={rawWidth2}
        height1={rawHeight1}
        height2={rawHeight2}

        lineWidth={lineWidth}
        extraSpace={extraSpace}

        onDragLineEnd={() => setIsDraggingLine(false)}
        onDragLineStart={() => setIsDraggingLine(true)}
      />
    </>
  );
}
