import { useEffect, useMemo, useRef } from 'react';
import { observe, useObserverValue } from 'react-observing';

import { useDraggableContainerContext } from './draggable-container/DraggableContainerContext';
import { useHandlesContext } from '../context';


interface IHandleProps extends React.HTMLProps<HTMLDivElement> {
  id?: string;
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  position?: "left" | "right" | "top" | "bottom";
}
export const Handle = ({ id, top, left, width = 10, height = 10, position = 'left', ...rest }: IHandleProps) => {
  const handleInternalId = useRef(crypto.randomUUID());

  const { addOrUpdate, deleteById } = useHandlesContext();
  const { node } = useDraggableContainerContext();

  const nodeHeight = useObserverValue(node.height);
  const nodeWidth = useObserverValue(node.width);


  const coords = useMemo(() => {
    let topResult = top ?? 0;
    let leftResult = left ?? 0;


    switch (position) {
      case 'left':
        topResult = (top ?? 0) + (nodeHeight / 2) - (height / 2);
        leftResult = (left ?? 0) - (width / 2);
        break;
      case 'right':
        topResult = (top ?? 0) + (nodeHeight / 2) - (height / 2);
        leftResult = (left ?? 0) + nodeWidth - (width / 2);
        break;
      case 'bottom':
        topResult = (top ?? 0) + nodeHeight - (height / 2);
        leftResult = (left ?? 0) + (nodeWidth / 2) - (width / 2);
        break;
      case 'top':
        topResult = (top ?? 0) - (height / 2);
        leftResult = (left ?? 0) + (nodeWidth / 2) - (width / 2);
        break;

      default: break;
    }


    return {
      top: topResult,
      left: leftResult,
    };
  }, [top, left, width, height, nodeHeight, nodeWidth, position]);


  useEffect(() => {
    addOrUpdate({
      _id: observe(handleInternalId.current),

      node,
      id: observe(id),
      width: observe(width),
      height: observe(height),
      top: observe(coords.top),
      left: observe(coords.left),
      position: observe(position),
    });

    return () => {
      deleteById(handleInternalId.current);
    };
  }, [addOrUpdate, deleteById, id, coords, width, height, position, node]);


  return (
    <div
      style={{
        borderRadius: '50%',
        cursor: 'crosshair',
        backgroundColor: 'gray',
        ...rest,
        width,
        height,
        top: coords.top,
        left: coords.left,
        position: 'absolute',
      }}
    />
  );
};
