import React, { memo, useEffect, useState, useCallback } from 'react';
import { Utils } from 'code-easy-components';
import { useRecoilValue } from 'recoil';

import { useConfigs, useSelectItemById, useCreateOrUpdateConnection } from '../../../shared/hooks';
import { NewConnectionBox } from './components/NewConnectionBox';
import { TextOverLine } from './components/TextOverLine';
import { FlowItemStore } from '../../../shared/stores';
import { EFlowItemType } from '../../../shared/enums';
import { SingleLine } from './components/SingleLine';
import { Arrow } from './components/Arrow';

interface LineProps {
    /**
     * 
     */
    id: string | undefined;
    /**
     * 
     */
    originId: string | undefined;
    /**
     * 
     */
    targetId: string | undefined;
    /**
     * Used in parent component to move this element in the screen
     */
    onMouseDown?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
    /**
     * Used to start the context menu for this específic component
     */
    onContextMenu?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
}
export const Line: React.FC<LineProps> = memo(({ id, originId, targetId, onContextMenu, onMouseDown }) => {
    const { disableOpacity, linesColor, lineWidth, flowItemSelectedColor, flowItemTextColor } = useConfigs();
    const createOrUpdateConnection = useCreateOrUpdateConnection();
    const selectItemById = useSelectItemById();

    // Find the origin component
    const { left: _left, top: _top, connections = [], isDisabled, ...originItem } = useRecoilValue(FlowItemStore(String(originId)));
    const lineType = originItem.flowItemType === EFlowItemType.comment ? 'dotted' : 'normal';
    const radius: number = (originItem.width || 0) - ((originItem.width || 0) / 4);

    // Find the current connection in their item
    const connection = connections.find(connection => connection.id === id);

    // Find the target component
    const { connections: targetConnections = [], ...targetItem } = useRecoilValue(FlowItemStore(String(targetId)));
    const isCurved = targetConnections.some(connection => connection.targetId === originId);

    // Calc the correct positions of the line arrow
    const top = _top + ((originItem.width || 0) / 2);
    const left = _left + ((originItem.height || 0) / 2);
    const top2 = id !== undefined ? targetItem.top + ((targetItem.height || 0) / 2) : _top + ((originItem.height || 0) / 2);
    const left2 = id !== undefined ? targetItem.left + ((targetItem.width || 0) / 2) : _left + ((originItem.width || 0) / 2);

    // Sets the color of the line when selected
    const strokeColor: string = connection?.isSelected ? `${flowItemSelectedColor}` : `${linesColor}`;

    const [basicPosition, setBasicPosition] = useState({
        isCurved,
        top1: top,
        top2: top2,
        left1: left,
        left2: left2,
        showNewLine: false,
        isLeftToRight: (left2 >= left),
        rotate: Utils.getAngle(left2, top2, left, top),
        lineDistance: Math.hypot((top2 - top), (left2 - left)) - (radius + 5),
    });
    useEffect(() => {
        setBasicPosition(oldState => ({
            ...oldState,
            isCurved,
            top1: top,
            top2: top2,
            left1: left,
            left2: left2,
            isLeftToRight: (left2 >= left),
            rotate: Utils.getAngle(left2, top2, left, top),
            lineDistance: Math.hypot((top2 - top), (left2 - left)) - (radius + 5),
        }));
    }, [left, left2, top, top2, radius, isCurved]);

    const mouseMove = useCallback((event: MouseEvent) => {
        setBasicPosition(oldBasicPosition => ({
            ...oldBasicPosition,
            isCurved: false,
            showNewLine: true,
            top2: event.offsetY,
            left2: event.offsetX,
            isLeftToRight: (event.offsetX >= left),
            rotate: Utils.getAngle(event.offsetX, event.offsetY, left, top),
            lineDistance: (Math.hypot((event.offsetY - top), (event.offsetX - left)) - 40),
        }));
    }, [left, top]);

    const onMouseUp = useCallback(async (e: any) => {
        e.stopPropagation();

        const hasChange = await createOrUpdateConnection(id, originId, e.target.id);

        window.onmouseup = null;
        window.onmousemove = null;
        document.body.style.cursor = 'unset';

        if (!hasChange) {
            setBasicPosition({
                isCurved,
                top1: top,
                top2: top2,
                left1: left,
                left2: left2,
                showNewLine: false,
                isLeftToRight: (left2 >= left),
                rotate: Utils.getAngle(left2, top2, left, top),
                lineDistance: (Math.hypot((top2 - top), (left2 - left)) - 40),
            });
        }
    }, [left, left2, top, top2, isCurved, id, originId, createOrUpdateConnection]);

    const mouseDown = useCallback((e: any) => {
        e.stopPropagation();

        document.body.style.cursor = 'crosshair';
        window.onmousemove = mouseMove;
        window.onmouseup = onMouseUp;

        selectItemById(id, e.ctrlKey);
        onMouseDown && onMouseDown(e);
    }, [mouseMove, onMouseUp, onMouseDown, selectItemById, id]);

    const handleSelectLine = useCallback((e: any) => {
        e.stopPropagation();
        selectItemById(id, e.ctrlKey);
        onMouseDown && onMouseDown(e);
    }, [onMouseDown, selectItemById, id]);

    return (
        <g style={{ opacity: isDisabled ? disableOpacity : 1 }}>
            <TextOverLine
                top={basicPosition.top1}
                left={basicPosition.left1}
                onContextMenu={onContextMenu}
                textColor={flowItemTextColor}
                rotate={basicPosition.rotate}
                onMouseDown={handleSelectLine}
                isCurved={basicPosition.isCurved}
                text={connection?.connectionLabel}
                lineDistance={basicPosition.lineDistance}
                isLeftToRight={basicPosition.isLeftToRight}
            />
            <SingleLine
                id={String(id)}
                lineType={lineType}
                top1={basicPosition.top1}
                strokeColor={strokeColor}
                left1={basicPosition.left1}
                onContextMenu={onContextMenu}
                rotate={basicPosition.rotate}
                onMouseDown={handleSelectLine}
                isCurved={basicPosition.isCurved}
                lineDistance={basicPosition.lineDistance}
                visible={!basicPosition.showNewLine && id === undefined}
            />
            <Arrow
                id={String(id)}
                radius={radius}
                cursor={"crosshair"}
                lineWidth={lineWidth}
                onMouseDown={mouseDown}
                top={basicPosition.top2}
                strokeColor={strokeColor}
                left={basicPosition.left2}
                rotate={basicPosition.rotate}
                onContextMenu={onContextMenu}
                visible={!basicPosition.showNewLine && id === undefined}
            />
            {id === undefined && <NewConnectionBox
                id={String(id)}
                radius={radius}
                cursor={"crosshair"}
                lineWidth={lineWidth}
                onMouseDown={mouseDown}
                top={basicPosition.top2}
                left={basicPosition.left2}
                onContextMenu={onContextMenu}
            />}
            {connection?.connectionDescription && <title>{connection.connectionDescription}</title>}
        </g>
    );
});
