import React from 'react';

import './App.scss';
import { CodeEditor } from './code-editor/CodeEditor';

const App: React.FC = () => {
  return (
    <div className="App">
      <CodeEditor />
    </div>
  );
}

export default App;
