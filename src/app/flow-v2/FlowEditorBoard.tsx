import React, { useEffect } from 'react';
import { useObserverValue, useObserver } from 'react-observing';

import { StyledPanel, StyledPanelWrapper, StyledSvgPanel } from './shared/components';
import { BoardZoomStore, FlowStore, LinesSelector } from './shared/stores';
import { DraggableContainer, Line } from './shared/components';

interface IFlowEditorBoardProps { }
export const FlowEditorBoard: React.FC<IFlowEditorBoardProps> = () => {
  const [zoom, setZoom] = useObserver(BoardZoomStore);
  const lines = useObserverValue(LinesSelector);
  const flow = useObserverValue(FlowStore);

  useEffect(() => {
    const handleMouseWheel = (e: WheelEvent) => {
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault();

      if (e.ctrlKey) {
        if (e.deltaY < 0) {
          setZoom(oldZoom => oldZoom >= 2 ? oldZoom : oldZoom + 0.1);
        } else {
          setZoom(oldZoom => oldZoom <= 0.2 ? oldZoom : oldZoom - 0.1);
        }
      }
    }

    document.addEventListener('wheel', handleMouseWheel, { passive: false });
    return () => document.removeEventListener('wheel', handleMouseWheel);
  }, [setZoom]);


  return (
    <StyledPanelWrapper style={{ zoom, backgroundSize: `${(15 / zoom) / devicePixelRatio}px ${(15 / zoom) / devicePixelRatio}px` }}>

      <StyledSvgPanel>
        {lines.map(line => (
          <Line
            key={line.id}
            top1Observable={line.top1}
            top2Observable={line.top2}
            left1Observable={line.left1}
            left2Observable={line.left2}
          />
        ))}
      </StyledSvgPanel>

      <StyledPanel>
        {flow.map(block => (
          <DraggableContainer
            heightObservable={block.height}
            widthObservable={block.width}
            leftObservable={block.left}
            topObservable={block.top}
            render={block.render}
            key={block.id.value}
          />
        ))}
      </StyledPanel>

    </StyledPanelWrapper>
  );
}
