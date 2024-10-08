import { observe } from "react-observing";

import { INode, INodeConnection } from 'flow-editor/src';

import { CustomNode } from './app/components/CustomNode';


const forConnectionNode = observe(crypto.randomUUID());

export const FLOW: INode[] = [
  {
    id: observe(crypto.randomUUID()),
    connections: observe([]),
    height: observe(32),
    width: observe(100),
    left: observe(50),
    top: observe(50),
    render: props => <CustomNode {...props} type="text" />,
  },
  {
    id: observe(crypto.randomUUID()),
    height: observe(32),
    width: observe(100),
    left: observe(50),
    top: observe(200),
    render: props => <CustomNode {...props} type="text" />,
    connections: observe<INodeConnection[]>([
      {
        relatedId: forConnectionNode,
        id: observe(crypto.randomUUID()),
        endHandleId: observe('true'),
        startHandleId: observe('output'),
      }
    ]),
  },
  {
    id: observe(crypto.randomUUID()),
    height: observe(32),
    width: observe(100),
    left: observe(50),
    top: observe(300),
    render: props => <CustomNode {...props} type="text" />,
    connections: observe<INodeConnection[]>([
      {
        relatedId: forConnectionNode,
        id: observe(crypto.randomUUID()),
        endHandleId: observe('false'),
        startHandleId: observe('output'),
      }
    ]),
  },
  {
    id: forConnectionNode,
    connections: observe([]),
    height: observe(70),
    width: observe(70),
    left: observe(300),
    top: observe(300),
    render: props => <CustomNode {...props} type="if" />,
  },
];
