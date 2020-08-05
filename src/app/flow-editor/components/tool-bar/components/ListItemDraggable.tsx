import React from 'react';
import { useDrag } from 'react-dnd';

import { EFlowItemType } from '../../../shared/enums';

interface ListItemProps {
    icon?: any;
    label?: string;
    width?: number;
    itemType?: string;
    flowItemType: EFlowItemType;
}
export const ListItemDraggable: React.FC<ListItemProps> = ({ flowItemType, itemType, label, icon, width = 30 }) => {

    /** Permite que uym elemento seja arrastado e adicionado dentro do editor de fluxo. */
    const [, dragRef] = useDrag({
        item: { type: itemType || 'undefined', itemProps: { label, itemType, flowItemType, icon, width: 40, height: 40 } },
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    });

    return (
        <img
            className={"toolbar-item"}
            ref={dragRef}
            title={label}
            alt={label}
            src={icon}
            style={{
                justifyContent: "center",
                alignItems: "center",
                cursor: "move",
                fontSize: 10,
                margin: 5,
                width,
            }}
        />
    );
}
