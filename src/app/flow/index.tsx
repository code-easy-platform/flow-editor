import React, { useMemo } from 'react';
import Frame from 'react-frame-component';

import { BoardZoomProvider, INode, ItemsProvider, SnapGridProvider } from './shared/context';
import { DraggableContainerCss } from './shared/components/DraggableContainer.styles';
import { FlowEditorBoardCss } from './FlowEditorBoard.styles';
import { FlowEditorBoard } from './FlowEditorBoard';

const IFrame = Frame as any;

export interface IFlowEditorProps {
  items: INode[];
  snapGridSize?: number;
  backgroundSize?: number;
  backgroundColorPaper?: string;
  backgroundColorDefault?: string;
}
export const FlowEditor: React.FC<IFlowEditorProps> = ({ snapGridSize = 15, items, ...rest }) => {

  const iframeHead = useMemo(() => {
    return (
      <>
        <style>
          {[FlowEditorBoardCss, DraggableContainerCss].join('\n')}
        </style>
      </>
    );
  }, []);


  return (
    <IFrame
      tabIndex={-1}
      head={iframeHead}
      mountTarget="body"
      onContextMenu={(e: any) => e.preventDefault()}
      // className="w-full h-full bg-background border-none outline-none"
      initialContent={`<html tabindex="0"><head></head><body style="margin:0;"></body></html>`}
      style={{ width: '100%', height: '100%', display: 'block', margin: 0, padding: 0, border: 'none' }}
    >
      <ItemsProvider items={items}>
        <SnapGridProvider value={snapGridSize}>
          <BoardZoomProvider value={1}>
            <FlowEditorBoard {...rest} />
          </BoardZoomProvider>
        </SnapGridProvider>
      </ItemsProvider>
    </IFrame>
  );
}
