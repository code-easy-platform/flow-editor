import React, { useCallback, useMemo } from 'react';

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
    /** Used to start the context menu for this specific component */
    onContextMenu?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
}
export const Acorn: React.FC<FlowComponentProps> = ({ item, parentRef, useEvents, onContextMenu, onMouseDown }) => {
    const { flowItemErrorColor, flowItemTextColor, flowItemWarningColor, flowItemSelectedColor, lineWidth, backgroundColor } = useConfigs();
    const selectItemById = useSelectItemById();

    const isAcceptingConnections = useObserverValue(item.isAcceptingConnections);
    const isEnabledNewConnection = useObserverValue(item.isEnabledNewConnection);
    const description = useObserverValue(item.description);
    const isDisabled = useObserverValue(item.isDisabled);
    const isSelected = useObserverValue(item.isSelected);
    const hasWarning = useObserverValue(item.hasWarning);
    const hasError = useObserverValue(item.hasError);
    const height = useObserverValue(item.height);
    const width = useObserverValue(item.width);
    const left = useObserverValue(item.left);
    const icon = useObserverValue(item.icon);
    const top = useObserverValue(item.top);
    const id = useObserverValue(item.id);

    const strokeColor: string = useMemo(() => {
        if (isSelected) return `${flowItemSelectedColor}`;
        else if (hasError) return `${flowItemErrorColor}`;
        else if (hasWarning) return `${flowItemWarningColor}`;
        else return `transparent`;
    }, [flowItemErrorColor, flowItemSelectedColor, flowItemWarningColor, hasError, hasWarning, isSelected]);

    const handleMouseDownMove = useCallback((e: React.MouseEvent<SVGGElement, MouseEvent>) => {
        if (isDisabled) return;
        e.stopPropagation();
        onMouseDown && onMouseDown(e);
    }, [isDisabled, onMouseDown]);

    const handleContextMenu = useCallback((e: React.MouseEvent<SVGGElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        onContextMenu && onContextMenu(e);
    }, [onContextMenu]);

    return (
        <g
            role={item.flowItemType.value}
            onContextMenu={handleContextMenu}
            style={{
                transform: `translate(${left}px, ${top}px)`,
                pointerEvents: (useEvents === undefined || useEvents) ? undefined : 'none',
            }}
        >
            {isEnabledNewConnection && (
                <NewConnectionBox
                    onMouseDown={e => selectItemById(id, e.ctrlKey)}
                    height={(height || 0) + 20}
                    width={(width || 0) + 20}
                    originIdStore={item.id}
                    isRounded={true}
                    left={-10}
                    top={-10}
                />
            )}
            <SelectionBox
                allowConnection={isAcceptingConnections}
                fullDraggable={!isEnabledNewConnection}
                backgroundColor={backgroundColor}
                onMouseDown={handleMouseDownMove}
                strokeColor={strokeColor}
                strokeWidth={lineWidth}
                height={height || 0}
                width={width || 0}
                id={String(id)}
            />
            <ImageView
                imageSrc={typeof icon === 'string' ? icon : String(icon?.content)}
                height={height}
                width={width}
            />
            <TextOverItem
                isEditableOnDoubleClick={item.isEditableOnDoubleClick}
                isEditing={item.isEditingTitle}
                textColor={flowItemTextColor}
                left={(width || 0) / 2}
                label={item.label}
            />
            <title>{description}</title>
        </g>
    );
};
