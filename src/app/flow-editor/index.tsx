import React from 'react';
import { RecoilRoot, MutableSnapshot } from 'recoil';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { FlowItemsStore, FlowItemStore, FlowLinesStore } from './shared/stores';
import { IFlowEditorProps } from './shared/interfaces/FlowEditorInterfaces';
import { FlowEditorBoard } from './FlowEditorBoard';
import { ILine } from './shared/interfaces';
import { ConfigurationProvider } from './shared/contexts/Configurations';

export const FlowEditor = ({ configs, items, ...rest }: IFlowEditorProps) => {
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
        <ConfigurationProvider configs={configs}>
            <RecoilRoot initializeState={handleInitializaState}>
                <DndProvider backend={HTML5Backend}>
                    <FlowEditorBoard {...rest} />
                </DndProvider>
            </RecoilRoot >
        </ConfigurationProvider>
    );
}