import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSetObserver } from 'react-observing';
import { useFrame } from 'react-frame-component';

import { useBoardScrollContext, useDragLineContext, useToggleSelectedItem } from '../../context';
import { useLinePath } from './UseLinePath';
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
  newConnection?: boolean;
  lineId: TId | undefined;
  onDragLineEnd?: () => void;
  onDragLineStart?: () => void;
  disableStartDraggable?: boolean;
}
export const DraggableLine: React.FC<IDraggableLineProps> = ({ lineId, newConnection = false, disableStartDraggable = false, nodeId, lineWidth, onDragLineEnd, onDragLineStart, ...rest }) => {
  const setDragLine = useSetObserver(useDragLineContext());
  const addSelectedItem = useToggleSelectedItem();
  const scrollObject = useBoardScrollContext();
  const { window } = useFrame();


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


  const linePath = useLinePath({
    top1: rawTop1,
    top2: rawTop2,
    left1: rawLeft1,
    left2: rawLeft2,
    width1: rest.width1,
    width2: rest.width2,
    height1: rest.height1,
    height2: rest.height2,
  });


  const cliquedLocationFlowItem = useRef({ top: 0, left: 0 });
  const handleStartMouseDown = useCallback((e: React.MouseEvent) => {
    if (lineId) addSelectedItem([lineId], false);
    setShowDragLine('start');
    onDragLineStart?.();
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
      onDragLineEnd?.();
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    cliquedLocationFlowItem.current = {
      top: e.nativeEvent.pageY - linePath.y1 - scrollObject.top.value,
      left: e.nativeEvent.pageX - linePath.x1 - scrollObject.left.value - 10,
    }
    handleMouseMove(e.nativeEvent);

    setDragLine({ type: 'start', nodeId, lineId });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [setDragLine, onDragLineStart, onDragLineEnd, window, scrollObject, rawTop1, rawLeft1, linePath.y1, linePath.x1, rest.left1, rest.top1, nodeId, lineId]);

  const handleEndMouseDown = useCallback((e: React.MouseEvent) => {
    if (lineId) addSelectedItem([lineId], false);
    setShowDragLine('end');
    onDragLineStart?.();
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
      onDragLineEnd?.();
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    cliquedLocationFlowItem.current = {
      top: e.nativeEvent.pageY - linePath.y2 - scrollObject.top.value,
      left: e.nativeEvent.pageX - linePath.x2 - scrollObject.left.value + 10,
    }
    handleMouseMove(e.nativeEvent);

    setDragLine({ type: 'end', nodeId, lineId });
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }, [setDragLine, onDragLineStart, onDragLineEnd, window, scrollObject, linePath.y2, linePath.x2, rest.left2, rest.top2, nodeId, lineId]);


  return (
    <>
      {showDragLine && (
        <line
          fill="none"
          stroke="#0f77bf"
          strokeLinecap="round"
          strokeWidth={lineWidth}
          style={{ pointerEvents: 'none' }}
          markerEnd={`url(#end-line-arrow-${lineId})`}
          y1={showDragLine === 'start' ? rawTop1 : linePath.y1}
          y2={showDragLine === 'end' ? rawTop2 - (linePath.extraSpace / 2) : linePath.y2}
          x2={showDragLine === 'end' ? rawLeft2 + (linePath.extraSpace / 2) : linePath.x2}
          x1={showDragLine === 'start' ? rawLeft1 - (linePath.extraSpace / 2) : linePath.x1}
        />
      )}

      {newConnection && (
        <rect
          x={rawLeft1 - 3}
          fill='transparent'
          width={linePath.width1}
          height={(linePath.height1 / 2)}
          onMouseDown={handleEndMouseDown}
          y={rawTop1 + (linePath.height1 / 2) + 2}
          style={{ cursor: 'crosshair', pointerEvents: showDragLine ? 'none' : 'auto' }}
        />
      )}

      {(!showDragLine && !newConnection) && (
        <>
          {!disableStartDraggable && (
            <rect
              width={20}
              height={20}
              fill='transparent'
              y={linePath.y1 - 10}
              x={linePath.x1 - 10}
              onMouseDown={handleStartMouseDown}
              style={{ cursor: 'crosshair', pointerEvents: 'auto' }}
            />
          )}

          <rect
            width={20}
            height={20}
            fill='transparent'
            y={linePath.y2 - 10}
            x={linePath.x2 - 10}
            onMouseDown={handleEndMouseDown}
            style={{ cursor: 'crosshair', pointerEvents: 'auto' }}
          />
        </>
      )}
    </>
  );
};
