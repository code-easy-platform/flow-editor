import React from 'react';

import { BreadCampButton } from '../../shared/Interfaces/CodeEditorInterfaces';
import './BreandCamps.css';

interface BreandCampsProps {
    breadcrumbs?: BreadCampButton[];
}
export const BreandCamps: React.FC<BreandCampsProps> = ({ breadcrumbs = [] }) => {
    const display = breadcrumbs.length !== 0;

    return (
        display
            ? <>
                <div className="background-panels breadcrump-base absolute padding-xs padding-right-m" >
                    {breadcrumbs.map(({ label, onClick, disabled }, index) => {
                        return <>
                            <button key={index} disabled={disabled} className="breadcrump-button" onClick={!disabled ? onClick : undefined} children={label} />
                            {((index + 1) !== breadcrumbs.length ? '/' : '')}
                        </>;
                    })}
                </div>
            </>
            : <></>
    );
}
