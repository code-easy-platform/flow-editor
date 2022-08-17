import { useCallback, useMemo, useRef } from 'react';
import { useObserver, useObserverValue } from 'react-observing';
import { useFrame } from 'react-frame-component';

import { useToggleSelectedItem, useBoardScrollContext, useIsSelectedItemById, useSnapGridContext, useDragSelectedItems, useItemsContext, INode } from '../../context';
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
      const movementX = gridSnap(newLeft, snapGrid) - node.left.value;
      const movementY = gridSnap(newTop, snapGrid) - node.top.value;

      if (movementX === 0 && movementY === 0) return;

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
  }, [setLeft, setTop, addSelectedItem, dragAllSelectedItems, gridSnap, snapGrid, id, window, scrollObject, node.left, node.top]);


  const content = useMemo(() => {
    return node.render({
      isSelected,
      width: node.width,
      height: node.height,
    });
  }, [node.render, node.width, node.height, isSelected]);

  const containerTranslate = useMemo(() => `translate(${(left)}px, ${(top)}px)`, [left, top]);


  return (
    <div
      onMouseDown={handleMouseDown}
      className='draggable-container'
      style={{ width: width, height: height, transform: containerTranslate }}
    >
      <div className='draggable-container-content'>
        {content}
      </div>

      <Slot
        nodeId={id}
        width={width}
        height={height}
      />
    </div>
  );
}
