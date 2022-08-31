import { useMemo } from 'react';
import { useObserverValue } from 'react-observing';

import { INode } from '../../context';
import { DraggableLine } from './DraggableLine';


interface INewConnectionProps {
  node: INode;
}
export const NewConnection: React.FC<INewConnectionProps> = ({ node }) => {
  const height = useObserverValue(node.height);
  const width = useObserverValue(node.width);
  const left = useObserverValue(node.left);
  const top = useObserverValue(node.top);
  const id = useObserverValue(node.id);


  const extraSpace = useMemo(() => 4, []);
  const lineWidth = useMemo(() => 1, []);


  return (
    <>
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

        lineWidth={lineWidth}
        extraSpace={extraSpace}
      />
    </>
  );
};
