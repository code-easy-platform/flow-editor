import { INodeRenderProps } from 'flow-editor';
import { useObserver } from 'react-observing';



export const CustomNode = (props: INodeRenderProps) => {
  const [isSelected] = useObserver(props.isSelected);
  const [height] = useObserver(props.height);
  const [width] = useObserver(props.width);


  return (
    <div
      style={{
        width: width - 2,
        height: height - 2,
        backgroundColor: 'red',
        border: isSelected ? 'thin solid blue' : 'thin solid transparent',
      }}
    >
      CustomNode
    </div>
  );
};
