import React, { memo } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { IFlowEditorProps } from './shared/interfaces/FlowEditorInterfaces';
import { ConfigurationProvider } from './contexts/ConfigurationsContext';
import { FlowItemsProvider } from './contexts/FlowItemsContext';
import { FlowEditorBoard } from './FlowEditorBoard';

export const FlowEditor: React.FC<IFlowEditorProps> = memo(({ configs, items, ...rest }) => {
    return (
        <ConfigurationProvider configs={configs}>
            <DndProvider backend={HTML5Backend}>
                <FlowItemsProvider items={items}>
                    <FlowEditorBoard {...rest} />
                </FlowItemsProvider>
            </DndProvider>
        </ConfigurationProvider>
    );
});

export * from './shared/interfaces/FlowEditorInterfaces';
