import { useCallback, useRef } from 'react';
import { observe, set, useObserverValue } from 'react-observing';
import { DragAndDropProvider } from 'react-use-drag-and-drop';

import { FlowEditor, IDroppedData } from 'flow-editor/src';
import { INode } from 'flow-editor';

import { DraggableItem } from './components/DraggableItem';
import { CustomNode } from './components/CustomNode';
import { FLOW } from './../Mock';
import './../styles.css';


export const App = () => {
  const flow = useRef(observe(FLOW.map<INode>(item => ({ ...item, render: props => <CustomNode {...props} /> }))));

  const value = useObserverValue(flow.current);


  const handleDrop = useCallback(({ left, top }: IDroppedData<any>) => {
    set(flow.current, old => [
      ...old,
      {
        id: observe(crypto.randomUUID()),
        connections: observe([]),
        height: observe(100),
        width: observe(100),
        left: observe(left - 50),
        top: observe(top - 50),
        render: props => <CustomNode {...props} />,
      },
    ]);
  }, []);


  return (
    <DragAndDropProvider>
      <div className='w-screen h-screen bg-paper flex justify-center items-center gap-8'>

        <div className='p-2 flex flex-col gap-2'>
          Draggable items

          <div className='h-[90vh] border rounded p-2 flex flex-col'>
            <DraggableItem />
          </div>
        </div>

        <div className='p-2 flex flex-col gap-2'>
          Flow editor

          <div className='w-[70vw] h-[90vh] bg-background rounded overflow-clip'>
            <FlowEditor
              items={value}
              snapGridSize={1}
              onDrop={handleDrop}
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
    </DragAndDropProvider>
  );
}
