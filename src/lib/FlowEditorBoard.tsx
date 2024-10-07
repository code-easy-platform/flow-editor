import React, { useCallback, useEffect, useRef } from 'react';
import { set, useObserverValue, useSetObserver } from 'react-observing';
import { useDrop } from 'react-use-drag-and-drop';
import { useFrame } from 'react-frame-component';
import { v4 as uuid } from 'uuid';

import { INode, useBoardScrollContext, useBoardZoomContext, useDragSelectedItems, useItemsContext, useToggleSelectedItem } from './shared/context';
import { BoardSizeAndZoomContainer, SVGBoardSizeAndZoomContainer, DraggableContainer, Line, SelectorArea, ICoords } from './shared/components';
import { NewConnection } from './shared/components/line/NewConnection';
import { getCtrlKeyBySystem } from './shared/services';
import { TId } from './shared/types';


export interface IDroppedData<T> {
  data: T;
  top: number;
  left: number;
  target: {
    lineId?: TId;
    nodeId?: TId;
    type: 'board' | 'line';
  };
}
interface IFlowEditorBoardProps {
  disableDropInLines?: boolean;

  backgroundSize?: number;
  backgroundDotColor?: string;
  backgroundColorPaper?: string;
  backgroundColorDefault?: string;

  onRemove?: (ids: TId[]) => void;
  onDrop?: (data: IDroppedData<any>) => void;
}
export const FlowEditorBoard: React.FC<IFlowEditorBoardProps> = ({ backgroundColorDefault = '#1e1e1e', backgroundColorPaper = '#484848', backgroundDotColor = '#484848', backgroundSize = 30, disableDropInLines = false, onRemove, onDrop }) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const { document } = useFrame();

  const scrollObject = useBoardScrollContext();
  const zoomObject = useBoardZoomContext();
  const setScrollX = useSetObserver(scrollObject.left);
  const setScrollY = useSetObserver(scrollObject.top);


  const { flowStore, linesStore, selectedItemsId } = useItemsContext();
  const dragAllSelectedItems = useDragSelectedItems();
  const addSelectedItem = useToggleSelectedItem();
  const lines = useObserverValue(linesStore);
  const flow = useObserverValue(flowStore);


  useDrop({
    element: boardRef,
    id: useRef(uuid()).current,
    drop: (data, { x, y }) => onDrop?.({
      data,
      target: { type: 'board' },
      top: (y + -scrollObject.top.value) / zoomObject.value,
      left: (x + -scrollObject.left.value) / zoomObject.value,
    }),
  }, [scrollObject, zoomObject]);


  useEffect(() => {
    if (!document) return;

    const handleMouseWheel = (e: WheelEvent) => {
      if (getCtrlKeyBySystem(e)) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();

        if (e.deltaY < 0) {
          set(zoomObject, oldZoom => oldZoom >= 2 ? oldZoom : oldZoom + 0.1);
        } else {
          set(zoomObject, oldZoom => oldZoom <= 0.2 ? oldZoom : oldZoom - 0.1);
        }
      }
    }

    const handleCtrlA = (e: KeyboardEvent) => {
      if (getCtrlKeyBySystem(e) && e.key === 'a') {
        addSelectedItem(flowStore.value.map(node => node.id.value));
      }
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        addSelectedItem([]);
      }
    }

    const handleDelete = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && selectedItemsId.value.length > 0) {
        onRemove?.(selectedItemsId.value);
      }
    }

    const handleArrow = (e: KeyboardEvent) => {
      const distance = e.altKey ? 30 : 15;

      if (e.key === 'ArrowUp') {
        dragAllSelectedItems(0, -distance);
      } else if (e.key === 'ArrowRight') {
        dragAllSelectedItems(distance, 0);
      } else if (e.key === 'ArrowDown') {
        dragAllSelectedItems(0, distance);
      } else if (e.key === 'ArrowLeft') {
        dragAllSelectedItems(-distance, 0);
      }
    }

    document.addEventListener('keydown', handleEsc, { passive: false });
    document.addEventListener('keydown', handleArrow, { passive: false });
    document.addEventListener('keydown', handleCtrlA, { passive: false });
    document.addEventListener('keydown', handleDelete, { passive: false });
    document.addEventListener('wheel', handleMouseWheel, { passive: false });
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('keydown', handleArrow);
      document.removeEventListener('keydown', handleCtrlA);
      document.removeEventListener('keydown', handleDelete);
      document.removeEventListener('wheel', handleMouseWheel);
    }
  }, [zoomObject, document, selectedItemsId, onRemove, dragAllSelectedItems]);


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

    addSelectedItem(ids);
  }, [flow, addSelectedItem]);


  return (
    <div
      className='panel-wrapper'
      style={{
        ...({
          '--color-panel-dot': backgroundDotColor,
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
          {flow.map(node => (
            <NewConnection key={node.id.value} node={node} />
          ))}

          {lines.map(line => (
            <Line
              key={line.key}

              lineIdObservable={line.id}
              blockIdObservable={line.nodeId}

              isCurvedObservable={line.isCurved}

              onDrop={disableDropInLines ? undefined : onDrop}

              nodeEnd={line.nodeEnd}
              nodeStart={line.nodeStart}
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
