import { useMemo } from 'react';

import { IObservable, useObserverValue } from 'react-observing';
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
}
export const Line: React.FC<IDraggableContainerProps> = ({ left1Observable, top1Observable, left2Observable, width1Observable, height1Observable, top2Observable }) => {
  const left1 = useObserverValue(left1Observable);
  const left2 = useObserverValue(left2Observable);
  const top1 = useObserverValue(top1Observable);
  const top2 = useObserverValue(top2Observable);
  const width1 = useObserverValue(width1Observable);
  const height1 = useObserverValue(height1Observable);

  const resolvedTop2 = useMemo(() => gridSnap(top2) + 10, [top2]);
  const resolvedLeft2 = useMemo(() => gridSnap(left2) - 10, [left2]);
  const resolvedTop1 = useMemo(() => gridSnap(top1) + height1 - 10, [top1, height1]);
  const resolvedLeft1 = useMemo(() => gridSnap(left1) + width1 + 10, [left1, width1]);

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
