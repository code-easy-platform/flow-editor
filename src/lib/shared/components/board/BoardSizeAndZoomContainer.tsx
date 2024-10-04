import { useObserverValue } from 'react-observing';

import { useBoardSizes, useBoardZoomContext } from '../../context';


export const BoardSizeAndZoomContainer = ({ children }: { children: React.ReactNode }) => {
  const height = useObserverValue(useBoardSizes().height);
  const width = useObserverValue(useBoardSizes().width);
  const zoom = useObserverValue(useBoardZoomContext());


  return (
    <div style={{
      zoom,
      pointerEvents: 'none',
      width: (width + 500) / zoom,
      height: (height + 500) / zoom,
    }}>
      {children}
    </div>
  );
};
