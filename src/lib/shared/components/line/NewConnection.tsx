import { useMemo } from 'react';
import { useObserverValue } from 'react-observing';

import { DraggableLine } from './DraggableLine';
import { INode } from '../../context';


interface INewConnectionProps {
  node: INode;
}
export const NewConnection: React.FC<INewConnectionProps> = ({ node }) => {
  const height = useObserverValue(node.height);
  const width = useObserverValue(node.width);
  const left = useObserverValue(node.left);
  const top = useObserverValue(node.top);
  const id = useObserverValue(node.id);


  const arrowSize = useMemo(() => 2.5, []);
  const lineWidth = useMemo(() => 1, []);


  if (node.disableCreateConnections?.()) return null;

  return (
    <>
      <defs>
        <marker orient="auto" refX={2.8 * arrowSize} refY={2.4 * arrowSize} markerWidth={10 * arrowSize} markerHeight={8 * arrowSize} id={`end-line-arrow-${undefined}`}>
          <polygon points={`0 ${1 * arrowSize}, ${3 * arrowSize} ${2.4 * arrowSize}, 0 ${4 * arrowSize}`} stroke="#0f77bf" fill="#0f77bf" />
        </marker>
      </defs>

      <DraggableLine
        top2={top}
        top1={top}
        nodeId={id}
        left2={left}
        left1={left}
        width1={width}
        width2={width}
        height2={height}
        height1={height}
        lineId={undefined}
        newConnection={true}
        position1FromCenter={true}

        lineWidth={lineWidth}
      />
    </>
  );
};
