import React from 'react';
import { RecoilRoot, MutableSnapshot } from 'recoil';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { IFlowEditorProps } from './shared/interfaces/FlowEditorInterfaces';
import { FlowEditorBoard } from './FlowEditorBoard';
import { FlowItemsStore, FlowItemStore, ConfigurationsStore } from './shared/stores';

export const FlowEditor = ({ configs, items, ...rest }: IFlowEditorProps) => {
    const handleInitializaState = ({ set }: MutableSnapshot) => {

        // Set items ids
        set(FlowItemsStore, items.map(item => `${item.id}`));

        // Set items content
        items.forEach(item => {
            if (item.id)
                set(FlowItemStore(item.id), item);
        });

        // Set configurations
        set(ConfigurationsStore, configs);
    }

    return (
        <RecoilRoot initializeState={handleInitializaState}>
            <DndProvider backend={HTML5Backend}>
                <FlowEditorBoard {...rest} />
            </DndProvider>
        </RecoilRoot >
    );
}