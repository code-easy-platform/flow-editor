import { ReactNode, useCallback, useMemo } from 'react';
import { IObservable, useObserver, useObserverValue } from 'react-observing';

import styles from './DraggableContainer.module.css';
import { BoardZoomStore } from '../stores';
import { gridSnap } from '../services';


interface IDraggableContainerProps {
  render: () => ReactNode;
  topObservable: IObservable<number>;
  leftObservable: IObservable<number>;
  widthObservable: IObservable<number>;
  heightObservable: IObservable<number>;
}
export const DraggableContainer: React.FC<IDraggableContainerProps> = ({ render, leftObservable, topObservable, heightObservable, widthObservable }) => {
  const [left, setLeft] = useObserver(leftObservable);
  const [top, setTop] = useObserver(topObservable);
  const height = useObserverValue(heightObservable);
  const width = useObserverValue(widthObservable);

  const mouseDown = useCallback(() => {
    const mouseMouse = (e: MouseEvent) => {
      const zeroIfLessThanZero = (num: number) => num < 0 ? 0 : num;

      setLeft(old => zeroIfLessThanZero(old + ((e.movementX / devicePixelRatio) / BoardZoomStore.value)));
      setTop(old => zeroIfLessThanZero(old + ((e.movementY / devicePixelRatio) / BoardZoomStore.value)));
    }

    const mouseUp = () => {
      window.removeEventListener('mousemove', mouseMouse);
      window.removeEventListener('mouseup', mouseUp);
    }

    window.addEventListener('mousemove', mouseMouse);
    window.addEventListener('mouseup', mouseUp);
  }, [setLeft, setTop]);

  const content = useMemo(() => render(), [render]);


  return (
    <div
      className={styles.draggableContainer}
      onMouseDown={mouseDown}
      style={{
        width: width,
        height: height,
        transform: `translate(${gridSnap(left)}px, ${gridSnap(top)}px)`,
      }}
    >
      {content}
    </div>
  );
}
