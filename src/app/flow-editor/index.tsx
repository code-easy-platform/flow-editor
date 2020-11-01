import React, { useCallback } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { set } from 'react-observing';

import { ConfigurationProvider } from './shared/contexts';
import { IFlowEditorProps } from './shared/interfaces';
import { FlowEditorBoard } from './FlowEditorBoard';
import { FlowItemsState } from './shared/stores';

export const FlowEditor: React.FC<IFlowEditorProps> = ({ configs, items, onChangeItems, ...rest }) => {

    const handleInitState = useCallback(() => {
        set(FlowItemsState, items)
    }, [items]);
    handleInitState();

    return (
        <ConfigurationProvider configs={configs}>
            <DndProvider backend={HTML5Backend}>
                <FlowEditorBoard {...rest} />
            </DndProvider>
        </ConfigurationProvider>
    );
}

export * from './shared/interfaces';
export * from './shared/enums';
