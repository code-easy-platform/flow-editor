import { useMemo } from 'react';
import { useObserverValue } from 'react-observing';

import { useDragLineContext } from '../../context';


interface ISlotProps {
  position: number;
  type: 'start' | 'end';
}
export const Slot: React.FC<ISlotProps> = ({ position, type }) => {
  const dragLineData = useObserverValue(useDragLineContext());


  const connectTo = useMemo(() => {
    return type === 'start' ? 'end' : 'start';
  }, [type])

  const highlightSlot = useMemo(() => {
    return dragLineData?.type === connectTo;
  }, [dragLineData?.type, connectTo])


  return (
    <>
      <span
        data-is-line-dragging={highlightSlot}
        onMouseDown={e => e.stopPropagation()}
        onMouseUp={() => console.log(dragLineData)}
        style={{ [type === 'end' ? 'bottom' : 'top']: position * 16 }}
        className={`draggable-container-${type === 'end' ? 'output' : 'input'}`}
      />
    </>
  );
};
