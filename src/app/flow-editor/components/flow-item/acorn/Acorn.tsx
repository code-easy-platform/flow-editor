import React, { useCallback } from 'react';

import { IFlowItem } from '../../../shared/interfaces/FlowItemInterfaces';
import { useConfigs, useSelectItemById } from '../../../shared/hooks';
import { SelectionBox, TextOverItem, ImageView } from './components';
import NewConnectionBox from '../line/NewConnectionBox';
import { useObserverValue } from 'react-observing';

interface FlowComponentProps {
    item: IFlowItem;

    useEvents?: boolean;
    parentRef: React.RefObject<SVGSVGElement>;

    /** Used in parent component to move this element in the screen */
    onMouseDown?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
    /** Used to start the context menu for this específic component */
    onContextMenu?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
}
export const Acorn: React.FC<FlowComponentProps> = ({ item, parentRef, useEvents, onContextMenu, onMouseDown }) => {
    const { flowItemErrorColor, flowItemTextColor, flowItemWarningColor, flowItemSelectedColor, lineWidth, backgroundColor } = useConfigs();
    const selectItemById = useSelectItemById();

    const isEnabledNewConnetion = useObserverValue(item.isEnabledNewConnetion);
    const description = useObserverValue(item.description);
    const isDisabled = useObserverValue(item.isDisabled);
    const isSelected = useObserverValue(item.isSelected);
    const hasWarning = useObserverValue(item.hasWarning);
    const hasError = useObserverValue(item.hasError);
    const height = useObserverValue(item.height);
    const width = useObserverValue(item.width);
    const label = useObserverValue(item.label);
    const left = useObserverValue(item.left);
    const icon = useObserverValue(item.icon);
    const top = useObserverValue(item.top);


    const strokeColor: string = isSelected
        ? `${flowItemSelectedColor}`
        : hasError
            ? `${flowItemErrorColor}`
            : hasWarning
                ? `${flowItemWarningColor}`
                : "transparent";

    const mouseDownMove = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
        if (isDisabled) return;
        e.stopPropagation();
        onMouseDown && onMouseDown(e);
    }

    const contextMenu = useCallback((e: React.MouseEvent<SVGGElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        onContextMenu && onContextMenu(e);
    }, [onContextMenu]);

    return (
        <g
            onContextMenu={contextMenu}
            role={item.flowItemType.value}
            style={{ pointerEvents: (useEvents === undefined || useEvents) ? undefined : 'none' }}
        >
            {isEnabledNewConnetion && <NewConnectionBox
                onMouseDown={e => selectItemById(item.id.value, e.ctrlKey)}
                originId={String(item.id.value)}
                height={(height || 0) + 20}
                width={(width || 0) + 20}
                parentRef={parentRef}
                left={left - 10}
                isRounded={true}
                top={top - 10}
            />}
            <TextOverItem
                left={left + ((width || 0) / 2)}
                textColor={flowItemTextColor}
                label={label}
                top={top}
            />
            <SelectionBox
                fullDraggable={!isEnabledNewConnetion}
                backgroundColor={backgroundColor}
                onMouseDown={mouseDownMove}
                id={String(item.id.value)}
                strokeColor={strokeColor}
                strokeWidth={lineWidth}
                height={height || 0}
                width={width || 0}
                left={left}
                top={top}
            />
            <ImageView
                imageSrc={icon}
                height={height}
                width={width}
                left={left}
                top={top}
            />
            <title>{description}</title>
        </g>
    );
};
