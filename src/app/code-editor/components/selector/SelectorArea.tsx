import React, { useState, memo, useRef, useEffect } from 'react';

import { ICoords } from '../../shared/Interfaces';

interface SelectorAreaProps {
    isDisabled?: boolean;
    borderColor?: string;
    borderWidth?: number;
    backgroundColor?: string;
    onSelectionEnd?(e: MouseEvent): void;
    onCoordsChange?(coords: ICoords): void;
}
/** Reinderiza a área de seleção na tela, para que seja possível selecionar diversos items de uma vez. */
export const SelectorArea: React.FC<SelectorAreaProps> = memo(({ onSelectionEnd, backgroundColor = "#ffffff11", borderColor = "#999fff", borderWidth = 1, isDisabled = false, onCoordsChange }) => {

    const selectorAreaRef = useRef<any>(null);

    const [show, setShow] = useState(false);
    const [position, setPosition] = useState({
        startLeft: 0,
        startTop: 0,
        endLeft: 0,
        endTop: 0,
    });

    useEffect(() => {
        if (selectorAreaRef.current) {

            /** Pela referencia do react da selection pega a referência do componente pai e configura o mousedown */
            if (selectorAreaRef.current?.parentElement) {

                const mouseMove = (e: MouseEvent) => {
                    setShow(true);

                    setPosition({
                        ...position,
                        endLeft: e.offsetX,
                        endTop: e.offsetY,
                    });

                    onCoordsChange &&
                        onCoordsChange({
                            startY: position.startTop,
                            startX: position.startLeft,
                            endY: e.offsetY,
                            endX: e.offsetX,
                        });
                };

                const mouseUp = (e: MouseEvent) => {
                    window.onmousemove = null;
                    window.onmouseup = null;

                    setPosition({
                        startLeft: 0,
                        startTop: 0,
                        endLeft: 0,
                        endTop: 0,
                    });

                    setShow(false);
                    onSelectionEnd && onSelectionEnd(e);

                };

                const mouseDown = (e: MouseEvent | any) => {
                    if (!isDisabled) {
                        if (e.target.id === selectorAreaRef.current.parentElement.id) {
                            window.onmousemove = mouseMove;
                            window.onmouseup = mouseUp;

                            /**
                             * Em teoria isso não deveria contecer já que se trata de consts
                             * e em teoria deveria estar sendo feito essas atribuições dentro do setPosition,
                             * funcionou apenas assim.
                             */
                            position.startLeft = e.offsetX;
                            position.startTop = e.offsetY;
                            position.endLeft = e.offsetX;
                            position.endTop = e.offsetY;

                            setPosition(position);
                        }
                    }
                };

                selectorAreaRef.current.parentElement.onmousedown = mouseDown;
            }
        }
    }, [isDisabled, onSelectionEnd, onCoordsChange, position]);

    // Se não pode exibir retorna null
    if (!show && isDisabled) return null;

    return (
        <rect
            stroke={borderColor}
            ref={selectorAreaRef}
            fill={backgroundColor}
            strokeWidth={borderWidth}
            y={((position.endTop - position.startTop) > 0) ? position.startTop : position.endTop}
            x={((position.endLeft - position.startLeft) > 0) ? position.startLeft : position.endLeft}
            height={((position.endTop - position.startTop) > 0) ? (position.endTop - position.startTop) : (position.startTop - position.endTop)}
            width={((position.endLeft - position.startLeft) > 0) ? (position.endLeft - position.startLeft) : (position.startLeft - position.endLeft)}
        />
    );

})
