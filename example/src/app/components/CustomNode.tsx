import { Handle, INodeRenderProps, } from 'flow-editor/src';
import { useObserver } from 'react-observing';


export const CustomNode = (props: INodeRenderProps & { type: 'text' | 'if' }) => {
  const [isSelected] = useObserver(props.isSelected);
  const [height] = useObserver(props.height);
  const [width] = useObserver(props.width);


  return (
    <div
      style={{
        width: width - 2,
        height: height - 2,
        backgroundColor: 'green',
        border: isSelected ? 'thin solid blue' : 'thin solid transparent',
      }}
    >
      {props.type}

      <Handle id='output' position='right' />

      {props.type === 'if' && (
        <>
          <Handle id='true' position='left' top={-10} />
          <Handle id='false' position='left' top={10} />
        </>
      )}
    </div>
  );
};
