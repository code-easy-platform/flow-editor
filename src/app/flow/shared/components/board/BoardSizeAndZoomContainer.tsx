import { useEffect, useState } from 'react';
import { useBoardSizes, useBoardZoomContext } from '../../context';



export const BoardSizeAndZoomContainer = ({ children }: { children: React.ReactNode }) => {
  const { height: heightObservable, width: widthObservable } = useBoardSizes();
  const zoomObservable = useBoardZoomContext();


  const [height, setHeight] = useState(heightObservable.value);
  const [width, setWidth] = useState(widthObservable.value);
  const [zoom, setZoom] = useState(zoomObservable.value);


  useEffect(() => {
    const subscriptionHeight = heightObservable.subscribe(newValue => setHeight(old => old !== newValue ? newValue : old));
    const subscriptionWidth = widthObservable.subscribe(newValue => setWidth(old => old !== newValue ? newValue : old));
    const subscriptionZoom = zoomObservable.subscribe(newValue => setZoom(old => old !== newValue ? newValue : old));

    return () => {
      subscriptionHeight.unsubscribe();
      subscriptionWidth.unsubscribe();
      subscriptionZoom.unsubscribe();
    }
  }, [heightObservable, widthObservable, zoomObservable]);


  return (
    <div style={{ zoom, height: height + 500, width: width + 500, pointerEvents: 'none' }}>
      {children}
    </div>
  );
};
