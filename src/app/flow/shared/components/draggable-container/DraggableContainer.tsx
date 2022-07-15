import { ReactNode, useCallback, useMemo, useRef } from 'react';
import { useObserver, useObserverValue } from 'react-observing';
import { useFrame } from 'react-frame-component';

import { INodeRenderProps, useToggleSelectedItem, useBoardScrollContext, useIsSelectedItemById, useSnapGridContext, useDragSelectedItems, useItemsContext, INode } from '../../context';
import { gridSnap, getCtrlKeyBySystem } from '../../services';
import { Slot } from './Slot';


interface IDraggableContainerProps {
  node: INode;
}
export const DraggableContainer: React.FC<IDraggableContainerProps> = ({ node }) => {
  const { window } = useFrame();

  const id = useObserverValue(node.id);

  const dragAllSelectedItems = useDragSelectedItems();
  const addSelectedItem = useToggleSelectedItem();
  const { selectedItemsId } = useItemsContext();
  const scrollObject = useBoardScrollContext();
  const isSelected = useIsSelectedItemById(id);
  const snapGrid = useSnapGridContext();

  const [outputSlots] = useObserver(node.outputSlots);
  const [inputSlots] = useObserver(node.inputSlots);
  const [left, setLeft] = useObserver(node.left);
  const height = useObserverValue(node.height);
  const [top, setTop] = useObserver(node.top);
  const width = useObserverValue(node.width);

  const cliquedLocationFlowItem = useRef({ top: 0, left: 0 });


  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    addSelectedItem(id, getCtrlKeyBySystem(e.nativeEvent));

    if (!selectedItemsId.value.some(selectedId => selectedId === id)) return;
    if (!window) return;

    const mouseMouse = (e: MouseEvent) => {
      const newLeft = (e.pageX - scrollObject.left.value) - cliquedLocationFlowItem.current.left;
      const newTop = (e.pageY - scrollObject.top.value) - cliquedLocationFlowItem.current.top;
      const movementX = newLeft - node.left.value;
      const movementY = newTop - node.top.value;

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
  }, [setLeft, setTop, addSelectedItem, dragAllSelectedItems, id, window, scrollObject, node.left, node.top]);


  const content = useMemo(() => {
    return node.render({
      width: node.width,
      height: node.height,
    });
  }, [node.render, node.width, node.height]);

  const containerTranslate = useMemo(() => `translate(${gridSnap(left, snapGrid)}px, ${gridSnap(top, snapGrid)}px)`, [left, top, snapGrid]);


  return (
    <div
      data-selected={isSelected}
      onMouseDown={handleMouseDown}
      className='draggable-container'
      style={{ width: width, height: height, transform: containerTranslate }}
    >
      {inputSlots.map((slot, index) => (
        <Slot
          nodeId={id}
          type='start'
          position={index}
          key={slot.id.value}
        />
      ))}

      <div className='draggable-container-content'>
        {content}
      </div>

      {outputSlots.map((slot, index) => (
        <Slot
          type='end'
          nodeId={id}
          position={index}
          key={slot.id.value}
        />
      ))}
    </div>
  );
}
