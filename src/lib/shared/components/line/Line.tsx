import { useCallback, useMemo, useRef, useState } from 'react';
import { IObservable, useObserverValue } from 'react-observing';
import { useDrop } from 'react-use-drag-and-drop';
import { v4 as uuid } from 'uuid';

import { useBoardScrollContext, useIsSelectedItemById, useToggleSelectedItem } from '../../context';
import { getCtrlKeyBySystem, getEdgeParams, getCurvedPath, getStraightPath } from '../../services';
import { IDroppedData } from '../../../FlowEditorBoard';
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


  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    addSelectedItem(lineId, getCtrlKeyBySystem(e.nativeEvent));
  }, [lineId]);


  const linePath = useMemo(() => {
    const { sx, sy, tx, ty } = getEdgeParams(
      {
        y: rawTop1 - 5,
        x: rawLeft1 - 5,
        width: rawWidth1 + 10,
        height: rawHeight1 + 10,
      },
      {
        y: rawTop2 - 5,
        x: rawLeft2 - 5,
        width: rawWidth2 + 10,
        height: rawHeight2 + 10,
      }
    );

    if (isCurved) {
      const edgePath = getCurvedPath({
        sourceX: sx,
        sourceY: sy,
        targetX: tx,
        targetY: ty,
      }, sx < tx ? -35 : 35);

      return edgePath;
    } else {
      const [edgePath] = getStraightPath({
        sourceX: sx,
        sourceY: sy,
        targetX: tx,
        targetY: ty,
      });

      return edgePath;
    }
  }, [isCurved, rawTop1, rawTop2, rawLeft1, rawLeft2, rawWidth1, rawWidth2, rawHeight1, rawHeight2]);


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

      {!isDraggingLine && (
        <>
          <path
            d={linePath}
            fill="none"
            strokeLinecap="round"
            strokeWidth={lineWidth}
            markerEnd={`url(#end-line-arrow-${lineId})`}
            stroke={(isSelected || isDraggingHoverLine) ? "#0f77bf" : "gray"}
          />
          <path
            d={linePath}
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
