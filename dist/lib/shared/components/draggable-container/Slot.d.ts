import { TId } from '../../types';

interface ISlotProps {
    nodeId: TId;
    width: number;
    height: number;
    getIsDisabledDropConnection: () => boolean;
    getIsDisabledCreateConnection: () => boolean;
}
export declare const Slot: React.FC<ISlotProps>;
export {};
