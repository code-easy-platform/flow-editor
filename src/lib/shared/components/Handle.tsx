import { useCallback, useEffect, useMemo, useRef } from 'react';
import { observe, set, useObserverValue } from 'react-observing';

import { useDraggableContainerContext } from './draggable-container/DraggableContainerContext';
import { useDragLineContext, useHandlesContext, useItemsContext } from '../context';


const useHandleDropLine = () => {
  const { node } = useDraggableContainerContext();
  const dragLineContext = useDragLineContext();
  const { flowStore } = useItemsContext();


  const handleDropLine = useCallback(() => {
    const dragLineData = dragLineContext.value;

    console.log('log', dragLineData);

    if (!dragLineData) return;
    if (dragLineData.nodeId === node.id.value) return;


    for (const nodeItem of flowStore.value) {
      if (nodeItem.id.value === dragLineData.nodeId) {

        if (dragLineData.type === 'end') {
          if (node.disableDropConnections?.()) return;

          if (!dragLineData.lineId) {
            set(nodeItem.connections, oldConnections => [
              ...oldConnections,
              {
                id: observe(crypto.randomUUID()),
                relatedId: observe(node.id.value),
                endHandleId: observe(undefined),
                startHandleId: observe(undefined),
              }
            ]);
            return;
          }

          set(nodeItem.connections, oldConnections => {
            oldConnections.forEach(connection => {
              if (connection.id.value === dragLineData.lineId) {
                connection.relatedId = observe(node.id.value);
              }
            });

            return [...oldConnections];
          });

          return;
        }

        if (node.disableDropConnections?.()) return;

        set(nodeItem.connections, oldConnections => {
          const removedConnection = oldConnections.find(connection => connection.id.value === dragLineData.lineId);
          if (!removedConnection) return oldConnections;

          if (removedConnection.relatedId.value === node.id.value) return oldConnections;

          const itemToReceiveConnection = flowStore.value.find(item => item.id.value === node.id.value);
          if (!itemToReceiveConnection) return oldConnections;


          set(itemToReceiveConnection.connections, oldConnections => [
            ...oldConnections,
            {
              id: removedConnection.id,
              relatedId: removedConnection.relatedId,
              endHandleId: observe(undefined),
              startHandleId: observe(undefined),
            },
          ]);

          return [
            ...oldConnections.filter(connection => connection.id.value !== dragLineData.lineId),
          ];
        });
        return;
      }
    }
  }, [dragLineContext, node]);


  return { handleDropLine }
}


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
  const { handleDropLine } = useHandleDropLine();

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
      {...rest}
      onMouseUp={handleDropLine}
      onMouseDown={e => e.stopPropagation()}
      style={{
        borderRadius: '50%',
        cursor: 'crosshair',
        backgroundColor: 'gray',
        ...rest.style,
        width,
        height,
        top: coords.top,
        left: coords.left,
        position: 'absolute',
      }}
    />
  );
};
