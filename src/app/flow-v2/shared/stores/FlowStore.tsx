import { IObservable, observe, selector } from 'react-observing';

import { TId } from '../types';


export const FlowStore = observe([
  {
    id: observe('1'),
    top: observe(50),
    left: observe(50),
    width: observe(80),
    height: observe(40),
    relatedId: observe(['2']),
    render: () => <span>Start</span>,
  },
  {
    id: observe('2'),
    top: observe(250),
    left: observe(250),
    width: observe(100),
    height: observe(100),
    relatedId: observe(['3']),
    render: () => <span>Node</span>,
  },
  {
    id: observe('3'),
    top: observe(450),
    left: observe(450),
    width: observe(80),
    height: observe(40),
    relatedId: observe(['4']),
    render: () => <span>End</span>,
  },
]);


export interface ILine {
  id: TId;
  top1: IObservable<number>;
  left1: IObservable<number>;
  top2: IObservable<number>;
  left2: IObservable<number>;
}
export const LinesSelector = selector<ILine[]>({
  get: ({ get }) => {
    const flow = get(FlowStore);

    const lines: ILine[] = [];

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
          id: `${get(block.id)}-${get(relatedBlock.id)}`,
        });
      });
    });

    return lines;
  }
});


export const BoardZoomStore = observe(1);
