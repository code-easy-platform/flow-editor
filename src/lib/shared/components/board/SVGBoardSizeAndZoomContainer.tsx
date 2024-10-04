import { useObserverValue } from 'react-observing';

import { useBoardSizes, useBoardZoomContext } from '../../context';


export const SVGBoardSizeAndZoomContainer = ({ children }: { children: React.ReactNode }) => {
  const height = useObserverValue(useBoardSizes().height);
  const width = useObserverValue(useBoardSizes().width);
  const zoom = useObserverValue(useBoardZoomContext());


  return (
    <svg style={{
      zoom,
      transition: 'all',
      minWidth: '100vw',
      minHeight: '100vh',
      position: 'absolute',
      pointerEvents: 'none',
      width: (width + 500) / zoom,
      height: (height + 500) / zoom,
    }}>
      {children}
    </svg>
  );
};
