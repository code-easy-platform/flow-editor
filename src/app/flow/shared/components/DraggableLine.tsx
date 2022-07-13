import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSetObserver } from 'react-observing';
import { useFrame } from 'react-frame-component';

import { useBoardScrollContext, useDragLineContext, useSnapGridContext, useToggleSelectedItem } from '../context';
import { gridSnap } from '../services';
import { TId } from '../types';


interface IDraggableLineProps {
  nodeId: TId;
  lineId: TId;
  top1: number;
  top2: number;
  left1: number;
  left2: number;
  width: number;
  height: number;
  inputSlot: number;
  outputSlot: number;
}
export const DraggableLine: React.FC<IDraggableLineProps> = ({ lineId, nodeId, height, width, inputSlot, outputSlot, ...rest }) => {
  const setDragLine = useSetObserver(useDragLineContext());
  const addSelectedItem = useToggleSelectedItem();
  const scrollObject = useBoardScrollContext();
  const snapGrid = useSnapGridContext();
  const { window } = useFrame();

  const [top1, setTop1] = useState(rest.top1);
  const [top2, setTop2] = useState(rest.top2);
  const [left1, setLeft1] = useState(rest.left1);
  const [left2, setLeft2] = useState(rest.left2);


  useEffect(() => {
    setTop1(rest.top1);
    setTop2(rest.top2);
    setLeft1(rest.left1);
    setLeft2(rest.left2);
  }, [rest.top1, rest.top2, rest.left1, rest.left2]);


  const resolvedLeft2 = useMemo(() => gridSnap(left2, snapGrid) - 5, [left2, snapGrid]);
  const resolvedLeft1 = useMemo(() => gridSnap(left1, snapGrid) + width + 20, [left1, width, snapGrid]);

  const resolvedTop1 = useMemo(() => gridSnap(top1, snapGrid) + height - 7 - (outputSlot * 16), [top1, height, outputSlot, snapGrid]);
  const resolvedTop2 = useMemo(() => gridSnap(top2, snapGrid) + 7 + (inputSlot * 16), [top2, inputSlot, snapGrid]);

  const diferenceLeft1Left2 = useMemo(() => {
    return (resolvedLeft2 - resolvedLeft1) - 22;
  }, [resolvedLeft1, resolvedLeft2]);

  const retreat = useMemo(() => {
    if (diferenceLeft1Left2 > 30) return -30;

    if (diferenceLeft1Left2 > 0) return diferenceLeft1Left2 * -1;

    if (diferenceLeft1Left2 < -30) return -30;

    return diferenceLeft1Left2;
  }, [diferenceLeft1Left2]);

  const pathD = useMemo(() => {
    const start = `M ${resolvedLeft1},${resolvedTop1} ${resolvedLeft1 + 5},${resolvedTop1}`;
    const middle1 = `c 0,0 ${retreat},0 0,0`;
    const middle2 = `S ${resolvedLeft2 - (-retreat + 20)},${resolvedTop2} ${resolvedLeft2 - 15},${resolvedTop2}`;
    const end = `M${resolvedLeft2 - 15},${resolvedTop2} ${resolvedLeft2},${resolvedTop2}`;

    return `${start} ${middle1} ${middle2} ${end}`;
  }, [resolvedLeft1, resolvedTop1, resolvedLeft2, resolvedTop2, retreat]);


  const cliquedLocationFlowItem = useRef({ top: 0, left: 0 });
  const handleStartMouseDown = useCallback((e: React.MouseEvent) => {
    addSelectedItem([lineId], false);
    if (!window) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newLeft = (e.pageX - scrollObject.left.value) - cliquedLocationFlowItem.current.left;
      const newTop = (e.pageY - scrollObject.top.value) - cliquedLocationFlowItem.current.top;

      setLeft1(newLeft);
      setTop1(newTop);
    }

    const handleMouseUp = () => {
      setDragLine(undefined);
      setLeft1(rest.left1);
      setTop1(rest.top1);
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    cliquedLocationFlowItem.current = {
      top: e.nativeEvent.pageY - top1 - scrollObject.top.value,
      left: e.nativeEvent.pageX - left1 - scrollObject.left.value - 10,
    }
    setDragLine({ type: 'start', nodeId, lineId });
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }, [setDragLine, window, scrollObject, top1, left1, rest.left1, rest.top1, nodeId, lineId]);

  const handleEndMouseDown = useCallback((e: React.MouseEvent) => {
    addSelectedItem([lineId], false);
    if (!window) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newLeft = (e.pageX - scrollObject.left.value) - cliquedLocationFlowItem.current.left;
      const newTop = (e.pageY - scrollObject.top.value) - cliquedLocationFlowItem.current.top;

      setLeft2(newLeft);
      setTop2(newTop);
    }

    const handleMouseUp = () => {
      setDragLine(undefined);
      setLeft2(rest.left2);
      setTop2(rest.top2);
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    cliquedLocationFlowItem.current = {
      top: e.nativeEvent.pageY - top2 - scrollObject.top.value,
      left: e.nativeEvent.pageX - left2 - scrollObject.left.value + 10,
    }
    setDragLine({ type: 'end', nodeId, lineId });
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }, [setDragLine, window, scrollObject, top2, left2, rest.left2, rest.top2, nodeId, lineId]);


  const showDragLine = useMemo(() => {
    return !(rest.left1 === left1 && rest.left2 === left2 && rest.top1 === top1 && rest.top2 === top2);
  }, [rest.left1, rest.left2, rest.top1, rest.top2, left1, left2, top1, top2]);


  return (
    <>
      {showDragLine && (
        <path
          d={pathD}
          fill="none"
          strokeWidth="4"
          stroke="#0f77bf"
          strokeLinecap="round"
        />
      )}

      <rect
        width={20}
        height={20}
        fill='transparent'
        y={resolvedTop1 - 10}
        x={resolvedLeft1 - 10}
        onMouseDown={handleStartMouseDown}
        style={{ cursor: 'crosshair', pointerEvents: 'auto' }}
      />

      <rect
        width={20}
        height={20}
        fill='transparent'
        y={resolvedTop2 - 10}
        x={resolvedLeft2 - 25}
        onMouseDown={handleEndMouseDown}
        style={{ cursor: 'crosshair', pointerEvents: 'auto' }}
      />
    </>
  );
};
