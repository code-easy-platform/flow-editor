import React, { useMemo } from 'react';
import Frame from 'react-frame-component';

import { BoardScrollProvider, BoardZoomProvider, DragLineProvider, INode, ItemsProvider, SnapGridProvider } from './shared/context';
import { DraggableContainerCss } from './shared/components/draggable-container/DraggableContainer.styles';
import { FlowEditorBoard, IDroppedData } from './FlowEditorBoard';
import { FlowEditorBoardCss } from './FlowEditorBoard.styles';
import { TId } from './shared/types';
import './index.css';


export type { INode, ILine, INodeConnection, INodeRenderProps } from './shared/context';
export type { IDroppedData } from './FlowEditorBoard';


const IFrame = Frame as any;

export interface IFlowEditorProps {
  items: INode[];

  disableDropInLines?: boolean;

  customCSS?: string;
  snapGridSize?: number;
  backgroundSize?: number;
  backgroundDotColor?: string;
  backgroundColorPaper?: string;
  backgroundColorDefault?: string;

  onRemove?: (ids: TId[]) => void;
  onDrop?: (data: IDroppedData<any>) => void;
}
export const FlowEditor: React.FC<IFlowEditorProps> = ({ snapGridSize = 15, items, customCSS = '', ...rest }) => {

  const iframeHead = useMemo(() => {
    return (
      <>
        <style>
          {[
            customCSS,
            FlowEditorBoardCss,
            DraggableContainerCss,
          ].join('\n')}
        </style>
      </>
    );
  }, [customCSS]);


  return (
    <IFrame
      tabIndex={-1}
      head={iframeHead}
      mountTarget="body"
      onContextMenu={(e: any) => e.preventDefault()}
      initialContent={`<html tabindex="0"><head></head><body style="margin:0;"></body></html>`}
      style={{ width: '100%', height: '100%', display: 'block', margin: 0, padding: 0, border: 'none' }}
    >
      <ItemsProvider items={items}>
        <SnapGridProvider value={snapGridSize}>
          <BoardZoomProvider value={1}>
            <DragLineProvider>
              <BoardScrollProvider>
                <FlowEditorBoard {...rest} />
              </BoardScrollProvider>
            </DragLineProvider>
          </BoardZoomProvider>
        </SnapGridProvider>
      </ItemsProvider>
    </IFrame>
  );
}
