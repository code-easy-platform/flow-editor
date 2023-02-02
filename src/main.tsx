import React from 'react';
import ReactDOM from 'react-dom/client';
import { DragAndDropProvider } from 'react-use-drag-and-drop';

import { App } from './app/App';


ReactDOM
  .createRoot(document.getElementById('root')!)
  .render(
    <React.StrictMode>
      <DragAndDropProvider>
        <App />
      </DragAndDropProvider>
    </React.StrictMode>
  );
