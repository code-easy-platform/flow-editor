import React from 'react';

import { FlowEditorBoard } from './FlowEditorBoard';


export interface IFlowEditorProps {

}
export const FlowEditor: React.FC<IFlowEditorProps> = ({ ...rest }) => {
  return (
    <FlowEditorBoard {...rest} />
  );
}
