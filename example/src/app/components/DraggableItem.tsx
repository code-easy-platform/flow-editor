import { useRef } from 'react';
import { useDrag } from 'react-use-drag-and-drop';



interface IDraggableItemProps { }
export const DraggableItem = ({ }: IDraggableItemProps) => {
  const itemRef = useRef<HTMLButtonElement>(null);


  const { isDragging } = useDrag({
    id: '1',
    data: {},
    element: itemRef,
  });



  return (
    <button ref={itemRef} data-dragging={isDragging} className='p-4 border border-background data-[dragging=true]:opacity-40'>
      Item
    </button>
  );
};
