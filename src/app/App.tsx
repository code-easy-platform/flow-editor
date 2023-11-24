import React, { useRef, useState } from 'react';
import { useDrag } from 'react-use-drag-and-drop';
import { IObservable, observe, set, useObserverValue } from 'react-observing';
import { v4 as uuid } from 'uuid';

import { FlowEditor, IDroppedData, INode, INodeConnection } from './flow';
import './App.css';

export const App: React.FC = () => {
  const [items, setItems] = useState(itemsMock);
  const buttonRef = useRef<HTMLButtonElement>(null);


  const { isDragging } = useDrag({
    id: uuid(),
    data: 'Teste',
    element: buttonRef,
  });


  const handleDrop = (data: IDroppedData<string>) => {
    console.log(data);

    if (data.target.type === 'board') {
      setItems(old => {
        return [
          ...old,
          {
            width: observe(50),
            height: observe(60),
            id: observe(uuid()),
            connections: observe([]),
            top: observe(data.top - 35),
            left: observe(data.left - 25),
            render: (props) => <LogicComponent title={data.data} {...props} />,
          },
        ];
      });
    } else {
      const node: INode = {
        width: observe(50),
        height: observe(60),
        id: observe(uuid()),
        connections: observe([]),
        top: observe(data.top - 35),
        left: observe(data.left - 25),
        render: (props) => <LogicComponent title={data.data} {...props} />,
      };

      setItems(old => {
        const targetNode = old.find(oldNode => oldNode.id.value === data.target.nodeId);
        if (!targetNode) return old;

        const targetLine = targetNode.connections.value.find(oldLine => oldLine.id.value === data.target.lineId);
        if (!targetLine) return old;

        const newLine: INodeConnection = {
          id: observe(node.id.value),
          relatedId: targetLine.relatedId,
        }

        targetLine.relatedId = observe(node.id.value);

        return [
          ...old,
          {
            ...node,
            connections: observe([newLine]),
          },
        ];
      });
    }
  }


  return (
    <>
      <button ref={buttonRef}>{isDragging ? "Arrastando..." : "Arraste"}</button>

      <div style={{ width: '90vw', height: '90vh', margin: 20, border: '2px solid green', flex: 1 }}>
        <FlowEditor
          items={items}
          snapGridSize={15}
          backgroundSize={30}

          //disableDropInLines

          onRemove={ids => setItems(oldItems => {
            const newItems = oldItems.filter(item => !ids.includes(item.id.value))

            newItems.forEach(item => {
              const newConnections = item.connections.value.filter(connection => !ids.includes(connection.id.value))
              if (item.connections.value.length === newConnections.length) return;

              set(item.connections, newConnections);
            });

            return newItems;
          })}

          onDrop={handleDrop}

        // backgroundDotColor='darkgray'
        // backgroundColorPaper='black'
        // backgroundColorDefault='#f3f4f6'
        />
      </div>
    </>
  );
}


interface ILogicComponentProps {
  title: string;
  isSelected: IObservable<boolean>;
}
const LogicComponent = ({ title, isSelected }: ILogicComponentProps) => {
  const selected = useObserverValue(isSelected);

  return (
    <span style={{ flex: 1, display: 'flex', padding: 1, flexDirection: 'column', gap: 0, alignItems: 'center', overflow: 'hidden' }}>
      <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: 'white', padding: 0, margin: 0, textAlign: "center", opacity: 0.8 }}>
        {title}
      </p>

      <img
        draggable={false}
        src='https://code-easy-bfe83.web.app/static/media/start~hMHmYmIv.1e357883.svg'
        style={{ flex: 1, maxHeight: 40, pointerEvents: 'none', backgroundColor: '#1e1e1e', border: !selected ? 'thin solid transparent' : 'thin solid #0f77bf' }}
      />
    </span>
  );
}


const itemsMock: INode[] = [
  {
    id: observe('1'),
    top: observe(50),
    left: observe(50),
    width: observe(50),
    height: observe(60),
    render: (props) => <LogicComponent title='Start' {...props} />,
    connections: observe([
      {
        inputSlot: observe(0),
        outputSlot: observe(0),
        relatedId: observe('2'),
        id: observe('line-id_0'),
      },
    ]),
  },
  {
    id: observe('2'),
    top: observe(250),
    left: observe(250),
    width: observe(50),
    height: observe(60),
    render: (props) => <LogicComponent title='If' {...props} />,
    connections: observe([
      {
        inputSlot: observe(1),
        outputSlot: observe(1),
        relatedId: observe('5'),
        id: observe('line-id_1'),
      },
      {
        inputSlot: observe(0),
        outputSlot: observe(0),
        relatedId: observe('4'),
        id: observe('line-id_2'),
      },
      {
        inputSlot: observe(0),
        outputSlot: observe(2),
        relatedId: observe('3'),
        id: observe('line-id_3'),
      },
    ]),
  },
  {
    id: observe('3'),
    top: observe(100),
    left: observe(550),
    width: observe(50),
    height: observe(60),
    render: (props) => <LogicComponent title='Switch' {...props} />,
    connections: observe([
      {
        inputSlot: observe(0),
        outputSlot: observe(0),
        relatedId: observe('5'),
        id: observe('line-id_4'),
      },
    ]),
  },
  {
    id: observe('4'),
    top: observe(450),
    left: observe(500),
    width: observe(50),
    height: observe(60),
    render: (props) => <LogicComponent title='ForEach' {...props} />,
    connections: observe([
      {
        inputSlot: observe(2),
        outputSlot: observe(0),
        relatedId: observe('5'),
        id: observe('line-id_5'),
      },
    ]),
  },
  {
    id: observe('5'),
    top: observe(350),
    left: observe(750),
    width: observe(50),
    height: observe(60),
    connections: observe([]),
    render: (props) => <LogicComponent title='End' {...props} />,
  },
  {
    id: observe('6'),
    top: observe(250),
    left: observe(850),
    width: observe(150),
    height: observe(60),
    connections: observe([]),
    render: ({ isSelected }) => (
      <div style={{ flex: 1, border: !isSelected.value ? '2px solid transparent' : '2px solid #0f77bf' }}>
        <textarea style={{ backgroundColor: 'green', padding: 8 }} onMouseDown={e => e.stopPropagation()}>

        </textarea>
      </div>
    ),
  },
];
