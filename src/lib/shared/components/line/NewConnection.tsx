import { useMemo } from 'react';
import { observe } from 'react-observing';

import { DefaultLine } from './DefaultLine';
import { INode } from '../../context';


interface INewConnectionProps {
  node: INode;
}
export const NewConnection: React.FC<INewConnectionProps> = ({ node }) => {
  const lineId = useMemo(() => {
    return observe(undefined);
  }, [node.id]);


  if (node.disableCreateConnections?.()) return null;

  return (
    <DefaultLine
      lineId={lineId}

      nodeId={node.id}
      nodeStart={node}

      nodeEnd={node}
      relatedNodeId={node.id}

      isNewConnection={true}
    />
  );
};
