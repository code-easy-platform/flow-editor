import React, { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';

import { FlowItemsStore, FlowItemStore } from './flow-items/FlowItems.Store';
import { FlowLinesStore } from './flow-lines/FlowLines.Store';
import { IFlowItem, ILine } from '../interfaces';
import { EFlowItemType } from '../enums';
import { useSizeByText } from '../hooks';


export const InitializeState: React.FC<{ items: IFlowItem[] }> = ({ items }) => {
    const getSizeByText = useSizeByText();

    const handleInitialize = useRecoilCallback(({ set, reset }) => () => {
        let lines: ILine[] = [];

        // Reset old state
        reset(FlowItemsStore)

        // Set items ids
        set(FlowItemsStore, items.map(item => String(item.id)));

        // Set items content
        items.forEach(item => {
            if (item.id) {
                const isComment = item.flowItemType === EFlowItemType.comment;

                // Reset old state
                reset(FlowItemStore(item.id));

                set(FlowItemStore(item.id), {
                    ...item,
                    ...(
                        isComment
                            ? getSizeByText(item.description || '')
                            : {}
                    )
                });
                (item.connections || []).forEach(({ id, originId, targetId }) => {
                    if (id) {
                        lines.push({ id, originId, targetId });
                    }
                });
            }
        });

        // Reset old state
        reset(FlowLinesStore)

        // Set new state
        set(FlowLinesStore, lines);
    }, [items]);

    useEffect(() => {
        handleInitialize();
    }, [handleInitialize]);

    return null;
}
