import { TId } from '../../types';
import { IDroppedData } from '../../../FlowEditorBoard';
import { IObservable } from 'react-observing';

interface IDraggableContainerProps {
    lineIdObservable: IObservable<TId>;
    blockIdObservable: IObservable<TId>;
    top1Observable: IObservable<number>;
    left1Observable: IObservable<number>;
    top2Observable: IObservable<number>;
    left2Observable: IObservable<number>;
    width1Observable: IObservable<number>;
    width2Observable: IObservable<number>;
    height1Observable: IObservable<number>;
    height2Observable: IObservable<number>;
    isCurvedObservable: IObservable<boolean>;
    onDrop?: (data: IDroppedData<any>) => void;
}
export declare const Line: React.FC<IDraggableContainerProps>;
export {};
