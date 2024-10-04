import { useRef } from 'react';
import { observe } from 'react-observing';

import { FlowEditor } from 'flow-editor/src';
import { INode } from 'flow-editor';

import { CustomNode } from './components/CustomNode';
import { FLOW } from './../Mock';
import './../styles.css';


export const App = () => {
  const flow = useRef(observe(FLOW.map<INode>(item => ({ ...item, render: props => <CustomNode {...props} /> }))));


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
            customCSS={`
              .bg-paper {
                background-color: var(--color-background, #3a3a3a);
              }
              .border-selection {
                border: thin solid var(--color-selection, #999fff);
              }  
            `}
          />
        </div>
      </div>
    </div>
  );
}
