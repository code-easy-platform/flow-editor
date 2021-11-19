import React from 'react';

import { StyledPanel, StyledPanelWrapper, StyledSvgPanel } from './shared/styled-components';
import { DraggableContainer, Line } from './shared/components';
import { observe } from 'react-observing';

const blocks = [
  {
    top: observe(50),
    left: observe(50),
    width: observe(100),
    height: observe(100),
  },
  {
    top: observe(250),
    left: observe(250),
    width: observe(100),
    height: observe(100),
  },
];

interface IFlowEditorBoardProps {

}
export const FlowEditorBoard: React.FC<IFlowEditorBoardProps> = (props) => {
  return (
    <StyledPanelWrapper isDotted={true}>

      <StyledPanel>
        {blocks.map(block => (
          <DraggableContainer
            heightObservable={block.height}
            widthObservable={block.width}
            leftObservable={block.left}
            topObservable={block.top}
          />
        ))}
      </StyledPanel>

      <StyledSvgPanel>
        {blocks.map((block, index) => {
          if (index + 1 >= blocks.length) return null;

          return (
            <Line
              left2Observable={block.left}
              top2Observable={block.top}
              left1Observable={blocks[index + 1].left}
              top1Observable={blocks[index + 1].top}
            />
          )
        })}
      </StyledSvgPanel>

    </StyledPanelWrapper>
  );
}
