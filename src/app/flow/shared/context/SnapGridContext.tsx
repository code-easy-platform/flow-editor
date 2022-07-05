import React, { createContext, useContext } from "react";


const SnapGridContext = createContext(15);

export const SnapGridProvider = ({ children, value }: { value: number, children: React.ReactNode }) => {
    return (
        <SnapGridContext.Provider value={value < 1 ? 1 : value}>
            {children}
        </SnapGridContext.Provider>
    );
}

export const useSnapGridContext = () => useContext(SnapGridContext);
