import React from 'react';
import { IObservable, observe, useObserver } from 'react-observing';

import { FlowEditor, INode } from './flow';
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

const itemsMock: INode[] = [
  {
    id: observe('1'),
    top: observe(50),
    left: observe(50),
    width: observe(50),
    height: observe(60),
    render: () => <span style={{ flex: 1, padding: 8, backgroundColor:'green', border: '3px solid green' }}></span>,
    inputSlots: observe([]),
    outputSlots: observe([
      {
        ordem: observe(0),
        id: observe('slot_1'),
      }
    ]),
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
    render: () => <span style={{ flex: 1, padding: 8, backgroundColor:'green', border: '3px solid green' }}></span>,
    inputSlots: observe([
      {
        ordem: observe(0),
        id: observe('input_slot_0'),
      },
    ]),
    outputSlots: observe([
      {
        ordem: observe(0),
        id: observe('slot_2'),
      },
      {
        ordem: observe(1),
        id: observe('slot_3'),
      },
      {
        ordem: observe(2),
        id: observe('slot_4'),
      },
    ]),
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
    render: () => <span style={{ flex: 1, padding: 8, backgroundColor:'green', border: '3px solid green' }}></span>,
    inputSlots: observe([
      {
        ordem: observe(0),
        id: observe('input_slot_1'),
      },
    ]),
    outputSlots: observe([
      {
        ordem: observe(0),
        id: observe('slot_5'),
      },
    ]),
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
    render: () => <span style={{ flex: 1, padding: 8, backgroundColor:'green', border: '3px solid green' }}></span>,
    inputSlots: observe([
      {
        ordem: observe(0),
        id: observe('input_slot_2'),
      },
    ]),
    outputSlots: observe([
      {
        ordem: observe(0),
        id: observe('slot_5'),
      },
    ]),
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
    render: () => <span style={{ flex: 1, padding: 8, backgroundColor:'green', border: '3px solid green' }}></span>,
    inputSlots: observe([
      {
        ordem: observe(0),
        id: observe('input_slot_3'),
      },
      {
        ordem: observe(1),
        id: observe('input_slot_4'),
      },
      {
        ordem: observe(2),
        id: observe('input_slot_5'),
      },
    ]),
    outputSlots: observe([]),
  },
];
