import React, { memo, useCallback, useRef } from 'react';
import { useConfigs } from '../../contexts/Configurations';
import { Acorn } from './Acorn';
import { EFlowItemType, IFlowItem } from '../../shared/interfaces/FlowItemInterfaces';
import { useFlowItems } from '../../contexts/FlowItemsContext';

export const FlowItem: React.FC<IFlowItem> = memo(({ onContextMenu, onMouseDown, onMouseUp, ...rest }) => {
    const { flowItemTextColor = 'white' } = useConfigs();
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

    /** Armazena a posição onde o iten item do fluxo foi clicado. */
    let cliquedLocationFlowItem = useRef({ top: 0, left: 0 });

    /** Quando um item estiver selecionado e for arrastado na tale esta fun vai fazer isso acontecer. */
    const mouseMove = useCallback((e: MouseEvent) => {
        e.stopPropagation();

        const top = e.offsetY - cliquedLocationFlowItem.current.top;
        const left = e.offsetX - cliquedLocationFlowItem.current.left;

        changePosition(rest.id, top, left);

    }, [rest.id, changePosition]);

    /** Declara a fun no ref da svg para que o item atual possa ser arrastado na tela. */
    const mouseDown = useCallback((e: React.MouseEvent<SVGGElement, MouseEvent>) => {
        e.stopPropagation();

        cliquedLocationFlowItem.current = {
            top: e.nativeEvent.offsetY - rest.top,
            left: e.nativeEvent.offsetX - rest.left,
        };

        window.onmousemove = mouseMove;
        window.onmouseup = mouseUp;
    }, [rest.left, rest.top, mouseMove, mouseUp]);



    switch (rest.flowItemType) {
        case EFlowItemType.line:
            return (<></>);
        case EFlowItemType.acorn:
            return (
                <Acorn
                    item={rest}
                    onMouseUp={onMouseUp}
                    onMouseDown={mouseDown}
                    textColor={flowItemTextColor}
                    onContextMenu={onContextMenu}
                />
            );
        case EFlowItemType.comment:
            return (<></>);
    }
});
