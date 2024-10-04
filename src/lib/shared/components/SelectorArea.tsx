import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useFrame } from 'react-frame-component';

import { useBoardScrollContext, useBoardZoomContext } from '../context';


export interface ICoords {
  startY: number,
  startX: number,
  endY: number,
  endX: number,
};

interface SelectorAreaProps {
  isDisabled?: boolean;
  onSelectionEnd?(e: MouseEvent): void;
  onSelectionStart?(e: MouseEvent): void;
  onCoordsChange?(coords: ICoords): void;
  boardRef: React.RefObject<HTMLDivElement>;
}
export const SelectorArea: React.FC<SelectorAreaProps> = ({ onSelectionEnd, onSelectionStart, isDisabled = false, onCoordsChange, boardRef }) => {
  const scrollObject = useBoardScrollContext();
  const zoomObject = useBoardZoomContext();
  const { window } = useFrame();

  const [startLeft, setStartLeft] = useState(0);
  const [display, setDisplay] = useState(false);
  const [startTop, setStartTop] = useState(0);
  const [endLeft, setEndLeft] = useState(0);
  const [endTop, setEndTop] = useState(0);


  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (!window) return;
    if (!boardRef.current?.isSameNode(e.target as Node)) return;

    onSelectionStart?.(e);

    const mouseMouse = (e: MouseEvent) => {
      setEndLeft((e.pageX - scrollObject.left.value) / zoomObject.value);
      setEndTop((e.pageY - scrollObject.top.value) / zoomObject.value);
    }

    const mouseUp = (e: MouseEvent) => {
      window.removeEventListener('mousemove', mouseMouse);
      window.removeEventListener('mouseup', mouseUp);
      onSelectionEnd?.(e);
      setDisplay(false);
    }


    setStartLeft((e.offsetX - scrollObject.left.value) / zoomObject.value);
    setStartTop((e.offsetY - scrollObject.top.value) / zoomObject.value);
    setEndLeft((e.offsetX - scrollObject.left.value) / zoomObject.value);
    setEndTop((e.offsetY - scrollObject.top.value) / zoomObject.value);
    setDisplay(true);
    window.addEventListener('mousemove', mouseMouse);
    window.addEventListener('mouseup', mouseUp);
  }, [window, scrollObject, zoomObject, boardRef]);


  useEffect(() => {
    if (!window) return;
    if (isDisabled) return;

    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, [window, isDisabled, handleMouseDown]);


  const top = useMemo(() => {
    if ((endTop - startTop) > 0) {
      return startTop;
    } else {
      if ((startTop) < endTop) {
        return startTop;
      } else {
        return endTop;
      }
    }
  }, [endTop, startTop]);

  const left = useMemo(() => {
    if ((endLeft - startLeft) > 0) {
      return startLeft;
    } else {
      if ((startLeft) < endLeft) {
        return startLeft;
      } else {
        return endLeft;
      }
    }
  }, [endLeft, startLeft]);

  const width = useMemo(() => {
    if ((endLeft - startLeft) > 0) {
      return (endLeft - startLeft);
    } else {
      const result = (startLeft - endLeft);
      if (result < 0) {
        return (endLeft - startLeft);
      } else {
        return (startLeft - endLeft);
      }
    }
  }, [endLeft, startLeft]);

  const height = useMemo(() => {
    if ((endTop - startTop) > 0) {
      return (endTop - startTop);
    } else {
      const result = (startTop - endTop);
      if (result < 0) {
        return (endTop - startTop);
      } else {
        return (startTop - endTop);
      }
    }
  }, [endTop, startTop]);


  useEffect(() => {
    onCoordsChange?.({
      startY: top,
      startX: left,
      endY: top + height,
      endX: left + width,
    });
  }, [top, left, height, width]);


  if (isDisabled || !display) return null;

  return (
    <rect
      y={top}
      x={left}
      width={width}
      height={height}
      strokeWidth={1}
      stroke={'#999fff'}
      fill={'#ffffff11'}
    />
  );
}