import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useObserverValue, useSelectorValue, useSetObserver } from 'react-observing';
import { useDrop } from 'react-use-drag-and-drop';
import { useFrame } from 'react-frame-component';
import { v4 as uuid } from 'uuid';

import { ICustomLineProps, useBoardScrollContext, useBoardZoomContext, useDragLineContext, useToggleSelectedItem } from '../../context';
import { getCtrlKeyBySystem, getCurvedPath, getEdgeParams, getStraightPath } from '../../services';


export const DefaultLine: React.FC<ICustomLineProps & { isNewConnection?: boolean }> = (lineProps) => {
  const addSelectedItem = useToggleSelectedItem();
  const dragLineContext = useDragLineContext();
  const scrollObject = useBoardScrollContext();
  const zoomObject = useBoardZoomContext();
  const { window } = useFrame();

  const setDragLine = useSetObserver(dragLineContext)

  const rawTop1Permanent = useObserverValue(lineProps.nodeStart.top);
  const rawLeft1Permanent = useObserverValue(lineProps.nodeStart.left);
  const rawWidth1Permanent = useObserverValue(lineProps.nodeStart.width);
  const rawHeight1Permanent = useObserverValue(lineProps.nodeStart.height);
  const rawTop2Permanent = useObserverValue(lineProps.nodeEnd.top);
  const rawLeft2Permanent = useObserverValue(lineProps.nodeEnd.left);
  const rawWidth2Permanent = useObserverValue(lineProps.nodeEnd.width);
  const rawHeight2Permanent = useObserverValue(lineProps.nodeEnd.height);

  const lineId = useObserverValue(lineProps.lineId);
  const nodeId = useObserverValue(lineProps.nodeId);

  const isCurved = useSelectorValue(({ get }) => {
    return get(lineProps.nodeEnd.connections).some(connection => get(connection.relatedId) === get(lineProps.nodeStart.id));
  }, [lineProps.nodeStart.id, lineProps.nodeEnd.connections])


  const isDragging = useRef(false);

  const [rawTop1, setRawTop1] = useState(rawTop1Permanent);
  const [rawTop2, setRawTop2] = useState(rawTop2Permanent);
  const [rawLeft1, setRawLeft1] = useState(rawLeft1Permanent);
  const [rawLeft2, setRawLeft2] = useState(rawLeft2Permanent);
  const [showDragLine, setShowDragLine] = useState<'start' | 'end'>();


  useEffect(() => {
    setRawTop1(rawTop1Permanent);
    setRawTop2(rawTop2Permanent);
    setRawLeft1(rawLeft1Permanent);
    setRawLeft2(rawLeft2Permanent);
  }, [rawTop1Permanent, rawTop2Permanent, rawLeft1Permanent, rawLeft2Permanent]);


  const linePath = useMemo(() => {
    const dragAroundSpace = 20;

    const params = getEdgeParams(
      {
        y: rawTop1 - (showDragLine === 'start' ? dragAroundSpace / 2 : 5),
        x: rawLeft1 - (showDragLine === 'start' ? dragAroundSpace / 2 : 5),
        width: showDragLine === 'start' ? dragAroundSpace : rawWidth1Permanent + 10,
        height: showDragLine === 'start' ? dragAroundSpace : rawHeight1Permanent + 10,
      },
      {
        y: rawTop2 - (showDragLine === 'end' ? dragAroundSpace / 2 : 5),
        x: rawLeft2 - (showDragLine === 'end' ? dragAroundSpace / 2 : 5),
        width: showDragLine === 'end' ? dragAroundSpace : rawWidth2Permanent + 10,
        height: showDragLine === 'end' ? dragAroundSpace : rawHeight2Permanent + 10,
      }
    );

    if (isCurved && !showDragLine) {
      const [path] = getCurvedPath({
        sourceX: params.sourceX,
        sourceY: params.sourceY,
        targetX: params.targetX,
        targetY: params.targetY,
      }, { offset: 35 });

      return path;
    } else {
      const [path] = getStraightPath({
        sourceX: params.sourceX,
        sourceY: params.sourceY,
        targetX: params.targetX,
        targetY: params.targetY,
      });

      return path;
    }
  }, [isCurved, showDragLine, rawTop1, rawTop2, rawLeft1, rawLeft2, rawWidth1Permanent, rawHeight1Permanent, rawWidth2Permanent, rawHeight2Permanent]);

  const arrowSize = useMemo(() => 2.5, []);
  const lineWidth = useMemo(() => 1, []);


  const handleStartMouseDown = useCallback((e: React.MouseEvent) => {
    if (lineId) addSelectedItem([lineId], getCtrlKeyBySystem(e.nativeEvent));
    if (!window) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) {
        setShowDragLine('start');
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

      setRawLeft1(rawLeft1Permanent);
      setShowDragLine(undefined);
      setRawTop1(rawTop1Permanent);
      setDragLine(undefined);
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [setDragLine, window, scrollObject, zoomObject, rawTop1, rawLeft1, rawLeft1Permanent, rawTop1Permanent, nodeId, lineId]);

  const handleEndMouseDown = useCallback((e: React.MouseEvent) => {
    if (lineId) addSelectedItem([lineId], getCtrlKeyBySystem(e.nativeEvent));
    if (!window) return;


    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) {
        setShowDragLine('end');
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

      setRawLeft2(rawLeft2Permanent);
      setRawTop2(rawTop2Permanent);
      setShowDragLine(undefined);
      setDragLine(undefined);
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }, [setDragLine, window, scrollObject, zoomObject, rawLeft2Permanent, rawTop2Permanent, nodeId, lineId]);

  const handleMoveDown = useCallback((event: React.MouseEvent<SVGPathElement>) => {
    const pathLength = event.currentTarget.getTotalLength();

    const clickX = (event.clientX - scrollObject.left.value) / zoomObject.value;
    const clickY = (event.clientY - scrollObject.top.value) / zoomObject.value;

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
  }, [handleStartMouseDown, handleEndMouseDown, scrollObject, zoomObject]);



  const lineRef = useRef<SVGLineElement>(null);
  useDrop({
    element: lineRef,
    id: useRef(uuid()).current,
    //leave: () => setIsDraggingHoverLine(false),
    //hover: () => setIsDraggingHoverLine(old => old ? old : true),
    /* drop: (data, { x, y }) => {
      //setIsDraggingHoverLine(false);
      //onDrop?.({
      //  data,
      //  top: y + -scrollObject.top.value,
      //  left: x + -scrollObject.left.value,
      //  target: { type: 'line', lineId, nodeId: blockId },
      //});
    }, */
  });


  return (
    <>
      <defs>
        <marker orient="auto" refX={2.8 * arrowSize} refY={2.4 * arrowSize} markerWidth={10 * arrowSize} markerHeight={8 * arrowSize} id={`end-line-arrow-${lineId}`}>
          <polygon points={`0 ${1 * arrowSize}, ${3 * arrowSize} ${2.4 * arrowSize}, 0 ${4 * arrowSize}`} stroke={true ? "#0f77bf" : "gray"} fill={true ? "#0f77bf" : "gray"} />
        </marker>
      </defs>

      <path
        fill="none"
        d={linePath}
        stroke="gray"
        strokeWidth={lineWidth}
        markerEnd={`url(#end-line-arrow-${lineId})`}
      />

      {lineProps.isNewConnection && (
        <rect
          x={rawLeft1 - 6.5}
          fill='transparent'
          width={rawWidth1Permanent + 15}
          height={(rawHeight1Permanent / 2) + 15}
          onMouseDown={handleEndMouseDown}
          y={rawTop1 + (rawHeight1Permanent / 2)}
          style={{ cursor: 'crosshair', pointerEvents: showDragLine ? 'none' : 'auto' }}
        />
      )}

      {(!showDragLine && !lineProps.isNewConnection) && (
        <path
          fill="none"
          d={linePath}
          ref={lineRef}
          strokeWidth={14}
          stroke="transparent"
          onMouseDown={handleMoveDown}
          style={{ cursor: 'crosshair', pointerEvents: 'auto' }}
        />
      )}
    </>
  );
};
