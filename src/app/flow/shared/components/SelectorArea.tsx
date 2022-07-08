import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useObserverValue } from 'react-observing';
import { useFrame } from 'react-frame-component';

import { useBoardScrollContext } from '../context';


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
  const { window } = useFrame();

  const scrollLeft = useObserverValue(scrollObject.left);
  const scrollTop = useObserverValue(scrollObject.top);

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
      setEndLeft(e.pageX);
      setEndTop(e.pageY);
    }

    const mouseUp = (e: MouseEvent) => {
      window.removeEventListener('mousemove', mouseMouse);
      window.removeEventListener('mouseup', mouseUp);
      onSelectionEnd?.(e);
      setDisplay(false);
    }

    setStartLeft(e.pageX - scrollLeft);
    setStartTop(e.pageY - scrollTop);
    setEndLeft(e.pageX);
    setEndTop(e.pageY);
    setDisplay(true);
    window.addEventListener('mousemove', mouseMouse);
    window.addEventListener('mouseup', mouseUp);
  }, [window, scrollObject, scrollLeft, scrollTop, boardRef]);


  useEffect(() => {
    if (!window) return;

    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, [window, handleMouseDown]);


  const top = useMemo(() => {
    if ((endTop - startTop) > 0) {
      return startTop + scrollTop;
    } else {
      if ((startTop + scrollTop) < endTop) {
        return startTop + scrollTop;
      } else {
        return endTop;
      }
    }
  }, [endTop, startTop, scrollTop]);

  const left = useMemo(() => {
    if ((endLeft - startLeft) > 0) {
      return startLeft + scrollLeft;
    } else {
      if ((startLeft + scrollLeft) < endLeft) {
        return startLeft + scrollLeft;
      } else {
        return endLeft;
      }
    }
  }, [endLeft, startLeft, scrollLeft]);

  const width = useMemo(() => {
    if ((endLeft - startLeft) > 0) {
      return (endLeft - startLeft) - scrollLeft;
    } else {
      const result = (startLeft - endLeft) + scrollLeft;
      if (result < 0) {
        return (endLeft - startLeft) - scrollLeft;
      } else {
        return (startLeft - endLeft) + scrollLeft;
      }
    }
  }, [endLeft, startLeft, scrollLeft]);

  const height = useMemo(() => {
    if ((endTop - startTop) > 0) {
      return (endTop - startTop) - scrollTop;
    } else {
      const result = (startTop - endTop) + scrollTop;
      if (result < 0) {
        return (endTop - startTop) - scrollTop;
      } else {
        return (startTop - endTop) + scrollTop;
      }
    }
  }, [endTop, startTop, scrollTop]);



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