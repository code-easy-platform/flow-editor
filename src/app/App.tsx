import React from 'react';
import { observe } from 'react-observing';

import { FlowEditor } from './flow';
import './App.css';

export const App: React.FC = () => {
  return (
    <div style={{ width: '700px', height: '600px', margin: 20, border: '2px solid green' }}>
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



const itemsMock = [
  {
    id: observe('1'),
    top: observe(50),
    left: observe(50),
    width: observe(60),
    height: observe(50),
    render: () => <span style={{ flex: 1, padding: 8, borderRadius: 4, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>Start</span>,
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
    render: () => <span style={{ flex: 1, padding: 8, borderRadius: 4, backgroundColor: 'brown' }}>Node</span>,
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
    render: () => <span style={{ flex: 1, padding: 8, borderRadius: 4, backgroundColor: 'blue' }}>Teste</span>,
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
    render: () => <span style={{ flex: 1, padding: 8, borderRadius: 4, backgroundColor: 'gray' }}>Testando</span>,
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
    render: () => <span style={{ flex: 1, padding: 8, borderRadius: 4, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>End</span>,
  },
];
