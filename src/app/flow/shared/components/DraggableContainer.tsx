import { ReactNode, useCallback, useMemo } from 'react';
import { IObservable, useObserver, useObserverValue } from 'react-observing';
import { useFrame } from 'react-frame-component';

import { INodeRenderProps, useBoardZoomContext, useSnapGridContext } from '../context';
import { gridSnap } from '../services';


interface IDraggableContainerProps {
  render: (props: INodeRenderProps) => ReactNode;

  topObservable: IObservable<number>;
  leftObservable: IObservable<number>;
  widthObservable: IObservable<number>;
  heightObservable: IObservable<number>;

  numberOfInputSlots: number;
  numberOfOutputSlots: number;
}
export const DraggableContainer: React.FC<IDraggableContainerProps> = ({ render, numberOfInputSlots, numberOfOutputSlots, leftObservable, topObservable, heightObservable, widthObservable }) => {
  const { window } = useFrame();

  const zoomObservable = useBoardZoomContext();
  const snapGrid = useSnapGridContext();

  const movementMultiplier = useMemo(() => 2, []);

  const [left, setLeft] = useObserver(leftObservable);
  const [top, setTop] = useObserver(topObservable);
  const height = useObserverValue(heightObservable);
  const width = useObserverValue(widthObservable);


  const mouseDown = useCallback(() => {
    if (!window) return;

    const mouseMouse = (e: MouseEvent) => {
      const zeroIfLessThanZero = (num: number) => num < 0 ? 0 : num;

      setLeft(old => zeroIfLessThanZero(old + (((e.movementX * movementMultiplier) / devicePixelRatio) / zoomObservable.value)));
      setTop(old => zeroIfLessThanZero(old + (((e.movementY * movementMultiplier) / devicePixelRatio) / zoomObservable.value)));
    }

    const mouseUp = () => {
      window.removeEventListener('mousemove', mouseMouse);
      window.removeEventListener('mouseup', mouseUp);
    }

    window.addEventListener('mousemove', mouseMouse);
    window.addEventListener('mouseup', mouseUp);
  }, [setLeft, setTop, movementMultiplier, zoomObservable, window]);


  const content = useMemo(() => {
    console.log('aqui')
    return render({
      width: widthObservable,
      height: heightObservable,
    });
  }, [render, widthObservable, heightObservable]);

  const containerTranslate = useMemo(() => `translate(${gridSnap(left, snapGrid)}px, ${gridSnap(top, snapGrid)}px)`, [left, top, snapGrid]);

  const numberOfInputSlotsAsArray = useMemo(() => Array.from(Array(numberOfInputSlots)), [numberOfInputSlots]);
  const numberOfOutputSlotsAsArray = useMemo(() => Array.from(Array(numberOfOutputSlots)), [numberOfOutputSlots]);


  return (
    <div
      onMouseDown={mouseDown}
      className={'draggableContainer'}
      style={{ width: width, height: height, transform: containerTranslate }}
    >
      {numberOfInputSlotsAsArray.map((item, index) => (
        <span
          style={{ top: index * 16 }}
          className={'draggableContainerInput'}
        />
      ))}

      <div className={'draggableContainerContent'}>
        {content}
      </div>

      {numberOfOutputSlotsAsArray.map((item, index) => (
        <span
          style={{ bottom: index * 16 }}
          className={'draggableContainerOutput'}
        />
      ))}
    </div>
  );
}
