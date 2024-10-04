import { observe } from "react-observing";

import { INode } from 'flow-editor/src';

import { CustomNode } from './app/components/CustomNode';


export const FLOW: INode[] = [
  {
    id: observe(crypto.randomUUID()),
    connections: observe([]),
    height: observe(32),
    width: observe(100),
    left: observe(50),
    top: observe(50),
    render: CustomNode,
  },
  {
    id: observe(crypto.randomUUID()),
    connections: observe([]),
    height: observe(32),
    width: observe(100),
    left: observe(50),
    top: observe(200),
    render: CustomNode,
  },
  {
    id: observe(crypto.randomUUID()),
    connections: observe([]),
    height: observe(32),
    width: observe(100),
    left: observe(50),
    top: observe(300),
    render: CustomNode,
  },
  {
    id: observe(crypto.randomUUID()),
    connections: observe([]),
    height: observe(100),
    width: observe(100),
    left: observe(250),
    top: observe(100),
    render: CustomNode,
  },
];
