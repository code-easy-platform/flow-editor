import React from 'react';
import { MutableSnapshot, RecoilRoot } from 'recoil';

import { FlowItemStore, FlowItemsStore, FlowLinesStore } from './';
import { ILine, IFlowItem } from './../interfaces';

interface RecoilContainerProps {
    items: IFlowItem[];
}
export const RecoilContainer: React.FC<RecoilContainerProps> = ({ items, children }) => {

    const handleInitializaState = ({ set }: MutableSnapshot) => {
        let lines: ILine[] = [];

        // Set items ids
        set(FlowItemsStore, items.map(item => String(item.id)));

        // Set items content
        items.forEach(item => {
            if (item.id) {
                set(FlowItemStore(item.id), item);
                (item.connections || []).forEach(({ id, originId, targetId }) => {
                    if (id) {
                        lines.push({ id, originId, targetId });
                    }
                });
            }
        });

        set(FlowLinesStore, lines);
    }

    return (
        <RecoilRoot initializeState={handleInitializaState}>
            {children}
        </RecoilRoot>
    );
}
