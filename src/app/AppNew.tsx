import React from 'react';

import { FlowEditor } from './flow-v2';
import './AppNew.css';

export const AppNew: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <FlowEditor />
    </div>
  );
}
