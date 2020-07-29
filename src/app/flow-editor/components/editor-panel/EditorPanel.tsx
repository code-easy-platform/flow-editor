import React, { memo, useRef } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';

type EditorPanelProps = Omit<{
    dottedSize?: number;
    allowedsInDrop?: string[];
    onChangeZoom?(zoom: number): void;
    backgroundType?: 'dotted' | 'checkered' | 'custom';
    onDropItem?(item: any, monitor: DropTargetMonitor): void;
    onAnyKeyDown?(event: React.KeyboardEvent<SVGSVGElement>): void;
    onKeyDownCtrlC?(event: React.KeyboardEvent<SVGSVGElement>): void;
    onKeyDownCtrlD?(event: React.KeyboardEvent<SVGSVGElement>): void;
    onKeyDownCtrlV?(event: React.KeyboardEvent<SVGSVGElement>): void;
    onKeyDownDelete?(event: React.KeyboardEvent<SVGSVGElement>): void;
    onKeyDownCtrlA?(event: React.KeyboardEvent<SVGSVGElement>): void;
    onArrowKeyDown?(direction: 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight', event: React.KeyboardEvent<SVGSVGElement>): void;
}, keyof React.SVGProps<SVGSVGElement>> & React.SVGProps<SVGSVGElement>;

/**
 * Base para os items de fluxo.
 * È composto de um svg normal com o hook de drop do dnd.
 *
 * @param allowedsInDrop - **string[]** - Usado para adicionar mais items suportados no drop
 * @param onDropItem - **Function** - Função executada quando um elemento for dropado no painel
 * @param backgroundType - **'dotted'** | **'checkered'** | **'custom'** - Parâmetro que controla o estilo do background do painel
 */
export const EditorPanel = memo(React.forwardRef(({ allowedsInDrop, onDropItem, onChangeZoom, dottedSize = 15, backgroundType = 'dotted', onArrowKeyDown, onKeyDownCtrlC, onKeyDownCtrlD, onKeyDownCtrlV, onKeyDownCtrlA, onKeyDownDelete, onAnyKeyDown, ...props }: EditorPanelProps, ref: any) => {

    const [zoom, setZoom] = React.useState(1);
    const wheel = (e: React.WheelEvent<SVGSVGElement>) => {
        if (e.altKey) {
            if (e.deltaY > 0) {
                setZoom(zoom - 0.1);
            } else {
                setZoom(zoom + 0.1);
            }
            onChangeZoom && onChangeZoom(zoom);
        }
    }

    if (!ref.current) ref = useRef(null);

    if (ref?.current) {

        /** Identifica teclas que foram acionadas enquando o editor está focado. */
        ref.current.onkeydown = (event: React.KeyboardEvent<SVGSVGElement>) => {

            /** Delete   */ if (event.key === 'Delete') onKeyDownDelete && onKeyDownDelete(event);
            /** Ctrl + a */ if (event.ctrlKey && (event.key === 'a')) onKeyDownCtrlA && onKeyDownCtrlA(event);
            /** Ctrl + c */ if (event.ctrlKey && (event.key === 'c')) onKeyDownCtrlC && onKeyDownCtrlC(event);
            /** Ctrl + v */ if (event.ctrlKey && (event.key === 'v')) onKeyDownCtrlV && onKeyDownCtrlV(event);
            /** Ctrl + d */ if (event.ctrlKey && (event.key === 'd')) onKeyDownCtrlD && onKeyDownCtrlD(event);

            if (event.key === 'ArrowUp') { onArrowKeyDown && onArrowKeyDown("ArrowUp", event); event.preventDefault(); };
            if (event.key === 'ArrowDown') { onArrowKeyDown && onArrowKeyDown("ArrowDown", event); event.preventDefault(); };
            if (event.key === 'ArrowLeft') { onArrowKeyDown && onArrowKeyDown("ArrowLeft", event); event.preventDefault(); };
            if (event.key === 'ArrowRight') { onArrowKeyDown && onArrowKeyDown("ArrowRight", event); event.preventDefault(); };

            onAnyKeyDown && onAnyKeyDown(event);
        }
    }

    // Este bloco serve para configurar o estilo do background do painel
    let background;
    if (backgroundType === 'dotted') {
        background = 'radial-gradient(var(--main-background-highlighted) 5%, var(--color-transparent) 5%)';
    } else if (backgroundType === 'checkered') {
        background = 'linear-gradient(0deg, var(--main-background-highlighted) 1px, transparent 0px), linear-gradient(90deg, var(--main-background-highlighted) 1px, transparent 0px)'
    } else {
        background = props.style?.backgroundImage;
    }

    /** Usado para que seja possível o drop de items no editor. */
    const [, dropRef] = useDrop({
        accept: [...allowedsInDrop || []], // Especifica quem pode ser dropado na editor
        drop: onDropItem,
    });

    /** Agrupa as referências do drop com as da ref. */
    dropRef(ref);

    return (
        <svg
            {...props}
            ref={ref}
            tabIndex={0}
            onWheel={wheel}
            preserveAspectRatio="none"
            style={{
                outline: 'none',
                minWidth: '100%',
                minHeight: '100%',
                backgroundImage: background,
                backgroundSize: `${dottedSize}px ${dottedSize}px`,
            }}
        />
    );

}));
