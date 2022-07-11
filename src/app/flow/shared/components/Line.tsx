import { useMemo } from 'react';
import { IObservable, useObserverValue } from 'react-observing';

import { useSnapGridContext } from '../context';
import { gridSnap } from '../services/GridSnap';
import { DraggableLine } from './DraggableLine';

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


  const resolvedLeft2 = useMemo(() => gridSnap(left2, snapGrid) - 5, [left2, snapGrid]);
  const resolvedLeft1 = useMemo(() => gridSnap(left1, snapGrid) + width1 + 20, [left1, width1, snapGrid]);

  const resolvedTop1 = useMemo(() => gridSnap(top1, snapGrid) + height1 - 7 - (outputSlot * 16), [top1, height1, outputSlot, snapGrid]);
  const resolvedTop2 = useMemo(() => gridSnap(top2, snapGrid) + 7 + (inputSlot * 16), [top2, inputSlot, snapGrid]);

  const diferenceLeft1Left2 = useMemo(() => {
    return (resolvedLeft2 - resolvedLeft1) - 22;
  }, [resolvedLeft1, resolvedLeft2]);

  const retreat = useMemo(() => {
    if (diferenceLeft1Left2 > 30) return -30;

    if (diferenceLeft1Left2 > 0) return diferenceLeft1Left2 * -1;

    if (diferenceLeft1Left2 < -200) return -200;

    return diferenceLeft1Left2;
  }, [diferenceLeft1Left2]);

  const pathD = useMemo(() => {
    const start = `M ${resolvedLeft1},${resolvedTop1} ${resolvedLeft1 + 5},${resolvedTop1}`;
    const middle1 = `c 0,0 ${retreat},0 0,0`;
    const middle2 = `S ${resolvedLeft2 - (-retreat + 20)},${resolvedTop2} ${resolvedLeft2 - 15},${resolvedTop2}`;
    const end = `M${resolvedLeft2 - 15},${resolvedTop2} ${resolvedLeft2},${resolvedTop2}`;

    return `${start} ${middle1} ${middle2} ${end}`;
  }, [resolvedLeft1, resolvedTop1, resolvedLeft2, resolvedTop2, retreat]);


  return (
    <>
      <path
        d={pathD}
        fill="none"
        stroke="#333"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <DraggableLine
        top1={top1}
        top2={top2}
        left1={left1}
        left2={left2}
        width={width1}
        height={height1}
        inputSlot={inputSlot}
        outputSlot={outputSlot}
      />
    </>
  );
}
