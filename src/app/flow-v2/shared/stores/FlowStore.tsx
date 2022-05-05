import { IObservable, observe, selector } from 'react-observing';

import { TId } from '../types';


export const FlowStore = observe([
  {
    id: observe('1'),
    top: observe(50),
    left: observe(50),
    width: observe(60),
    height: observe(50),
    relatedId: observe(['2']),
    render: () => <span style={{ flex: 1, padding: 8, borderRadius: 4, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>Start</span>,
  },
  {
    id: observe('2'),
    top: observe(250),
    left: observe(250),
    width: observe(100),
    height: observe(100),
    relatedId: observe(['3', '4']),
    render: () => <span style={{ flex: 1, padding: 8, borderRadius: 4, backgroundColor: 'brown' }}>Node</span>,
  },
  {
    id: observe('3'),
    top: observe(100),
    left: observe(550),
    width: observe(60),
    height: observe(120),
    relatedId: observe(['5']),
    render: () => <span style={{ flex: 1, padding: 8, borderRadius: 4, backgroundColor: 'blue' }}>Teste</span>,
  },
  {
    id: observe('4'),
    top: observe(450),
    left: observe(500),
    width: observe(120),
    height: observe(40),
    relatedId: observe(['5']),
    render: () => <span style={{ flex: 1, padding: 8, borderRadius: 4, backgroundColor: 'gray' }}>Testando</span>,
  },
  {
    id: observe('5'),
    top: observe(350),
    left: observe(750),
    width: observe(60),
    height: observe(50),
    relatedId: observe([]),
    render: () => <span style={{ flex: 1, padding: 8, borderRadius: 4, backgroundColor: 'darkred', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>End</span>,
  },
]);


export interface ILine {
  id: TId;
  top1: IObservable<number>;
  left1: IObservable<number>;
  top2: IObservable<number>;
  left2: IObservable<number>;
  height1: IObservable<number>;
  width1: IObservable<number>;
  height2: IObservable<number>;
  width2: IObservable<number>;
}
export const LinesSelector = selector<ILine[]>({
  get: ({ get }) => {
    const lines: ILine[] = [];

    const flow = get(FlowStore);

    flow.forEach(block => {
      const relatedBlocks = flow
        .filter(relatedBlock => get(relatedBlock.id) !== get(block.id))
        .filter(relatedBlock => get(block.relatedId).includes(get(relatedBlock.id)));

      relatedBlocks.forEach(relatedBlock => {
        lines.push({
          top1: block.top,
          left1: block.left,
          top2: relatedBlock.top,
          left2: relatedBlock.left,

          height1: block.height,
          width1: block.width,
          height2: relatedBlock.height,
          width2: relatedBlock.width,

          id: `${get(block.id)}-${get(relatedBlock.id)}`,
        });
      });
    });

    return lines;
  }
});


export const BoardZoomStore = observe(1);
