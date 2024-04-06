import { useRef } from 'react';
import { observe } from 'react-observing';

import { FlowEditor } from 'flow-editor/src';

import { FLOW } from './../Mock';
import './../styles.css';


export const App = () => {
  const flow = useRef(observe(FLOW));


  return (
    <div className='w-screen h-screen bg-paper flex justify-center items-center gap-8'>

      <div className='p-2 flex flex-col gap-2'>
        Draggable items

        <div className='h-[90vh] border rounded'>
        </div>
      </div>

      <div className='p-2 flex flex-col gap-2'>
        Flow editor

        <div className='w-[70vw] h-[90vh] bg-background rounded overflow-clip'>
          <FlowEditor
            items={flow.current.value}
          />
        </div>
      </div>
    </div>
  );
}
