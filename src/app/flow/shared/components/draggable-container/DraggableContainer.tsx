import { ReactNode, useCallback, useMemo, useRef } from 'react';
import { IObservable, useObserver, useObserverValue } from 'react-observing';
import { useFrame } from 'react-frame-component';

import { INodeRenderProps, useToggleSelectedItem, useBoardScrollContext, useIsSelectedItemById, useSnapGridContext, useDragSelectedItems, useDragLineContext, useItemsContext } from '../../context';
import { gridSnap, getCtrlKeyBySystem } from '../../services';
import { TId } from '../../types';
import { Slot } from './Slot';


interface IDraggableContainerProps {
  render: (props: INodeRenderProps) => ReactNode;

  idObservable: IObservable<TId>;
  topObservable: IObservable<number>;
  leftObservable: IObservable<number>;
  widthObservable: IObservable<number>;
  heightObservable: IObservable<number>;

  numberOfInputSlots: number;
  numberOfOutputSlots: number;
}
export const DraggableContainer: React.FC<IDraggableContainerProps> = ({ render, idObservable, numberOfInputSlots, numberOfOutputSlots, leftObservable, topObservable, heightObservable, widthObservable }) => {
  const { window } = useFrame();

  const id = useObserverValue(idObservable);

  const dragAllSelectedItems = useDragSelectedItems();
  const addSelectedItem = useToggleSelectedItem();
  const { selectedItemsId } = useItemsContext();
  const scrollObject = useBoardScrollContext();
  const isSelected = useIsSelectedItemById(id);
  const snapGrid = useSnapGridContext();

  const [left, setLeft] = useObserver(leftObservable);
  const [top, setTop] = useObserver(topObservable);
  const height = useObserverValue(heightObservable);
  const width = useObserverValue(widthObservable);

  const cliquedLocationFlowItem = useRef({ top: 0, left: 0 });


  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    addSelectedItem(id, getCtrlKeyBySystem(e.nativeEvent));

    if (!selectedItemsId.value.some(selectedId => selectedId === id)) return;
    if (!window) return;

    const mouseMouse = (e: MouseEvent) => {
      const newLeft = (e.pageX - scrollObject.left.value) - cliquedLocationFlowItem.current.left;
      const newTop = (e.pageY - scrollObject.top.value) - cliquedLocationFlowItem.current.top;
      const movementX = newLeft - leftObservable.value;
      const movementY = newTop - topObservable.value;

      dragAllSelectedItems(movementX, movementY);
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
  }, [setLeft, setTop, addSelectedItem, dragAllSelectedItems, id, window, scrollObject, leftObservable, topObservable]);


  const content = useMemo(() => {
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
      data-selected={isSelected}
      onMouseDown={handleMouseDown}
      className={'draggable-container'}
      style={{ width: width, height: height, transform: containerTranslate }}
    >
      {numberOfInputSlotsAsArray.map((_, index) => (
        <Slot
          type='start'
          position={index}
        />
      ))}

      <div className={'draggable-container-content'}>
        {content}
      </div>

      {numberOfOutputSlotsAsArray.map((_, index) => (
        <Slot
          type='end'
          position={index}
        />
      ))}
    </div>
  );
}
