import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSetObserver } from 'react-observing';
import { useFrame } from 'react-frame-component';

import { useBoardScrollContext, useDragLineContext, useSnapGridContext, useToggleSelectedItem } from '../../context';
import { gridSnap } from '../../services';
import { TId } from '../../types';


interface IDraggableLineProps {
  nodeId: TId;
  lineId: TId;
  top1: number;
  top2: number;
  left1: number;
  left2: number;
  width1: number;
  width2: number;
  height1: number;
  height2: number;
  onDragLineEnd: () => void;
  onDragLineStart: () => void;
}
export const DraggableLine: React.FC<IDraggableLineProps> = ({ lineId, nodeId, onDragLineEnd, onDragLineStart, ...rest }) => {
  const setDragLine = useSetObserver(useDragLineContext());
  const addSelectedItem = useToggleSelectedItem();
  const scrollObject = useBoardScrollContext();
  const snapGrid = useSnapGridContext();
  const { window } = useFrame();;

  const [rawTop1, setRawTop1] = useState(rest.top1);
  const [rawTop2, setRawTop2] = useState(rest.top2);
  const [rawLeft1, setRawLeft1] = useState(rest.left1);
  const [rawLeft2, setRawLeft2] = useState(rest.left2);
  const [showDragLine, setShowDragLine] = useState<'start' | 'end'>();


  useEffect(() => {
    setRawTop1(rest.top1);
    setRawTop2(rest.top2);
    setRawLeft1(rest.left1);
    setRawLeft2(rest.left2);
  }, [rest.top1, rest.top2, rest.left1, rest.left2]);


  const extraSpace = useMemo(() => 8, []);

  const width1 = useMemo(() => rest.width1 + (extraSpace * 2), [rest.width1, extraSpace]);
  const width2 = useMemo(() => rest.width2 + (extraSpace * 2), [rest.width2, extraSpace]);
  const height1 = useMemo(() => rest.height1 + (extraSpace * 2), [rest.height1, extraSpace]);
  const height2 = useMemo(() => rest.height2 + (extraSpace * 2), [rest.height2, extraSpace]);
  const top1 = useMemo(() => gridSnap(rawTop1, snapGrid) - extraSpace, [rawTop1, snapGrid, extraSpace]);
  const top2 = useMemo(() => gridSnap(rawTop2, snapGrid) - extraSpace, [rawTop2, snapGrid, extraSpace]);
  const left1 = useMemo(() => gridSnap(rawLeft1, snapGrid) - extraSpace, [rawLeft1, snapGrid, extraSpace]);
  const left2 = useMemo(() => gridSnap(rawLeft2, snapGrid) - extraSpace, [rawLeft2, snapGrid, extraSpace]);


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


  const cliquedLocationFlowItem = useRef({ top: 0, left: 0 });
  const handleStartMouseDown = useCallback((e: React.MouseEvent) => {
    addSelectedItem([lineId], false);
    setShowDragLine('start');
    onDragLineStart();
    if (!window) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newLeft = (e.pageX - scrollObject.left.value) - cliquedLocationFlowItem.current.left;
      const newTop = (e.pageY - scrollObject.top.value) - cliquedLocationFlowItem.current.top;

      setRawLeft1(newLeft);
      setRawTop1(newTop);
    }

    const handleMouseUp = () => {
      setShowDragLine(undefined);
      setRawLeft1(rest.left1);
      setDragLine(undefined);
      setRawTop1(rest.top1);
      onDragLineEnd();
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    cliquedLocationFlowItem.current = {
      top: e.nativeEvent.pageY - rawTop1 - scrollObject.top.value,
      left: e.nativeEvent.pageX - rawLeft1 - scrollObject.left.value - 10,
    }
    setDragLine({ type: 'start', nodeId, lineId });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [setDragLine, onDragLineStart, onDragLineEnd, window, scrollObject, rawTop1, rawLeft1, rest.left1, rest.top1, nodeId, lineId]);

  const handleEndMouseDown = useCallback((e: React.MouseEvent) => {
    addSelectedItem([lineId], false);
    setShowDragLine('end');
    onDragLineStart();
    if (!window) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newLeft = (e.pageX - scrollObject.left.value) - cliquedLocationFlowItem.current.left;
      const newTop = (e.pageY - scrollObject.top.value) - cliquedLocationFlowItem.current.top;

      setRawLeft2(newLeft);
      setRawTop2(newTop);
    }

    const handleMouseUp = () => {
      setShowDragLine(undefined);
      setRawLeft2(rest.left2);
      setDragLine(undefined);
      setRawTop2(rest.top2);
      onDragLineEnd();
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    cliquedLocationFlowItem.current = {
      top: e.nativeEvent.pageY - rawTop2 - scrollObject.top.value,
      left: e.nativeEvent.pageX - rawLeft2 - scrollObject.left.value + 10,
    }
    setDragLine({ type: 'end', nodeId, lineId });
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }, [setDragLine, onDragLineStart, onDragLineEnd, window, scrollObject, rawTop2, rawLeft2, rest.left2, rest.top2, nodeId, lineId, width1, height1]);


  return (
    <>
      {showDragLine && (
        <line
          fill="none"
          strokeWidth="2"
          stroke="#0f77bf"
          strokeLinecap="round"
          style={{ pointerEvents: 'none' }}
          y2={showDragLine === 'end' ? rawTop2 : y2}
          x2={showDragLine === 'end' ? rawLeft2 : x2}
          y1={showDragLine === 'start' ? rawTop1 : y1}
          x1={showDragLine === 'start' ? rawLeft1 : x1}
          markerEnd={`url(#end-line-arrow-${lineId})`}
        />
      )}

      {!showDragLine && (
        <>
          <rect
            width={20}
            height={20}
            y={y1 - 10}
            x={x1 - 10}
            fill='transparent'
            onMouseDown={handleStartMouseDown}
            style={{ cursor: 'crosshair', pointerEvents: 'auto' }}
          />

          <rect
            width={20}
            height={20}
            y={y2 - 10}
            x={x2 - 10}
            fill='transparent'
            onMouseDown={handleEndMouseDown}
            style={{ cursor: 'crosshair', pointerEvents: 'auto' }}
          />
        </>
      )}
    </>
  );
};
