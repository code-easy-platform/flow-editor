import { createElement, useMemo } from 'react';
import { observe, selector, useObserverValue } from 'react-observing';

import { ICustomLineProps, IHandle, ILine, useDragLineContext, useHandlesContext, useSelectedItemsId } from '../../context';
import { DefaultLine } from './DefaultLine';
import { IDroppedData } from '../../types';


interface IDraggableContainerProps extends ILine {
  onDrop?: (data: IDroppedData<any>) => void;
  customLineComponent?: (props: ICustomLineProps) => React.ReactNode;
}
export const Line: React.FC<IDraggableContainerProps> = ({ onDrop, customLineComponent: CustomLineComponent, ...lineProps }) => {
  const handles = useObserverValue(useHandlesContext().handles);
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

  const nodeStartHandle = useMemo(() => {
    const defaultHandle: IHandle = {
      _id: observe(crypto.randomUUID()),
      id: observe(undefined),
      node: nodeStart,
      top: nodeStart.top,
      left: nodeStart.left,
      width: nodeStart.width,
      height: nodeStart.height,
      position: observe('right'),
    };

    const nodeHandles = handles.filter(handle => handle.node.id.value === nodeStart.id.value);
    if (!nodeHandles || nodeHandles.length === 0) return defaultHandle;

    const handle = nodeHandles.find(handle => handle.id.value === lineProps.nodeStartHandleId.value);
    if (!handle) return defaultHandle;

    if (dragLineContextValue && dragLineContextValue.type === 'start' && dragLineContextValue.lineId === lineProps.id.value) {
      return {
        ...handle,
        width: observe(1),
        height: observe(1),
        top: dragLineContextValue.top,
        left: dragLineContextValue.left,
      };
    }

    return {
      ...handle,
      top: selector(({ get }) => get(handle.top) + get(handle.node.top)),
      left: selector(({ get }) => get(handle.left) + get(handle.node.left)),
    };
  }, [dragLineContextValue, handles, nodeStart.id, lineProps.id, lineProps.nodeStartHandleId]);

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

  const nodeEndHandle = useMemo(() => {
    const defaultHandle: IHandle = {
      _id: observe(crypto.randomUUID()),
      id: observe(undefined),
      node: nodeEnd,
      top: nodeEnd.top,
      left: nodeEnd.left,
      width: nodeEnd.width,
      height: nodeEnd.height,
      position: observe('left'),
    };

    const nodeHandles = handles.filter(handle => handle.node.id.value === nodeEnd.id.value);
    if (!nodeHandles || nodeHandles.length === 0) return defaultHandle;

    const handle = nodeHandles.find(handle => handle.id.value === lineProps.nodeEndHandleId.value);
    if (!handle) return defaultHandle;

    if (dragLineContextValue && dragLineContextValue.type === 'end' && dragLineContextValue.lineId === lineProps.id.value) {
      return {
        ...handle,
        width: observe(1),
        height: observe(1),
        top: dragLineContextValue.top,
        left: dragLineContextValue.left,
      };
    }

    return {
      ...handle,
      top: selector(({ get }) => get(handle.top) + get(handle.node.top)),
      left: selector(({ get }) => get(handle.left) + get(handle.node.left)),
    };
  }, [dragLineContextValue, handles, nodeEnd.id.value, lineProps.id, lineProps.nodeEndHandleId.value]);

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

    nodeStart,
    nodeStartHandle,
    nodeId: lineProps.nodeId,

    nodeEnd,
    nodeEndHandle,
    relatedNodeId: lineProps.relatedNodeId,

    isDragging,
    isSelected,
  });
}
