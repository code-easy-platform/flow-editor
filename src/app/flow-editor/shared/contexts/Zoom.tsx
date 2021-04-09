import React, { createContext, useCallback, useState } from 'react';


export const ZoomContext = createContext<{ zoom: number, setZoom: (zoom: number) => void }>({} as { zoom: number, setZoom: (zoom: number) => void });

interface ZoomProviderProps { }
export const ZoomProvider: React.FC<ZoomProviderProps> = ({ children }) => {
  const [zoomState, setZoom] = useState(1);

  const handleSetZoom = useCallback((zoom: number) => {
    console.log(zoom)
    setZoom(zoom);
  }, [])

  return (
    <ZoomContext.Provider value={{ zoom: zoomState, setZoom: handleSetZoom }}>
      {children}
    </ZoomContext.Provider>
  );
};
