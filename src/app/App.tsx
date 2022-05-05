import React from 'react';

import { FlowEditor } from './flow';
import './App.css';

export const App: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <FlowEditor
        backgroundSize={30}
      // backgroundColorPaper='black'
      // backgroundColorDefault='#f3f4f6'
      />
    </div>
  );
}
