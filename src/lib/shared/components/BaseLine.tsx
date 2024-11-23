import { useCallback, useRef } from 'react';
import { useDrop } from 'react-use-drag-and-drop';
import { useFrame } from 'react-frame-component';
import { observe, set, useObserverValue } from 'react-observing';

import { useBoardScrollContext, useBoardZoomContext, useDragLineContext, useToggleSelectedItem } from '../context';
import { useLineContextContext } from './line/LineContext';
import { getCtrlKeyBySystem } from '../services';
import { IDroppedData } from '../types';


interface IBaseLineProps extends Omit<React.SVGProps<SVGPathElement>, 'onDrop' | 'onDragOver' | 'onDragLeave'> {
  onDrop?: (data: IDroppedData<any>) => void;
  onDragOver?: (data: IDroppedData<any>) => void;
  onDragLeave?: (data: IDroppedData<any>) => void;
}
export const BaseLine = ({ onDragOver, onDragLeave, onDrop, ...rest }: IBaseLineProps) => {
  const addSelectedItem = useToggleSelectedItem()
  const dragLineContext = useDragLineContext();
  const scrollObject = useBoardScrollContext();
  const lineContext = useLineContextContext();
  const zoomObject = useBoardZoomContext();
  const { window } = useFrame();

  console.log(lineContext.nodeEndHandle.id.value);

  const lineId = useObserverValue(lineContext.lineId);
  const nodeId = useObserverValue(lineContext.nodeId);


  const handleStartMouseDown = useCallback((e: React.MouseEvent) => {
    if (!lineId) return;
    if (!window) return;

    addSelectedItem([lineId], getCtrlKeyBySystem(e.nativeEvent));

    const handleMouseMove = (e: MouseEvent) => {
      const newLeft = (e.pageX - scrollObject.left.value) / zoomObject.value;
      const newTop = (e.pageY - scrollObject.top.value) / zoomObject.value;

      if (dragLineContext.value) {
        set(dragLineContext.value.left, newLeft);
        set(dragLineContext.value.top, newTop);
        dragLineContext.value.handleEndId = lineContext.nodeEndHandle.id.value;
        dragLineContext.value.handleStartId = lineContext.nodeStartHandle.id.value;
      } else {
        set(dragLineContext, {
          lineId,
          nodeId,
          type: 'start',
          top: observe(newTop),
          left: observe(newLeft),
          handleEndId: lineContext.nodeEndHandle.id.value,
          handleStartId: lineContext.nodeStartHandle.id.value,
        });
      }
    }

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      set(dragLineContext, undefined);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [addSelectedItem, lineContext.nodeStartHandle.id, lineContext.nodeEndHandle.id, dragLineContext, window, scrollObject, zoomObject, nodeId, lineId]);

  const handleEndMouseDown = useCallback((e: React.MouseEvent) => {
    if (!lineId) return;
    if (!window) return;

    addSelectedItem([lineId], getCtrlKeyBySystem(e.nativeEvent));


    const handleMouseMove = (e: MouseEvent) => {
      const newLeft = (e.pageX - scrollObject.left.value) / zoomObject.value;
      const newTop = (e.pageY - scrollObject.top.value) / zoomObject.value;

      if (dragLineContext.value) {
        set(dragLineContext.value.left, newLeft);
        set(dragLineContext.value.top, newTop);
        dragLineContext.value.handleEndId = lineContext.nodeEndHandle.id.value;
        dragLineContext.value.handleStartId = lineContext.nodeStartHandle.id.value;
      } else {
        set(dragLineContext, {
          lineId,
          nodeId,
          type: 'end',
          top: observe(newTop),
          left: observe(newLeft),
          handleEndId: lineContext.nodeEndHandle.id.value,
          handleStartId: lineContext.nodeStartHandle.id.value,
        });
      }
    }

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      set(dragLineContext, undefined);
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }, [addSelectedItem, lineContext.nodeStartHandle.id, lineContext.nodeEndHandle.id, dragLineContext, window, scrollObject, zoomObject, nodeId, lineId]);


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
  }, [scrollObject, zoomObject]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (lineId) addSelectedItem([lineId], getCtrlKeyBySystem(e.nativeEvent));
  }, [addSelectedItem]);


  const lineRef = useRef<SVGLineElement>(null);
  useDrop({
    element: lineRef,
    id: lineId || '',
    leave: (data, { x, y }) => {
      onDragOver?.({
        data,
        top: y + -scrollObject.top.value,
        left: x + -scrollObject.left.value,
        target: { type: 'line', lineId, nodeId },
      });
    },
    hover: (data, { x, y }) => {
      onDragOver?.({
        data,
        top: y + -scrollObject.top.value,
        left: x + -scrollObject.left.value,
        target: { type: 'line', lineId, nodeId },
      });
    },
    drop: (data, { x, y }) => {
      onDrop?.({
        data,
        top: y + -scrollObject.top.value,
        left: x + -scrollObject.left.value,
        target: { type: 'line', lineId, nodeId },
      });
    },
  }, [onDrop, onDragOver, lineId, nodeId]);


  return (
    <>
      <path
        {...rest}
        onDrop={undefined}
      />
      <path
        {...rest}

        strokeWidth={14}
        onDrop={undefined}
        stroke="transparent"
        markerEnd={undefined}
        markerStart={undefined}
        strokeDasharray={undefined}
        onMouseDown={handleMoveDown}
        onClick={handleClick}
        style={{ cursor: 'crosshair', pointerEvents: 'auto' }}
      />
    </>
  );
};
