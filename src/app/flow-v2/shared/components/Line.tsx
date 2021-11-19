import { useMemo } from 'react';

import { IObservable, useObserverValue } from 'react-observing';
import { gridSnap } from '../services/GridSnap';

interface IDraggableContainerProps {
  top1Observable: IObservable<number>;
  left1Observable: IObservable<number>;
  top2Observable: IObservable<number>;
  left2Observable: IObservable<number>;
}
export const Line: React.FC<IDraggableContainerProps> = ({ left1Observable, top1Observable, left2Observable, top2Observable }) => {
  const left1 = useObserverValue(left1Observable);
  const left2 = useObserverValue(left2Observable);
  const top1 = useObserverValue(top1Observable);
  const top2 = useObserverValue(top2Observable);

  const resolvedTop1 = useMemo(() => gridSnap(top1) + 97, [top1]);
  const resolvedTop2 = useMemo(() => gridSnap(top2) + 11, [top2]);
  const resolvedLeft1 = useMemo(() => gridSnap(left1) + 97, [left1]);
  const resolvedLeft2 = useMemo(() => gridSnap(left2) + 11, [left2]);

  const resolvedLeftMiddle = useMemo(() => (resolvedLeft2 - resolvedLeft1) * 0.5, [resolvedLeft1, resolvedLeft2]);
  const resolvedTopMiddle = useMemo(() => (resolvedTop2 - resolvedTop1) * 0.5, [resolvedTop1, resolvedTop2]);

  const diferenceLeft1Left2 = useMemo(() => (resolvedLeft2 - resolvedLeft1) * -1, [resolvedLeft1, resolvedLeft2]);

  const resolvedQuadraticY = useMemo(() => {
    return diferenceLeft1Left2 > 0 ? (diferenceLeft1Left2 <= 25 ? diferenceLeft1Left2 : 25) : 0
  }, [diferenceLeft1Left2]);
  const resolvedQuadraticX = useMemo(() => {
    return 100 + (diferenceLeft1Left2 > 0 && diferenceLeft1Left2 < 200 ? diferenceLeft1Left2 : diferenceLeft1Left2 > 200 ? 200 : 0)
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
