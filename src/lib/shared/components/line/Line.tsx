import { createElement, useMemo } from 'react';
import { observe, selector, useObserverValue } from 'react-observing';

import { ICustomLineProps, ILine, useDragLineContext, useSelectedItemsId } from '../../context';
import { DefaultLine } from './DefaultLine';
import { IDroppedData } from '../../types';


interface IDraggableContainerProps extends ILine {
  onDrop?: (data: IDroppedData<any>) => void;
  customLineComponent?: (props: ICustomLineProps) => React.ReactNode;
}
export const Line: React.FC<IDraggableContainerProps> = ({ onDrop, customLineComponent: CustomLineComponent, ...lineProps }) => {
  const dragLineContext = useDragLineContext();
  const selectedIds = useSelectedItemsId();

  const dragLineContextValue = useObserverValue(dragLineContext);


  const nodeStart = useMemo(() => {
    if (dragLineContextValue && dragLineContextValue.type === 'start' && dragLineContextValue.lineId === lineProps.id.value) {
      return {
        ...lineProps.nodeStart,
        width: observe(1),
        height: observe(1),
        top: dragLineContextValue.top,
        left: dragLineContextValue.left,
      };
    }

    return lineProps.nodeStart;
  }, [dragLineContextValue, lineProps.id, lineProps.nodeStart]);

  const nodeEnd = useMemo(() => {
    if (dragLineContextValue && dragLineContextValue.type === 'end' && dragLineContextValue.lineId === lineProps.id.value) {
      return {
        ...lineProps.nodeEnd,
        width: observe(1),
        height: observe(1),
        top: dragLineContextValue.top,
        left: dragLineContextValue.left,
      };
    }

    return lineProps.nodeEnd;
  }, [dragLineContextValue, lineProps.id, lineProps.nodeEnd]);

  const isDragging = useMemo(() => {
    return selector(({ get }) => {
      const value = get(dragLineContext);
      return value?.lineId === get(lineProps.id);
    });
  }, [dragLineContext, lineProps.id]);

  const isSelected = useMemo(() => {
    return selector(({ get }) => {
      const value = get(selectedIds);
      return value.includes(get(lineProps.id));
    });
  }, [selectedIds, lineProps.id]);


  return createElement(CustomLineComponent ? CustomLineComponent : DefaultLine, {
    lineId: lineProps.id,

    nodeId: lineProps.nodeId,
    relatedNodeId: lineProps.relatedNodeId,

    nodeEnd: nodeEnd,
    nodeStart: nodeStart,

    isDragging,
    isSelected,
  });
}
