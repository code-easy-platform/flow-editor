import React from 'react';
import { IObservable, observe, useObserver } from 'react-observing';

import { FlowEditor } from './flow';
import './App.css';

export const App: React.FC = () => {
  return (
    <div style={{ width: '90vw', height: '90vh', margin: 20, border: '2px solid green', flex: 1 }}>
      <FlowEditor
        snapGridSize={1}
        items={itemsMock}
        backgroundSize={30}




      // backgroundColorPaper='black'
      // backgroundColorDefault='#f3f4f6'
      />
    </div>
  );
}


const ContentElement = (props: { width: IObservable<number>; height: IObservable<number>; title: string }) => {
  const [width, setWidth] = useObserver(props.width);
  const [height, setHeight] = useObserver(props.height);


  return (
    <span style={{ flex: 1, padding: 8, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
      <p>{props.title}</p>

      <span onMouseDown={e => e.stopPropagation()}>
        <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} />
        <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} />
      </span>
    </span>
  );
}

const itemsMock = [
  {
    id: observe('1'),
    top: observe(50),
    left: observe(50),
    width: observe(170),
    height: observe(120),
    render: (props: any) => <ContentElement {...props} title="Start" />,
    connections: observe([
      {
        inputSlot: observe(0),
        outputSlot: observe(0),
        relatedId: observe('2'),
      },
    ]),
  },
  {
    id: observe('2'),
    top: observe(250),
    left: observe(250),
    width: observe(100),
    height: observe(100),
    render: () => <span style={{ flex: 1, padding: 8, backgroundColor: 'brown' }}>Node</span>,
    connections: observe([
      {
        inputSlot: observe(0),
        outputSlot: observe(1),
        relatedId: observe('3'),
      },
      {
        inputSlot: observe(0),
        outputSlot: observe(0),
        relatedId: observe('4'),
      },
      {
        inputSlot: observe(2),
        outputSlot: observe(2),
        relatedId: observe('5'),
      },
    ]),
  },
  {
    id: observe('3'),
    top: observe(100),
    left: observe(550),
    width: observe(60),
    height: observe(120),
    render: () => <span style={{ flex: 1, padding: 8, backgroundColor: 'blue' }}>Teste</span>,
    connections: observe([
      {
        inputSlot: observe(0),
        outputSlot: observe(0),
        relatedId: observe('5'),
      },
    ]),
  },
  {
    id: observe('4'),
    top: observe(450),
    left: observe(500),
    width: observe(120),
    height: observe(40),
    render: () => <span style={{ flex: 1, padding: 8, backgroundColor: 'gray' }}>Testando</span>,
    connections: observe([
      {
        inputSlot: observe(1),
        outputSlot: observe(0),
        relatedId: observe('5'),
      },
    ]),
  },
  {
    id: observe('5'),
    top: observe(350),
    left: observe(750),
    width: observe(60),
    height: observe(50),
    connections: observe([]),
    render: () => <span style={{ flex: 1, padding: 8, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>End</span>,
  },
];
