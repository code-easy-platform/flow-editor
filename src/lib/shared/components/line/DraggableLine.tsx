import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSetObserver } from 'react-observing';
import { useFrame } from 'react-frame-component';

import { useBoardScrollContext, useBoardZoomContext, useDragLineContext, useToggleSelectedItem } from '../../context';
import { getCtrlKeyBySystem, getCurvedPath, getEdgeParams, getStraightPath } from '../../services';
import { TId } from '../../types';


interface IDraggableLineProps {
  nodeId: TId;
  top1: number;
  top2: number;
  left1: number;
  left2: number;
  width1: number;
  width2: number;
  height1: number;
  height2: number;
  lineWidth: number;
  isCurved?: boolean;
  newConnection?: boolean;
  lineId: TId | undefined;
  onDragLineEnd?: () => void;
  onDragLineStart?: () => void;
  position1FromCenter?: boolean;
  disableStartDraggable?: boolean;
}
export const DraggableLine: React.FC<IDraggableLineProps> = ({ lineId, isCurved, newConnection = false, position1FromCenter = false, disableStartDraggable = false, nodeId, lineWidth, onDragLineEnd, onDragLineStart, ...rest }) => {
  const setDragLine = useSetObserver(useDragLineContext());
  const addSelectedItem = useToggleSelectedItem();
  const scrollObject = useBoardScrollContext();
  const zoomObject = useBoardZoomContext();
  const { window } = useFrame();

  const isDragging = useRef(false);


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


  const intersectionPoints = useMemo(() => {
    const dragAroundSpace = 20;

    return getEdgeParams(
      {
        y: rawTop1 - (showDragLine === 'start' ? dragAroundSpace / 2 : 5),
        x: rawLeft1 - (showDragLine === 'start' ? dragAroundSpace / 2 : 5),
        width: showDragLine === 'start' ? dragAroundSpace : rest.width1 + 10,
        height: showDragLine === 'start' ? dragAroundSpace : rest.height1 + 10,
      },
      {
        y: rawTop2 - (showDragLine === 'end' ? dragAroundSpace / 2 : 5),
        x: rawLeft2 - (showDragLine === 'end' ? dragAroundSpace / 2 : 5),
        width: showDragLine === 'end' ? dragAroundSpace : rest.width2 + 10,
        height: showDragLine === 'end' ? dragAroundSpace : rest.height2 + 10,
      }
    );
  }, [showDragLine, rawTop1, rawTop2, rawLeft1, rawLeft2, rest.width1, rest.height1, rest.width2, rest.height2]);


  const [linePath] = useMemo(() => {
    const path = getStraightPath({
      sourceX: intersectionPoints.sourceX,
      sourceY: intersectionPoints.sourceY,
      targetX: intersectionPoints.targetX,
      targetY: intersectionPoints.targetY,
    });

    return path;
  }, [intersectionPoints]);

  const [curvedLinePath] = useMemo(() => {
    const [path] = getCurvedPath(
      {
        sourceX: intersectionPoints.sourceX,
        sourceY: intersectionPoints.sourceY,
        targetX: intersectionPoints.targetX,
        targetY: intersectionPoints.targetY,
      },
      { offset: 35 }
    );


    return [path];
  }, [intersectionPoints]);


  const handleStartMouseDown = useCallback((e: React.MouseEvent) => {
    if (lineId) addSelectedItem([lineId], getCtrlKeyBySystem(e.nativeEvent));
    if (!window) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) {
        setShowDragLine('start');
        onDragLineStart?.();
        setDragLine({ type: 'start', nodeId, lineId });

        isDragging.current = true;
      }

      const newLeft = (e.pageX - scrollObject.left.value) / zoomObject.value;
      const newTop = (e.pageY - scrollObject.top.value) / zoomObject.value;

      setRawLeft1(newLeft);
      setRawTop1(newTop);
    }

    const handleMouseUp = () => {
      isDragging.current = false;

      setShowDragLine(undefined);
      setRawLeft1(rest.left1);
      setDragLine(undefined);
      setRawTop1(rest.top1);
      onDragLineEnd?.();
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [setDragLine, onDragLineStart, onDragLineEnd, window, scrollObject, zoomObject, rawTop1, rawLeft1, rest.left1, rest.top1, nodeId, lineId]);

  const handleEndMouseDown = useCallback((e: React.MouseEvent) => {
    if (lineId) addSelectedItem([lineId], getCtrlKeyBySystem(e.nativeEvent));
    if (!window) return;


    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) {
        setShowDragLine('end');
        onDragLineStart?.();
        setDragLine({ type: 'end', nodeId, lineId });

        isDragging.current = true;
      }

      const newLeft = (e.pageX - scrollObject.left.value) / zoomObject.value;
      const newTop = (e.pageY - scrollObject.top.value) / zoomObject.value;

      setRawLeft2(newLeft);
      setRawTop2(newTop);
    }

    const handleMouseUp = () => {
      isDragging.current = false;

      setShowDragLine(undefined);
      setRawLeft2(rest.left2);
      setDragLine(undefined);
      setRawTop2(rest.top2);
      onDragLineEnd?.();
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }, [setDragLine, onDragLineStart, onDragLineEnd, window, scrollObject, zoomObject, rest.left2, rest.top2, nodeId, lineId]);

  const handleMoveDown = useCallback((event: React.MouseEvent<SVGPathElement>) => {
    const pathLength = event.currentTarget.getTotalLength();

    const clickX = event.clientX;
    const clickY = event.clientY;

    let closestPointLength = 0;
    let closestDistance = Infinity;

    const segmentCount = 100;
    for (let i = 0; i <= segmentCount; i++) {
      const pointLength = (i / segmentCount) * pathLength;
      const point = event.currentTarget.getPointAtLength(pointLength);

      const distance = Math.sqrt(
        Math.pow(clickX - point.x, 2) + Math.pow(clickY - point.y, 2)
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestPointLength = pointLength;
      }
    }

    const halfPathLength = pathLength / 2;
    const isCloserToStart = closestPointLength <= halfPathLength;

    if (isCloserToStart) {
      handleStartMouseDown(event);
    } else {
      handleEndMouseDown(event);
    }
  }, [handleStartMouseDown, handleEndMouseDown]);


  return (
    <>
      {showDragLine && (
        <path
          fill="none"
          d={linePath}
          stroke="#0f77bf"
          strokeLinecap="round"
          strokeWidth={lineWidth}
          markerEnd={`url(#end-line-arrow-${lineId})`}
        />
      )}

      {newConnection && (
        <rect
          x={rawLeft1 - 6.5}
          fill='transparent'
          width={rest.width1 + 15}
          height={(rest.height1 / 2) + 15}
          onMouseDown={handleEndMouseDown}
          y={rawTop1 + (rest.height1 / 2)}
          style={{ cursor: 'crosshair', pointerEvents: showDragLine ? 'none' : 'auto' }}
        />
      )}

      {(!showDragLine && !newConnection) && (
        <path
          fill="none"
          strokeWidth={14}
          stroke="transparent"
          onMouseDown={handleMoveDown}
          d={isCurved ? curvedLinePath : linePath}
          style={{ cursor: 'crosshair', pointerEvents: 'auto' }}
        />
      )}
    </>
  );
};
