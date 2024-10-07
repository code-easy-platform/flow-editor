import { TId } from './TId';


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
