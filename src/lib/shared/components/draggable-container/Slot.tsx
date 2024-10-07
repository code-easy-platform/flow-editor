import { useCallback } from 'react';
import { observe, set, useObserverValue } from 'react-observing';
import { v4 as uuid } from 'uuid';

import { useDragLineContext, useItemsContext } from '../../context';
import { TId } from '../../types';


interface ISlotProps {
  nodeId: TId;
  width: number;
  height: number;
  getIsDisabledDropConnection: () => boolean;
  getIsDisabledCreateConnection: () => boolean;
}
export const Slot: React.FC<ISlotProps> = ({ nodeId, height, width, getIsDisabledCreateConnection, getIsDisabledDropConnection }) => {
  const dragLineData = useObserverValue(useDragLineContext());
  const { flowStore } = useItemsContext();


  const handleDropLine = useCallback(() => {
    if (!dragLineData) return;
    if (dragLineData.nodeId === nodeId) return;


    for (const nodeItem of flowStore.value) {
      if (nodeItem.id.value === dragLineData.nodeId) {

        if (dragLineData.type === 'end') {
          if (getIsDisabledDropConnection()) return;

          if (!dragLineData.lineId) {
            set(nodeItem.connections, oldConnections => [
              ...oldConnections,
              {
                id: observe(uuid()),
                relatedId: observe(nodeId),
              }
            ]);
            return;
          }

          set(nodeItem.connections, oldConnections => {
            oldConnections.forEach(connection => {
              if (connection.id.value === dragLineData.lineId) {
                connection.relatedId = observe(nodeId);
              }
            });

            return [...oldConnections];
          });

          return;
        }

        if (getIsDisabledCreateConnection()) return;

        set(nodeItem.connections, oldConnections => {
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
            },
          ]);

          return [
            ...oldConnections.filter(connection => connection.id.value !== dragLineData.lineId),
          ];
        });
        return;
      }
    }
  }, [dragLineData, nodeId, getIsDisabledCreateConnection, getIsDisabledDropConnection]);


  return (
    <span
      onMouseUp={handleDropLine}
      onMouseDown={e => e.stopPropagation()}
      style={{
        top: -4,
        left: -4,
        width: width + 8,
        height: height + 8,
        position: 'absolute',
        //backgroundColor: 'red',
        pointerEvents: dragLineData ? 'auto' : 'none',
      }}
    />
  );
};
