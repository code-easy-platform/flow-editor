import React, { useEffect, useState } from 'react';
import { useObserverValue, useObserver } from 'react-observing';
import { useFrame } from 'react-frame-component';

import { useBoardZoomContext, useItemsContext } from './shared/context';
import { DraggableContainer, Line } from './shared/components';


interface IFlowEditorBoardProps {
  backgroundSize?: number;
  backgroundColorPaper?: string;
  backgroundColorDefault?: string;
}
export const FlowEditorBoard: React.FC<IFlowEditorBoardProps> = ({ backgroundColorDefault = '#1e1e1e', backgroundColorPaper = '#484848', backgroundSize = 30 }) => {
  const { document } = useFrame();

  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const [zoom, setZoom] = useObserver(useBoardZoomContext());

  const { flowStore, linesStore } = useItemsContext();
  const lines = useObserverValue(linesStore);
  const flow = useObserverValue(flowStore);


  useEffect(() => {
    if (!document) return;

    const handleMouseWheel = (e: WheelEvent) => {

      if (e.ctrlKey) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();

        if (e.deltaY < 0) {
          setZoom(oldZoom => oldZoom >= 2 ? oldZoom : oldZoom + 0.1);
        } else {
          setZoom(oldZoom => oldZoom <= 0.2 ? oldZoom : oldZoom - 0.1);
        }
      }
    }

    document.addEventListener('wheel', handleMouseWheel, { passive: false });
    return () => document.removeEventListener('wheel', handleMouseWheel);
  }, [setZoom, document]);


  return (
    <div
      className={'panel-wrapper'}
      style={{
        backgroundSize: `${backgroundSize / devicePixelRatio}px ${backgroundSize / devicePixelRatio}px`,
        ...({
          '--color-panel-paper': backgroundColorPaper,
          '--color-panel-default': backgroundColorDefault,
        }) as any,
      }}
    >
      <svg className={'svg-panel'} style={{ zoom }}>
        <g style={{ transform: `translate(${scrollX}px, ${scrollY}px)` }}>
          {lines.map(line => (
            <Line
              key={line.id}

              top1Observable={line.top1}
              top2Observable={line.top2}
              left1Observable={line.left1}
              left2Observable={line.left2}

              width1Observable={line.width1}
              width2Observable={line.width2}
              height1Observable={line.height1}
              height2Observable={line.height2}

              inputSlotObservable={line.inputSlot}
              outputSlotObservable={line.outputSlot}
            />
          ))}
        </g>
      </svg>

      <div style={{ zoom }} className={'panel'} onScroll={e => { setScrollY(-e.currentTarget.scrollTop); setScrollX(-e.currentTarget.scrollLeft) }}>
        {flow.map((block, _, allBlocks) => {
          const relatedBlocks = allBlocks
            .filter(relatedBlock => relatedBlock.id.value !== block.id.value)
            .filter(relatedBlock => relatedBlock.connections.value.some(connection => connection.relatedId.value === block.id.value))

          return (
            <DraggableContainer
              numberOfOutputSlots={block.connections.value.length}
              numberOfInputSlots={relatedBlocks.length}
              heightObservable={block.height}
              widthObservable={block.width}
              leftObservable={block.left}
              topObservable={block.top}
              render={block.render}
              key={block.id.value}
            />
          );
        })}
      </div>

    </div>
  );
}
