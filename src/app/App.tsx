import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { CodeEditor } from './code-editor/CodeEditor';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <CodeEditor />
      </DndProvider>
    </div>
  );
}

export default App;
