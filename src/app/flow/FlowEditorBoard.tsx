import React, { useCallback, useEffect, useRef } from 'react';
import { useObserverValue, useSetObserver } from 'react-observing';
import { useFrame } from 'react-frame-component';

import { BoardSizeAndZoomContainer, SVGBoardSizeAndZoomContainer, DraggableContainer, Line, SelectorArea, ICoords } from './shared/components';
import { INode, useBoardScrollContext, useBoardZoomContext, useItemsContext, useToggleSelectedItem } from './shared/context';
import { getCtrlKeyBySystem } from './shared/services';


interface IFlowEditorBoardProps {
  backgroundSize?: number;
  backgroundColorPaper?: string;
  backgroundColorDefault?: string;
}
export const FlowEditorBoard: React.FC<IFlowEditorBoardProps> = ({ backgroundColorDefault = '#1e1e1e', backgroundColorPaper = '#484848', backgroundSize = 30 }) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const { document } = useFrame();

  const scrollObject = useBoardScrollContext();
  const setZoom = useSetObserver(useBoardZoomContext());
  const setScrollX = useSetObserver(scrollObject.left);
  const setScrollY = useSetObserver(scrollObject.top);


  const { flowStore, linesStore } = useItemsContext();
  const addSelectedItem = useToggleSelectedItem();
  const lines = useObserverValue(linesStore);
  const flow = useObserverValue(flowStore);


  useEffect(() => {
    if (!document) return;

    const handleMouseWheel = (e: WheelEvent) => {
      if (getCtrlKeyBySystem(e)) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();

        if (e.deltaY < 0) {
          setZoom(oldZoom => oldZoom >= 2 ? oldZoom : oldZoom + 0.1);
        } else {
          setZoom(oldZoom => oldZoom <= 0.2 ? oldZoom : oldZoom - 0.1);
        }
      }
    }

    const handleCtrlA = (e: KeyboardEvent) => {
      if (getCtrlKeyBySystem(e) && e.key === 'a') {
        addSelectedItem(flowStore.value.map(node => node.id.value));
      }
    }

    document.addEventListener('keydown', handleCtrlA, { passive: false });
    document.addEventListener('wheel', handleMouseWheel, { passive: false });
    return () => {
      document.removeEventListener('keydown', handleCtrlA);
      document.removeEventListener('wheel', handleMouseWheel);
    }
  }, [setZoom, document]);


  const handleOnCoordsChange = useCallback((coords: ICoords) => {
    const coordTop2 = coords.endY;
    const coordLeft2 = coords.endX;
    const coordTop1 = coords.startY;
    const coordLeft1 = coords.startX;


    const selectItemByCoords = (item: INode): boolean => {
      const itemTop1 = item.top.value;
      const itemLeft1 = item.left.value;
      const itemTop2 = item.top.value + item.height.value;
      const itemLeft2 = item.left.value + item.width.value;

      const yGreaterThan0 = ((coordTop2 - coordTop1) > 0);
      const xGreaterThan0 = ((coordLeft2 - coordLeft1) > 0);

      const lessThan0Selected = (value1: number, value2: number, _coordStart: number, _coordEnd: number) => {
        return (
          (
            (value1 <= _coordStart) || (value2 <= _coordStart)
          ) && (
            (value1 >= _coordEnd) || (value2 >= _coordEnd)
          )
        );
      }

      const greaterThan0Selected = (value1: number, value2: number, _coordStart: number, _coordEnd: number) => {
        return (
          (
            (value1 >= _coordStart) || (value2 >= _coordStart)
          ) && (
            (value1 <= _coordEnd) || (value2 <= _coordEnd)
          )
        );
      }

      return (
        (
          yGreaterThan0
            ? greaterThan0Selected(itemTop1, itemTop2, coordTop1, coordTop2)
            : lessThan0Selected(itemTop1, itemTop2, coordTop1, coordTop2)
        )
        &&
        (
          xGreaterThan0
            ? greaterThan0Selected(itemLeft1, itemLeft2, coordLeft1, coordLeft2)
            : lessThan0Selected(itemLeft1, itemLeft2, coordLeft1, coordLeft2)
        )
      );
    };

    const ids = flow.filter(item => selectItemByCoords(item)).map(node => node.id.value);

    if (ids.length === 0) return;
    addSelectedItem(ids);
  }, [flow, addSelectedItem]);


  return (
    <div
      className='panel-wrapper'
      style={{
        ...({
          '--color-panel-paper': backgroundColorPaper,
          '--color-panel-default': backgroundColorDefault,
        }) as any,
        backgroundSize: `${backgroundSize / devicePixelRatio}px ${backgroundSize / devicePixelRatio}px`,
      }}
    >
      <div
        ref={boardRef}
        className='panel'
        onScroll={e => { setScrollY(-e.currentTarget.scrollTop); setScrollX(-e.currentTarget.scrollLeft) }}
        onMouseDown={e => boardRef.current?.isSameNode(e.target as any) ? addSelectedItem([]) : undefined}
      >
        <SVGBoardSizeAndZoomContainer>
          {lines.map(line => (
            <Line
              key={line.key}

              lineIdObservable={line.id}
              blockIdObservable={line.nodeId}

              top1Observable={line.top1}
              top2Observable={line.top2}
              left1Observable={line.left1}
              left2Observable={line.left2}

              width1Observable={line.width1}
              width2Observable={line.width2}
              height1Observable={line.height1}
              height2Observable={line.height2}
            />
          ))}

          <SelectorArea
            boardRef={boardRef}
            onCoordsChange={handleOnCoordsChange}
          />
        </SVGBoardSizeAndZoomContainer>

        <BoardSizeAndZoomContainer>
          {flow.map(node => (
            <DraggableContainer node={node} key={node.id.value} />
          ))}
        </BoardSizeAndZoomContainer>
      </div>
    </div>
  );
}
