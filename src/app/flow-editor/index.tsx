import React from 'react';
import { RecoilRoot, MutableSnapshot } from 'recoil';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { FlowItemsStore, FlowItemStore, ConfigurationsStore } from './shared/stores';
import { IFlowEditorProps } from './shared/interfaces/FlowEditorInterfaces';
import { FlowEditorBoard } from './FlowEditorBoard';

export const FlowEditor = ({ configs, items, ...rest }: IFlowEditorProps) => {
    const handleInitializaState = ({ set }: MutableSnapshot) => {

        // Set items ids
        set(FlowItemsStore, items.map(item => `${item.id}`));

        // Set items content
        items.forEach(item => {
            if (item.id) {
                set(FlowItemStore(item.id), item);
            }
        });

        // Set configurations
        set(ConfigurationsStore, {
            selectionBackgroundColor: configs.selectionBackgroundColor || '#007bff1c',
            toolbarBackgroundColor: configs.toolbarBackgroundColor || '#232323',
            flowItemWarningColor: configs.flowItemWarningColor || 'yellow',
            flowItemSelectedColor: configs.flowItemSelectedColor || 'blue',
            selectionBorderColor: configs.selectionBorderColor || 'blue',
            selectionBorderType: configs.selectionBorderType || 'normal',
            snapGridWhileDragging: configs.snapGridWhileDragging || true,
            toolbarBorderColor: configs.toolbarBorderColor || '#000',
            selectionBorderWidth: configs.selectionBorderWidth || 1,
            flowItemTextColor: configs.flowItemTextColor || 'white',
            flowItemErrorColor: configs.flowItemErrorColor || 'red',
            backgroundColor: configs.backgroundColor || '#171717',
            typesAllowedToDrop: configs.typesAllowedToDrop || [],
            commentTextColor: configs.commentTextColor || '#fff',
            disableSelection: configs.disableSelection || false,
            backgroundType: configs.backgroundType || 'dotted',
            toolbarItemWidth: configs.toolbarItemWidth || 30,
            commentColor: configs.commentColor || 'green',
            disableOpacity: configs.disableOpacity || 0.5,
            linesColor: configs.linesColor || 'gray',
            dotColor: configs.dotColor || '#484848',
            dottedSize: configs.dottedSize || 15,
            lineWidth: configs.lineWidth || 1,
        });
    }

    return (
        <RecoilRoot initializeState={handleInitializaState}>
            <DndProvider backend={HTML5Backend}>
                <FlowEditorBoard {...rest} />
            </DndProvider>
        </RecoilRoot >
    );
}