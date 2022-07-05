import React from 'react';

import { BoardZoomProvider, INode, ItemsProvider, SnapGridProvider } from './shared/context';
import { FlowEditorBoard } from './FlowEditorBoard';


export interface IFlowEditorProps {
  items: INode[];
  snapGridSize?: number;
  backgroundSize?: number;
  backgroundColorPaper?: string;
  backgroundColorDefault?: string;
}
export const FlowEditor: React.FC<IFlowEditorProps> = ({ snapGridSize = 15, items, ...rest }) => {
  return (
    <ItemsProvider items={items}>
      <SnapGridProvider value={snapGridSize}>
        <BoardZoomProvider value={1}>
          <FlowEditorBoard {...rest} />
        </BoardZoomProvider>
      </SnapGridProvider>
    </ItemsProvider>
  );
}
