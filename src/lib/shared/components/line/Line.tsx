import { useMemo, useRef, useState } from 'react';
import { IObservable, useObserverValue } from 'react-observing';
import { useDrop } from 'react-use-drag-and-drop';
import { v4 as uuid } from 'uuid';

import { getEdgeParams, getCurvedPath, getStraightPath } from '../../services';
import { ILine, useBoardScrollContext, useIsSelectedItemById } from '../../context';
import { IDroppedData } from '../../../FlowEditorBoard';
import { DraggableLine } from './DraggableLine';
import { TId } from '../../types';


interface IDraggableContainerProps {
  lineIdObservable: IObservable<TId>;
  blockIdObservable: IObservable<TId>;

  nodeEnd: ILine['nodeEnd'];
  nodeStart: ILine['nodeStart'];

  isCurvedObservable: IObservable<boolean>;

  onDrop?: (data: IDroppedData<any>) => void;
}
export const Line: React.FC<IDraggableContainerProps> = ({ onDrop, ...lineProps }) => {
  const [isDraggingHoverLine, setIsDraggingHoverLine] = useState(false);
  const [isDraggingLine, setIsDraggingLine] = useState(false);

  const rawTop1 = useObserverValue(lineProps.nodeStart.top);
  const rawLeft1 = useObserverValue(lineProps.nodeStart.left);
  const rawWidth1 = useObserverValue(lineProps.nodeStart.width);
  const rawHeight1 = useObserverValue(lineProps.nodeStart.height);
  const rawTop2 = useObserverValue(lineProps.nodeEnd.top);
  const rawLeft2 = useObserverValue(lineProps.nodeEnd.left);
  const rawWidth2 = useObserverValue(lineProps.nodeEnd.width);
  const rawHeight2 = useObserverValue(lineProps.nodeEnd.height);

  const lineId = useObserverValue(lineProps.lineIdObservable);
  const blockId = useObserverValue(lineProps.blockIdObservable);
  const isCurved = useObserverValue(lineProps.isCurvedObservable);

  const isSelected = useObserverValue(useIsSelectedItemById(lineId));


  const arrowSize = useMemo(() => 2.5, []);
  const lineWidth = useMemo(() => 1, []);


  const linePathFull = useMemo(() => {
    const params = getEdgeParams(
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
        <path
          d={linePathFull}
          fill="none"
          strokeLinecap="round"
          strokeWidth={lineWidth}
          markerEnd={`url(#end-line-arrow-${lineId})`}
          stroke={(isSelected || isDraggingHoverLine) ? "#0f77bf" : "gray"}
        />
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
        isCurved={isCurved}
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
