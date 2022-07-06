import { ReactNode, useCallback, useMemo, useRef } from 'react';
import { IObservable, useObserver, useObserverValue } from 'react-observing';
import { useFrame } from 'react-frame-component';

import { INodeRenderProps, useBoardScrollContext, useSnapGridContext } from '../context';
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

  const scrollObject = useBoardScrollContext();
  const snapGrid = useSnapGridContext();

  const [left, setLeft] = useObserver(leftObservable);
  const [top, setTop] = useObserver(topObservable);
  const height = useObserverValue(heightObservable);
  const width = useObserverValue(widthObservable);

  const cliquedLocationFlowItem = useRef({ top: 0, left: 0 });


  const mouseDown = useCallback((e: React.MouseEvent) => {
    if (!window) return;

    const mouseMouse = (e: MouseEvent) => {
      const zeroIfLessThanZero = (num: number) => num < 0 ? 0 : num;

      setLeft(zeroIfLessThanZero((e.pageX - scrollObject.left.value) - cliquedLocationFlowItem.current.left));
      setTop(zeroIfLessThanZero((e.pageY - scrollObject.top.value) - cliquedLocationFlowItem.current.top));
    }

    const mouseUp = () => {
      window.removeEventListener('mousemove', mouseMouse);
      window.removeEventListener('mouseup', mouseUp);
    }

    cliquedLocationFlowItem.current = {
      top: e.nativeEvent.pageY - top - scrollObject.top.value,
      left: e.nativeEvent.pageX - left - scrollObject.left.value,
    }
    window.addEventListener('mousemove', mouseMouse);
    window.addEventListener('mouseup', mouseUp);
  }, [setLeft, setTop, window, scrollObject, left, top]);


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
      className={'draggable-container'}
      style={{ width: width, height: height, transform: containerTranslate }}
    >
      {numberOfInputSlotsAsArray.map((_, index) => (
        <span
          style={{ top: index * 16 }}
          onMouseDown={e => e.stopPropagation()}
          className={'draggable-container-input'}
        />
      ))}

      <div className={'draggable-container-content'}>
        {content}
      </div>

      {numberOfOutputSlotsAsArray.map((_, index) => (
        <span
          style={{ bottom: index * 16 }}
          onMouseDown={e => e.stopPropagation()}
          className={'draggable-container-output'}
        />
      ))}
    </div>
  );
}
