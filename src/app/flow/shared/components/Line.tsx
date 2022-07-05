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

  const resolvedTop1 = useMemo(() => gridSnap(top1, snapGrid) + height1 - 4 - (outputSlot * 16), [top1, height1, outputSlot, snapGrid]);
  const resolvedTop2 = useMemo(() => gridSnap(top2, snapGrid) + 10 + (inputSlot * 16), [top2, inputSlot, snapGrid]);


  const resolvedLeftMiddle = useMemo(() => (resolvedLeft2 - resolvedLeft1) * 0.5, [resolvedLeft1, resolvedLeft2]);
  const resolvedTopMiddle = useMemo(() => (resolvedTop2 - resolvedTop1) * 0.5, [resolvedTop1, resolvedTop2]);

  const diferenceLeft1Left2 = useMemo(() => (resolvedLeft2 - resolvedLeft1) * -1, [resolvedLeft1, resolvedLeft2]);

  const resolvedQuadraticY = useMemo(() => {
    if (diferenceLeft1Left2 <= 0) return 0;

    if (diferenceLeft1Left2 > 25) return 25;

    return diferenceLeft1Left2;
  }, [diferenceLeft1Left2]);

  const resolvedQuadraticX = useMemo(() => {
    if (diferenceLeft1Left2 > 0 && diferenceLeft1Left2 < 200) return 100 + diferenceLeft1Left2;

    if (diferenceLeft1Left2 > 200) return 100 + 200;

    return 100;
  }, [diferenceLeft1Left2]);


  return (
    <path
      fill="none"
      stroke="#333"
      strokeWidth="4"
      strokeLinecap="round"
      d={`M${resolvedLeft1},${resolvedTop1} q${resolvedQuadraticX},${resolvedQuadraticY} ${resolvedLeftMiddle},${resolvedTopMiddle} T${resolvedLeft2},${resolvedTop2}`}
    />
  );
}
