import React, { useMemo } from 'react';
import { useObserverValue, useSelectorValue } from 'react-observing';

import { getCurvedPath, getStraightEdgeParams, getStraightPath } from '../../services';
import { ICustomLineProps } from '../../context';
import { BaseLine } from '../BaseLine';


export const DefaultLine: React.FC<ICustomLineProps> = (lineProps) => {
  const lineId = useObserverValue(lineProps.lineId);
  const nodeId = useObserverValue(lineProps.nodeId);

  const isDragging = useObserverValue(lineProps.isDragging);
  const isSelected = useObserverValue(lineProps.isSelected);

  const top1 = useObserverValue(lineProps.nodeStart.top);
  const left1 = useObserverValue(lineProps.nodeStart.left);
  const width1 = useObserverValue(lineProps.nodeStart.width);
  const height1 = useObserverValue(lineProps.nodeStart.height);
  const top2 = useObserverValue(lineProps.nodeEnd.top);
  const left2 = useObserverValue(lineProps.nodeEnd.left);
  const width2 = useObserverValue(lineProps.nodeEnd.width);
  const eight2 = useObserverValue(lineProps.nodeEnd.height);


  const isCurved = useSelectorValue(({ get }) => {
    return get(lineProps.nodeEnd.connections).some(connection => get(connection.relatedId) === get(lineProps.nodeStart.id));
  }, [lineProps.nodeStart.id, lineProps.nodeEnd.connections])


  const linePath = useMemo(() => {
    const params = getStraightEdgeParams(
      {
        y: top1 - 5,
        x: left1 - 5,
        width: width1 + 10,
        height: height1 + 10,
      },
      {
        y: top2 - 5,
        x: left2 - 5,
        width: width2 + 10,
        height: eight2 + 10,
      }
    );

    if (isCurved && !isDragging) {
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
  }, [isCurved, isDragging, top1, top2, left1, left2, width1, height1, width2, eight2]);

  const arrowSize = useMemo(() => 2.5, []);
  const lineWidth = useMemo(() => 1, []);


  return (
    <>
      <defs>
        <marker orient="auto" refX={2.8 * arrowSize} refY={2.4 * arrowSize} markerWidth={10 * arrowSize} markerHeight={8 * arrowSize} id={`end-line-arrow-${lineId}`}>
          <polygon points={`0 ${1 * arrowSize}, ${3 * arrowSize} ${2.4 * arrowSize}, 0 ${4 * arrowSize}`} stroke={isSelected ? "#0f77bf" : "gray"} fill={isSelected ? "#0f77bf" : "gray"} />
        </marker>
      </defs>

      <BaseLine
        lineId={lineId}
        nodeId={nodeId}

        fill="none"
        d={linePath}
        strokeWidth={lineWidth}
        stroke={isSelected ? "#0f77bf" : "gray"}
        markerEnd={`url(#end-line-arrow-${lineId})`}
      />
    </>
  );
};
