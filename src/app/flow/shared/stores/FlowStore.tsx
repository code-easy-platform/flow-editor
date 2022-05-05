import { ReactNode } from 'react';
import { IObservable, observe, selector } from 'react-observing';

import { TId } from '../types';


export interface INodeConnection {
  relatedId: IObservable<TId>;
  inputSlot: IObservable<number>;
  outputSlot: IObservable<number>;
}

interface INode {
  id: IObservable<TId>;
  render: () => ReactNode;
  top: IObservable<number>;
  left: IObservable<number>;
  width: IObservable<number>;
  height: IObservable<number>;
  connections: IObservable<INodeConnection[]>;
}

export const FlowStore = observe<INode[]>([
  {
    id: observe('1'),
    top: observe(50),
    left: observe(50),
    width: observe(60),
    height: observe(50),
    render: () => <span style={{ flex: 1, padding: 8, borderRadius: 4, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>Start</span>,
    connections: observe([
      {
        inputSlot: observe(0),
        outputSlot: observe(0),
        relatedId: observe('2'),
      },
    ]),
  },
  {
    id: observe('2'),
    top: observe(250),
    left: observe(250),
    width: observe(100),
    height: observe(100),
    render: () => <span style={{ flex: 1, padding: 8, borderRadius: 4, backgroundColor: 'brown' }}>Node</span>,
    connections: observe([
      {
        inputSlot: observe(0),
        outputSlot: observe(1),
        relatedId: observe('3'),
      },
      {
        inputSlot: observe(0),
        outputSlot: observe(0),
        relatedId: observe('4'),
      },
      {
        inputSlot: observe(2),
        outputSlot: observe(2),
        relatedId: observe('5'),
      },
    ]),
  },
  {
    id: observe('3'),
    top: observe(100),
    left: observe(550),
    width: observe(60),
    height: observe(120),
    render: () => <span style={{ flex: 1, padding: 8, borderRadius: 4, backgroundColor: 'blue' }}>Teste</span>,
    connections: observe([
      {
        inputSlot: observe(0),
        outputSlot: observe(0),
        relatedId: observe('5'),
      },
    ]),
  },
  {
    id: observe('4'),
    top: observe(450),
    left: observe(500),
    width: observe(120),
    height: observe(40),
    render: () => <span style={{ flex: 1, padding: 8, borderRadius: 4, backgroundColor: 'gray' }}>Testando</span>,
    connections: observe([
      {
        inputSlot: observe(1),
        outputSlot: observe(0),
        relatedId: observe('5'),
      },
    ]),
  },
  {
    id: observe('5'),
    top: observe(350),
    left: observe(750),
    width: observe(60),
    height: observe(50),
    connections: observe([]),
    render: () => <span style={{ flex: 1, padding: 8, borderRadius: 4, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>End</span>,
  },
]);


export interface ILine {
  id: TId;
  top1: IObservable<number>;
  top2: IObservable<number>;
  left1: IObservable<number>;
  left2: IObservable<number>;
  width1: IObservable<number>;
  width2: IObservable<number>;
  height2: IObservable<number>;
  height1: IObservable<number>;
  inputSlot: IObservable<number>;
  outputSlot: IObservable<number>;
}
export const LinesSelector = selector<ILine[]>({
  get: ({ get }) => {
    const lines: ILine[] = [];

    get(FlowStore)
      .forEach((block, _, allBlocks) => {

        get(block.connections)
          .forEach(connection => {
            const relatedBlock = allBlocks.find(block => get(connection.relatedId) === get(block.id))

            if (!relatedBlock) return;


            lines.push({
              top1: block.top,
              left1: block.left,
              top2: relatedBlock.top,
              left2: relatedBlock.left,

              width1: block.width,
              height1: block.height,
              width2: relatedBlock.width,
              height2: relatedBlock.height,

              inputSlot: connection.inputSlot,
              outputSlot: connection.outputSlot,

              id: `${get(block.id)}-${get(relatedBlock.id)}`,
            });
          });
      });

    return lines;
  }
});


export const BoardZoomStore = observe(1);
