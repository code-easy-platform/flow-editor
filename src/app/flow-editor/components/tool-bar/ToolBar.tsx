import React, { memo } from 'react';

import { ListItemDraggable } from './components/ListItemDraggable';
import { IFlowItem } from '../../shared/interfaces';
import './Toolbar.css';

export const Toolbar: React.FC<{ itemsLogica: IFlowItem[], isShow: boolean }> = memo(({ itemsLogica, isShow }) => {
    return (
        isShow
            ? <div className="mini-scroll-bar toolbar">
                {itemsLogica.map((item: IFlowItem) => {
                    return <ListItemDraggable
                        flowItemType={item.flowItemType}
                        itemType={item.itemType}
                        label={item.label}
                        icon={item.icon}
                        key={item.id}
                    />;
                })}
            </div>
            : null
    );
});
