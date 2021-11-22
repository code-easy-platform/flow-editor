import { ReactNode, useCallback, useMemo } from 'react';
import { IObservable, useObserver, useObserverValue } from 'react-observing';
import styled from '@emotion/styled';

import { ICustomTheme } from './../../shared/themes/ICustomTheme';
import { gridSnap } from '../services';

export const StyledContainer = styled.div<ICustomTheme>(({ theme }) => ({
  top: 0,
  left: 0,
  cursor: 'move',
  display: 'flex',
  userSelect: 'none',
  position: 'absolute',
  flexDirection: 'column',
  padding: theme.spacing(1),
  borderRadius: theme.borderRadius.medium,
  '&:active': {
    boxShadow: '1px 1px 1px 1px black'
  }
}));


interface IDraggableContainerProps {
  render: () => ReactNode;
  topObservable: IObservable<number>;
  leftObservable: IObservable<number>;
  widthObservable: IObservable<number>;
  heightObservable: IObservable<number>;
}
export const DraggableContainer: React.FC<IDraggableContainerProps> = ({ render, leftObservable, topObservable, heightObservable, widthObservable }) => {
  const [left, setLeft] = useObserver(leftObservable);
  const [top, setTop] = useObserver(topObservable);
  const height = useObserverValue(heightObservable);
  const width = useObserverValue(widthObservable);

  const mouseDown = useCallback(() => {
    const mouseMouse = (e: MouseEvent) => {
      setLeft(old => old + (e.movementX / devicePixelRatio));
      setTop(old => old + (e.movementY / devicePixelRatio));
    }

    const mouseUp = () => {
      window.removeEventListener('mousemove', mouseMouse);
      window.removeEventListener('mouseup', mouseUp);
    }

    window.addEventListener('mousemove', mouseMouse);
    window.addEventListener('mouseup', mouseUp);
  }, [setLeft, setTop]);

  const content = useMemo(() => render(), [render]);


  return (
    <StyledContainer
      onMouseDown={mouseDown}
      style={{
        width: width,
        height: height,
        backgroundColor: "green",
        transform: `translate(${gridSnap(left)}px, ${gridSnap(top)}px)`,
      }}
    >
      {content}
    </StyledContainer>
  );
}
