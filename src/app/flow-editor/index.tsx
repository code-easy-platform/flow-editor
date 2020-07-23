import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { IFlowEditorProps } from './shared/interfaces/FlowEditorInterfaces';
import { ConfigurationProvider } from './contexts/Configurations';
import { FlowItemsProvider } from './contexts/FlowItems';
import { FlowEditorBoard } from './FlowEditor';

export const FlowEditor: React.FC<IFlowEditorProps> = ({ configs, items, ...rest }) => {
    return (
        <ConfigurationProvider configs={configs}>
            <DndProvider backend={HTML5Backend}>
                <FlowItemsProvider items={items}>
                    <FlowEditorBoard {...rest} />
                </FlowItemsProvider>
            </DndProvider>
        </ConfigurationProvider>
    );
}
