import React, { memo } from 'react'
import { IFlowEditorBoardProps } from './shared/interfaces/FlowEditorInterfaces';
import { EditorPanel } from '../code-editor/components/editor-panel/EditorPanel';
import { useConfigs } from './contexts/Configurations';
import { useFlowItems } from './contexts/FlowItems';
import { SelectorArea } from '../code-editor/components/selector/SelectorArea';
import { EmptyFeedback } from './components/empty-feedback/EmptyFeedback';

export const FlowEditorBoard: React.FC<IFlowEditorBoardProps> = memo((props) => {
    const { backgroundType, disableSelection, snapGridWhileDragging } = useConfigs();
    const { id, childrenWhenItemsEmpty = "Nothing here to edit" } = props;
    const { onMouseEnter, onMouseLeave } = props;
    const { boardSize, items } = useFlowItems();

    return (
        <div className="full-height full-width" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <EditorPanel
                id={`${id}_SVG`}
                allowedsInDrop={[]}
                width={boardSize.width}
                height={boardSize.height}
                backgroundType={backgroundType || "custom"}
            >

                <SelectorArea
                    isDisabled={disableSelection}
                />

                <EmptyFeedback show={items.length === 0} children={childrenWhenItemsEmpty} />
            </EditorPanel>
        </div>
    );
});
