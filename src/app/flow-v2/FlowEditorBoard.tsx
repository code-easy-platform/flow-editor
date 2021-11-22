import React, { useEffect } from 'react';
import { useObserverValue } from 'react-observing';

import { StyledPanel, StyledPanelWrapper, StyledSvgPanel } from './shared/styled-components';
import { DraggableContainer, Line } from './shared/components';
import { FlowStore, LinesSelector } from './shared/stores';

interface IFlowEditorBoardProps {

}
export const FlowEditorBoard: React.FC<IFlowEditorBoardProps> = () => {
  const lines = useObserverValue(LinesSelector);
  const flow = useObserverValue(FlowStore);

  useEffect(() => {
    const handleMouseWheel = (e: WheelEvent) => {
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault();
    }

    document.addEventListener('wheel', handleMouseWheel, { passive: false });
    return () => document.removeEventListener('wheel', handleMouseWheel);
  }, []);


  return (
    <StyledPanelWrapper isDotted={true}>

      <StyledSvgPanel>
        {lines.map((line, index) => {
          if (index + 1 >= lines.length) return null;

          return (
            <Line
              key={line.id.value}
              top2Observable={line.top}
              left2Observable={line.left}
              top1Observable={lines[index + 1].top}
              left1Observable={lines[index + 1].left}
            />
          )
        })}
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
