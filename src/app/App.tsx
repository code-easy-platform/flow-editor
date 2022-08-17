import React from 'react';
import { observe } from 'react-observing';

import { FlowEditor, INode } from './flow';
import './App.css';

export const App: React.FC = () => {
  return (
    <div style={{ width: '90vw', height: '90vh', margin: 20, border: '2px solid green', flex: 1 }}>
      <FlowEditor
        snapGridSize={15}
        items={itemsMock}
        backgroundSize={30}




      // backgroundColorPaper='black'
      // backgroundColorDefault='#f3f4f6'
      />
    </div>
  );
}


interface ILogicComponentProps {
  title: string;
  isSelected: boolean;
}
const LogicComponent = ({ title, isSelected }: ILogicComponentProps) => {

  return (
    <span style={{ flex: 1, display: 'flex', padding: 1, flexDirection: 'column', gap: 0, alignItems: 'center', overflow: 'hidden' }}>
      <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: 'white', padding: 0, margin: 0, textAlign: "center", opacity: 0.8 }}>
        {title}
      </p>

      <img
        draggable={false}
        src='https://code-easy-bfe83.web.app/static/media/start~hMHmYmIv.1e357883.svg'
        style={{ flex: 1, maxHeight: 40, pointerEvents: 'none', backgroundColor: '#1e1e1e', border: !isSelected ? 'thin solid transparent' : 'thin solid #0f77bf' }}
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
];
