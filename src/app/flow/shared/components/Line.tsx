import { useMemo } from 'react';
import { IObservable, useObserverValue } from 'react-observing';

import { useSnapGridContext } from '../context';
import { gridSnap } from '../services/GridSnap';

interface IDraggableContainerProps {
  top1Observable: IObservable<number>;
  left1Observable: IObservable<number>;
  top2Observable: IObservable<number>;
  left2Observable: IObservable<number>;

  height1Observable: IObservable<number>;
  width1Observable: IObservable<number>;
  height2Observable: IObservable<number>;
  width2Observable: IObservable<number>;

  inputSlotObservable: IObservable<number>;
  outputSlotObservable: IObservable<number>;
}
export const Line: React.FC<IDraggableContainerProps> = ({ left1Observable, top1Observable, left2Observable, width1Observable, height1Observable, top2Observable, inputSlotObservable, outputSlotObservable }) => {
  const snapGrid = useSnapGridContext();

  const top1 = useObserverValue(top1Observable);
  const top2 = useObserverValue(top2Observable);
  const left1 = useObserverValue(left1Observable);
  const left2 = useObserverValue(left2Observable);
  const width1 = useObserverValue(width1Observable);
  const height1 = useObserverValue(height1Observable);
  const inputSlot = useObserverValue(inputSlotObservable);
  const outputSlot = useObserverValue(outputSlotObservable);


  const resolvedLeft2 = useMemo(() => gridSnap(left2, snapGrid) - 10, [left2, snapGrid]);
  const resolvedLeft1 = useMemo(() => gridSnap(left1, snapGrid) + width1 + 10, [left1, width1, snapGrid]);

  const resolvedTop1 = useMemo(() => gridSnap(top1, snapGrid) + height1 - 7 - (outputSlot * 16), [top1, height1, outputSlot, snapGrid]);
  const resolvedTop2 = useMemo(() => gridSnap(top2, snapGrid) + 7 + (inputSlot * 16), [top2, inputSlot, snapGrid]);

  const pathD = useMemo(() => {
    const start = `M ${resolvedLeft1},${resolvedTop1} ${resolvedLeft1 + 5},${resolvedTop1}`;
    const middle1 = `c 0,0 -10,0 10,0`;
    const middle2 = `S ${resolvedLeft2 - 30},${resolvedTop2} ${resolvedLeft2 - 15},${resolvedTop2}`;
    const end = `M${resolvedLeft2 - 15},${resolvedTop2} ${resolvedLeft2},${resolvedTop2}`;


    return `${start} ${middle1} ${middle2} ${end}`;
  }, [resolvedLeft1, resolvedTop1, resolvedLeft2, resolvedTop2]);


  return (
    <path
      d={pathD}
      fill="none"
      stroke="#333"
      strokeWidth="4"
      strokeLinecap="round"
    />
  );
}
