import React, { useEffect } from 'react';
import { observe } from 'react-observing';
import { v4 as uuid } from 'uuid';

import { StyledPanel, StyledPanelWrapper, StyledSvgPanel } from './shared/styled-components';
import { DraggableContainer, Line } from './shared/components';

const blocks = [
  {
    id: observe(uuid()),
    top: observe(450),
    left: observe(450),
    width: observe(100),
    height: observe(100),
  },
  {
    id: observe(uuid()),
    top: observe(250),
    left: observe(250),
    width: observe(100),
    height: observe(100),
  },
  {
    id: observe(uuid()),
    top: observe(50),
    left: observe(50),
    width: observe(100),
    height: observe(100),
  },
];

interface IFlowEditorBoardProps {

}
export const FlowEditorBoard: React.FC<IFlowEditorBoardProps> = (props) => {

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
        {blocks.map((block, index) => {
          if (index + 1 >= blocks.length) return null;

          return (
            <Line
              key={block.id.value}
              top2Observable={block.top}
              left2Observable={block.left}
              top1Observable={blocks[index + 1].top}
              left1Observable={blocks[index + 1].left}
            />
          )
        })}
      </StyledSvgPanel>

      <StyledPanel>
        {blocks.map(block => (
          <DraggableContainer
            heightObservable={block.height}
            widthObservable={block.width}
            leftObservable={block.left}
            topObservable={block.top}
            key={block.id.value}
          />
        ))}
      </StyledPanel>

    </StyledPanelWrapper>
  );
}
