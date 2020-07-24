import React, { memo } from 'react'

import { IFlowEditorBoardProps } from './shared/interfaces/FlowEditorInterfaces';
import { EditorPanel } from '../code-editor/components/editor-panel/EditorPanel';
import { SelectorArea } from '../code-editor/components/selector/SelectorArea';
import { EmptyFeedback } from './components/empty-feedback/EmptyFeedback';
import { EFlowItemType } from './shared/interfaces/FlowItemInterfaces';
import { FlowItem } from './components/flow-item/FlowItem';
import { useConfigs } from './contexts/Configurations';
import { useFlowItems } from './contexts/FlowItemsContext';

export const FlowEditorBoard: React.FC<IFlowEditorBoardProps> = memo((props) => {
    const { backgroundType, disableSelection, typesAllowedToDrop = [], dottedSize } = useConfigs();
    const { id, childrenWhenItemsEmpty = "Nothing here to edit" } = props;
    const { onMouseEnter, onMouseLeave } = props;
    const { boardSize, items, removeSelection } = useFlowItems();

    return (
        <div className="full-height full-width" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <EditorPanel
                id={`${id}_SVG`}
                width={boardSize.width}
                dottedSize={dottedSize}
                height={boardSize.height}
                onMouseDown={removeSelection}
                allowedsInDrop={typesAllowedToDrop}
                backgroundType={backgroundType || "custom"}
            >
                {items.map(item => (
                    <FlowItem
                        {...item}
                        key={item.id}
                        flowItemType={EFlowItemType.acorn}
                    />
                ))}

                <SelectorArea
                    isDisabled={disableSelection}
                />

                <EmptyFeedback show={items.length === 0} children={childrenWhenItemsEmpty} />
            </EditorPanel>
        </div>
    );
});