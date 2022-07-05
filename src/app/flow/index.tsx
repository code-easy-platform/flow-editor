import React from 'react';

import { FlowEditorBoard } from './FlowEditorBoard';
import { SnapGridProvider } from './shared/context';


export interface IFlowEditorProps {
  snapGridSize?: number;
  backgroundSize?: number;
  backgroundColorPaper?: string;
  backgroundColorDefault?: string;
}
export const FlowEditor: React.FC<IFlowEditorProps> = ({ snapGridSize = 15, ...rest }) => {
  return (
    <SnapGridProvider value={snapGridSize}>
      <FlowEditorBoard {...rest} />
    </SnapGridProvider>
  );
}
