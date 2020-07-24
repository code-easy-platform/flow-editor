import React, { memo } from 'react'

import { IFlowEditorBoardProps } from './shared/interfaces/FlowEditorInterfaces';
import { EditorPanel } from '../code-editor/components/editor-panel/EditorPanel';
import { SelectorArea } from '../code-editor/components/selector/SelectorArea';
import { EmptyFeedback } from './components/empty-feedback/EmptyFeedback';
import { FlowItem } from './components/flow-item/FlowItem';
import { useFlowItems } from './contexts/FlowItemsContext';
import { useConfigs } from './contexts/Configurations';

export const FlowEditorBoard: React.FC<IFlowEditorBoardProps> = memo((props) => {
    const { boardSize, items, removeSelection, selectAll, selectionAreaChange, removeSelectedItems } = useFlowItems();
    const { backgroundType, disableSelection, typesAllowedToDrop, dottedSize } = useConfigs();
    const { id, childrenWhenItemsEmpty = "Nothing here to edit" } = props;
    const { onMouseEnter, onMouseLeave } = props;

    return (
        <div className="full-height full-width" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <main key={id} className="overflow-auto flex1 full-height full-width">
                <EditorPanel
                    id={`${id}_SVG`}
                    width={boardSize.width}
                    dottedSize={dottedSize}
                    height={boardSize.height}
                    onKeyDownCtrlA={selectAll}
                    onMouseDown={removeSelection}
                    allowedsInDrop={typesAllowedToDrop}
                    onKeyDownDelete={removeSelectedItems}
                    backgroundType={backgroundType || "custom"}
                >
                    {items.map(item => (
                        <FlowItem
                            {...item}
                            key={item.id}
                        />
                    ))}
                    <SelectorArea
                        isDisabled={disableSelection}
                        onCoordsChange={selectionAreaChange}
                    />
                    <EmptyFeedback show={items.length === 0} children={childrenWhenItemsEmpty} />
                </EditorPanel>
            </main>
        </div>
    );
});
