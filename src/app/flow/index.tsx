import React from 'react';

import { FlowEditorBoard } from './FlowEditorBoard';


export interface IFlowEditorProps {
  backgroundSize?: number;
  backgroundColorPaper?: string;
  backgroundColorDefault?: string;
}
export const FlowEditor: React.FC<IFlowEditorProps> = ({ ...rest }) => {
  return (
    <FlowEditorBoard {...rest} />
  );
}
