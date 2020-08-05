import React, { memo, useEffect, useState, useCallback } from 'react';
import { Utils } from 'code-easy-components';
import { useRecoilValue } from 'recoil';

import { useConfigs, useSelectItemById, useCreateOrUpdateConnection, useSizeByText } from '../../../shared/hooks';
import { TextOverLine } from './components/TextOverLine';
import { FlowItemStore } from '../../../shared/stores';
import { EFlowItemType } from '../../../shared/enums';
import { SingleLine } from './components/SingleLine';
import { Arrow } from './components/Arrow';

interface LineProps {
    /**
     * Identifier
     */
    id: string | undefined;
    /**
     * Source flow item
     */
    originId: string | undefined;
    /**
     * Target flow item
     */
    targetId: string | undefined;
    /**
     * Reference to the element used to create new connections between items
     * 
     * If this reference is not present, it represents that the line to be 
     * created is connected to another item in the flow
     */
    newConnectionBoxRef?: React.MutableRefObject<SVGRectElement | null>;
    /**
     * Used in parent component to move this element in the screen
     */
    onMouseDown?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
    /**
     * Used to start the context menu for this específic component
     */
    onContextMenu?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
}
export const Line: React.FC<LineProps> = memo(({ id, originId, targetId, newConnectionBoxRef, onContextMenu, onMouseDown }) => {
    const { disableOpacity, linesColor, lineWidth, flowItemSelectedColor, flowItemTextColor } = useConfigs();
    const createOrUpdateConnection = useCreateOrUpdateConnection();
    const selectItemById = useSelectItemById();
    const getSizeByText = useSizeByText();

    // Find the origin component
    const { connections = [], isDisabled, ...originItem } = useRecoilValue(FlowItemStore(String(originId)));
    const isComment = originItem.flowItemType === EFlowItemType.comment;
    const lineType = isComment ? 'dotted' : 'normal';
    let { width, height, top, left } = originItem;

    if (isComment) {
        const commentSizes = getSizeByText(originItem.description || '');
        width = commentSizes.width;
        height = commentSizes.height;
    }

    // Find the current connection in their item
    const connection = connections.find(connection => connection.id === id);

    // Find the target component
    const { connections: targetConnections = [], ...targetItem } = useRecoilValue(FlowItemStore(String(targetId)));
    const isCurved = targetConnections.some(connection => connection.targetId === originId);

    // Calc the correct positions of the line arrow
    top = top + ((width || 0) / 2);
    left = left + ((height || 0) / 2);
    const top2 = id !== undefined ? targetItem.top + ((targetItem.height || 0) / 2) : top + ((height || 0) / 2);
    const left2 = id !== undefined ? targetItem.left + ((targetItem.width || 0) / 2) : left + ((width || 0) / 2);

    /** Used to guide the line arrow when connected */
    let radius: number = (targetItem.width || 0) - ((targetItem.width || 0) / 4);

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
        lineDistance: Math.hypot((top2 - top), (left2 - left)),
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
            lineDistance: Math.hypot((top2 - top), (left2 - left)),
        }));
    }, [left, left2, top, top2, isCurved, radius]);

    const mouseMove = useCallback((event: MouseEvent) => {
        setBasicPosition(oldBasicPosition => ({
            ...oldBasicPosition,
            isCurved: false,
            showNewLine: true,
            top2: event.offsetY,
            left2: event.offsetX,
            isLeftToRight: (event.offsetX >= left),
            rotate: Utils.getAngle(event.offsetX, event.offsetY, left, top),
            lineDistance: Math.hypot((event.offsetY - top), (event.offsetX - left)),
        }));
    }, [left, top]);

    const onMouseUp = useCallback(async (e: any) => {
        e.stopPropagation();

        const hasChange = await createOrUpdateConnection(id, originId, e.target.id);

        window.onmouseup = null;
        window.onmousemove = null;
        document.body.style.cursor = 'unset';

        if (!hasChange || !!newConnectionBoxRef) {
            setBasicPosition({
                isCurved,
                top1: top,
                top2: top2,
                left1: left,
                left2: left2,
                showNewLine: false,
                isLeftToRight: (left2 >= left),
                rotate: Utils.getAngle(left2, top2, left, top),
                lineDistance: Math.hypot((top2 - top), (left2 - left)),
            });
        }
    }, [left, left2, top, top2, isCurved, id, originId, newConnectionBoxRef, createOrUpdateConnection]);

    const mouseDown = useCallback((e: any) => {
        e.stopPropagation();

        document.body.style.cursor = 'crosshair';
        window.onmousemove = mouseMove;
        window.onmouseup = onMouseUp;

        selectItemById(id, e.ctrlKey);
        onMouseDown && onMouseDown(e);
    }, [mouseMove, onMouseUp, onMouseDown, selectItemById, id]);

    // Used when being used to create a new line
    if (newConnectionBoxRef?.current) {
        newConnectionBoxRef.current.onmousedown = mouseDown;
    }

    const handleSelectLine = useCallback((e: React.MouseEvent<SVGPathElement | SVGTextElement, MouseEvent>) => {
        e.stopPropagation();
        selectItemById(id, e.ctrlKey);
        onMouseDown && onMouseDown(e);
    }, [onMouseDown, selectItemById, id]);

    return (
        <g role={EFlowItemType.line} style={(isDisabled ? { opacity: disableOpacity } : {})}>
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
                lineDistance={basicPosition.lineDistance - (radius + 5)}
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
                useEvents={!!!newConnectionBoxRef}
                visible={!basicPosition.showNewLine && id === undefined}
            />
            {connection?.connectionDescription && <title>{connection.connectionDescription}</title>}
        </g>
    );
});
