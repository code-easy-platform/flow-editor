import React from 'react';

export const EmptyFeedback: React.FC<{ show: boolean }> = ({ show, children }) => {
    if (!show) return null;
    return (
        <foreignObject width={"100%"} height={"100%"}>
            <div className="full-height full-width flex-items-center flex-content-center opacity-5">
                {children}
            </div>
        </foreignObject>
    );
}
