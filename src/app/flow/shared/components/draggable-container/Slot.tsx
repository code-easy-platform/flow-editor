import { useCallback, useMemo } from 'react';
import { observe, set, useObserverValue } from 'react-observing';

import { useDragLineContext, useItemsContext } from '../../context';
import { TId } from '../../types';


interface ISlotProps {
  nodeId: TId;
  position: number;
  type: 'start' | 'end';
}
export const Slot: React.FC<ISlotProps> = ({ position, type, nodeId }) => {
  const dragLineData = useObserverValue(useDragLineContext());
  const { flowStore } = useItemsContext();


  const connectTo = useMemo(() => {
    return type === 'start' ? 'end' : 'start';
  }, [type]);

  const highlightSlot = useMemo(() => {
    return dragLineData?.type === connectTo;
  }, [dragLineData?.type, connectTo]);


  const handleDropLine = useCallback(() => {
    if (!dragLineData) return;
    if (dragLineData.nodeId === nodeId) return;
    if (dragLineData.type !== connectTo) return;


    for (const item of flowStore.value) {
      if (item.id.value === dragLineData.nodeId) {

        if (dragLineData.type === 'end') {
          set(item.connections, oldConnections => {
            oldConnections.forEach(connection => {
              if (connection.id.value === dragLineData.lineId) {
                connection.inputSlot = observe(position);
                connection.relatedId = observe(nodeId);
              }
            });

            return [...oldConnections];
          });
          return;
        }

        set(item.connections, oldConnections => {
          const removedConnection = oldConnections.find(connection => connection.id.value === dragLineData.lineId);
          if (!removedConnection) return oldConnections;

          if (removedConnection.relatedId.value === nodeId) return oldConnections;

          const itemToReceiveConnection = flowStore.value.find(item => item.id.value === nodeId);
          if (!itemToReceiveConnection) return oldConnections;


          set(itemToReceiveConnection.connections, oldConnections => [
            ...oldConnections,
            {
              id: removedConnection.id,
              relatedId: removedConnection.relatedId,
              inputSlot: dragLineData.type === 'start' ? observe(position) : removedConnection.inputSlot,
              outputSlot: dragLineData.type === 'start' ? removedConnection.outputSlot : observe(position),
            },
          ]);

          return [
            ...oldConnections.filter(connection => connection.id.value !== dragLineData.lineId),
          ];
        });
        return;
      }
    }
  }, [dragLineData, connectTo, nodeId, position]);


  return (
    <>
      <span
        onMouseUp={handleDropLine}
        data-is-line-dragging={highlightSlot}
        onMouseDown={e => e.stopPropagation()}
        style={{ [type === 'end' ? 'bottom' : 'top']: position * 16 }}
        className={`draggable-container-${type === 'end' ? 'output' : 'input'}`}
      />
    </>
  );
};
