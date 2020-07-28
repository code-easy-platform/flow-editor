import React, { memo, useCallback, useRef } from 'react';

import { EFlowItemType, IFlowItem } from '../../shared/interfaces/FlowItemInterfaces';
import { useFlowItems } from '../../contexts/FlowItemsContext';
import { Comment } from './Comment';
import { Acorn } from './Acorn';

interface FlowProps {
    item?: IFlowItem;
    flowItemType: EFlowItemType;
    onContextMenu?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
}
export const FlowItem: React.FC<FlowProps> = memo(({ onContextMenu, flowItemType, item }) => {
    const { changePosition } = useFlowItems();

    /**
     * Ajuda a evitar que bugs aconteçam por estar uma fun declarada
     * na ref do svg que está no container de fora.
     *
     * Também serve para fechar o menu de contexto.
     */
    const mouseUp = useCallback((e: MouseEvent) => {
        e.stopPropagation();
        window.onmousemove = null;
        window.onmouseup = null;
    }, []);

    /** Stores the position where the flow item item was clicked. */
    let cliquedLocationFlowItem = useRef({ top: 0, left: 0 });

    /** When an item is selected and dragged on the tale this fun will make it happen. */
    const mouseMove = useCallback((e: MouseEvent) => {
        e.stopPropagation();

        const top = e.offsetY - cliquedLocationFlowItem.current.top;
        const left = e.offsetX - cliquedLocationFlowItem.current.left;

        changePosition(item?.id, top, left);

    }, [item, changePosition]);

    /** Declara a fun no ref da svg para que o item atual possa ser arrastado na tela. */
    const mouseDown = useCallback((e: React.MouseEvent<SVGGElement, MouseEvent>) => {
        e.stopPropagation();

        cliquedLocationFlowItem.current = {
            top: e.nativeEvent.offsetY - (item?.top || 0),
            left: e.nativeEvent.offsetX - (item?.left || 0),
        };

        window.onmousemove = mouseMove;
        window.onmouseup = mouseUp;
    }, [item, mouseMove, mouseUp]);

    switch (flowItemType) {
        case EFlowItemType.acorn:
            if (!item) return null;
            return (
                <Acorn
                    item={item}
                    onMouseDown={mouseDown}
                    onContextMenu={onContextMenu}
                />
            );
        case EFlowItemType.comment:
            if (!item) return null;
            return (
                <Comment
                    item={item}
                    onMouseDown={mouseDown}
                    onContextMenu={onContextMenu}
                />
            );
        default:
            return null;
    }
});
