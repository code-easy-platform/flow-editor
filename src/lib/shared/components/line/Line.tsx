import { ICustomLineProps, ILine } from '../../context';
import { DefaultLine } from './DefaultLine';
import { IDroppedData } from '../../types';


interface IDraggableContainerProps extends ILine {
  onDrop?: (data: IDroppedData<any>) => void;
  customLineComponent?: (props: ICustomLineProps) => React.ReactNode;
}
export const Line: React.FC<IDraggableContainerProps> = ({ onDrop, customLineComponent: CustomLineComponent, ...lineProps }) => {


  if (CustomLineComponent) return (
    <CustomLineComponent
      lineId={lineProps.id}

      nodeId={lineProps.nodeId}
      relatedNodeId={lineProps.relatedNodeId}

      nodeEnd={lineProps.nodeEnd}
      nodeStart={lineProps.nodeStart}

      onDrop={onDrop}
    />
  );

  return (
    <DefaultLine
      lineId={lineProps.id}

      nodeId={lineProps.nodeId}
      relatedNodeId={lineProps.relatedNodeId}

      nodeEnd={lineProps.nodeEnd}
      nodeStart={lineProps.nodeStart}

      onDrop={onDrop}
    />
  );
}
