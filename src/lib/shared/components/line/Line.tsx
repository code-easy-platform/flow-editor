import { useCallback, useMemo, useRef, useState } from 'react';
import { IObservable, useObserverValue } from 'react-observing';
import { useDrop } from 'react-use-drag-and-drop';
import { v4 as uuid } from 'uuid';

import { useBoardScrollContext, useIsSelectedItemById, useToggleSelectedItem } from '../../context';
import { IDroppedData } from '../../../FlowEditorBoard';
import { getCtrlKeyBySystem } from '../../services';
import { DraggableLine } from './DraggableLine';
import { useLinePath } from './UseLinePath';
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

  isCurvedObservable: IObservable<boolean>;

  onDrop?: (data: IDroppedData<any>) => void;
}
export const Line: React.FC<IDraggableContainerProps> = ({ onDrop, ...lineProps }) => {
  const [isDraggingHoverLine, setIsDraggingHoverLine] = useState(false);
  const [isDraggingLine, setIsDraggingLine] = useState(false);

  const rawTop1 = useObserverValue(lineProps.top1Observable);
  const rawTop2 = useObserverValue(lineProps.top2Observable);
  const lineId = useObserverValue(lineProps.lineIdObservable);
  const rawLeft1 = useObserverValue(lineProps.left1Observable);
  const rawLeft2 = useObserverValue(lineProps.left2Observable);
  const blockId = useObserverValue(lineProps.blockIdObservable);
  const rawWidth1 = useObserverValue(lineProps.width1Observable);
  const rawWidth2 = useObserverValue(lineProps.width2Observable);
  const isCurved = useObserverValue(lineProps.isCurvedObservable);
  const rawHeight1 = useObserverValue(lineProps.height1Observable);
  const rawHeight2 = useObserverValue(lineProps.height2Observable);

  const isSelected = useObserverValue(useIsSelectedItemById(lineId));
  const addSelectedItem = useToggleSelectedItem();


  const arrowSize = useMemo(() => 2.5, []);
  const lineWidth = useMemo(() => 1, []);


  const linePath = useLinePath({
    isCurved,
    top1: rawTop1,
    top2: rawTop2,
    left1: rawLeft1,
    left2: rawLeft2,
    width1: rawWidth1,
    width2: rawWidth2,
    height1: rawHeight1,
    height2: rawHeight2,
  });


  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    addSelectedItem(lineId, getCtrlKeyBySystem(e.nativeEvent));
  }, [lineId]);


  const pathD = useMemo(() => {
    const getValueByAngle = (space: number) => {
      const sideAnglePercent = (linePath.sideAngle * 100) / 90;

      const spaceBySideAnglePercent = (space * sideAnglePercent) / 100;

      return /* space -  */spaceBySideAnglePercent;
    };


    let retreat = 0;
    switch (linePath.currentSide) {
      case 'left':
        retreat = getValueByAngle(-20);
        break;
      case 'right':
        retreat = (20);
        break;
      case 'top':
        retreat = getValueByAngle(-20);
        break;
      case 'bottom':
        retreat = (20);
        break;

      default: break;
    }

    const retreatX = (retreat / 2) * -1;
    const topCentralize = linePath.y1 + ((linePath.y2 - linePath.y1) / 2) + retreat;
    const leftCentralize = linePath.x1 + ((linePath.x2 - linePath.x1) / 2) + retreatX;

    const curve = `Q ${leftCentralize} ${topCentralize}`;

    return `M ${linePath.x1} ${linePath.y1} ${curve} ${linePath.x2} ${linePath.y2}`;
  }, [linePath.x1, lineId, linePath.y1, linePath.x2, linePath.y2, linePath.currentSide, linePath.sideAngle, linePath.angle]);

  const lineRef = useRef<SVGLineElement>(null);
  const scrollObject = useBoardScrollContext();
  useDrop({
    element: lineRef,
    id: useRef(uuid()).current,
    leave: () => setIsDraggingHoverLine(false),
    hover: () => setIsDraggingHoverLine(old => old ? old : true),
    drop: (data, { x, y }) => {
      setIsDraggingHoverLine(false);
      onDrop?.({
        data,
        top: y + -scrollObject.top.value,
        left: x + -scrollObject.left.value,
        target: { type: 'line', lineId, nodeId: blockId },
      });
    },
  });


  return (
    <>
      <defs>
        <marker orient="auto" refX={2.8 * arrowSize} refY={2.4 * arrowSize} markerWidth={10 * arrowSize} markerHeight={8 * arrowSize} id={`end-line-arrow-${lineId}`}>
          <polygon points={`0 ${1 * arrowSize}, ${3 * arrowSize} ${2.4 * arrowSize}, 0 ${4 * arrowSize}`} stroke={isSelected ? "#0f77bf" : "gray"} fill={isSelected ? "#0f77bf" : "gray"} />
        </marker>
      </defs>

      {(!isDraggingLine && !isCurved) && (
        <>
          <line
            fill="none"
            y1={linePath.y1}
            y2={linePath.y2}
            x1={linePath.x1}
            x2={linePath.x2}
            strokeLinecap="round"
            strokeWidth={lineWidth}
            style={{ pointerEvents: 'none' }}
            markerEnd={`url(#end-line-arrow-${lineId})`}
            stroke={(isSelected || isDraggingHoverLine) ? "#0f77bf" : "gray"}
          />
          <line
            fill="none"
            y1={linePath.y1}
            y2={linePath.y2}
            x1={linePath.x1}
            x2={linePath.x2}
            strokeWidth="14"
            stroke="transparent"
            strokeLinecap="round"
            onClick={handleMouseDown}
            style={{ pointerEvents: 'auto' }}
            ref={onDrop ? lineRef : undefined}
          />
        </>
      )}

      {(!isDraggingLine && isCurved) && (
        <>
          <path
            d={pathD}
            fill="none"
            strokeLinecap="round"
            strokeWidth={lineWidth}
            markerEnd={`url(#end-line-arrow-${lineId})`}
            stroke={(isSelected || isDraggingHoverLine) ? "#0f77bf" : "gray"}
          />
          <path
            d={pathD}
            fill="none"
            strokeWidth={14}
            stroke="transparent"
            strokeLinecap="round"
            onClick={handleMouseDown}
            style={{ pointerEvents: 'auto' }}
            ref={onDrop ? lineRef : undefined}
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

        disableStartDraggable={isCurved}

        onDragLineEnd={() => setIsDraggingLine(false)}
        onDragLineStart={() => setIsDraggingLine(true)}
      />
    </>
  );
}
