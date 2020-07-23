import React, { memo } from 'react'
import { IFlowEditorBoardProps } from './shared/interfaces/FlowEditorInterfaces';
import { EditorPanel } from '../code-editor/components/editor-panel/EditorPanel';
import { useConfigs } from './contexts/Configurations';
import { useFlowItems } from './contexts/FlowItems';
import { SelectorArea } from '../code-editor/components/selector/SelectorArea';

export const FlowEditorBoard: React.FC<IFlowEditorBoardProps> = memo((props) => {
    const { backgroundType, enabledSelection, disableOpacity, snapGridWhileDragging } = useConfigs();
    const { boardSize } = useFlowItems();

    const { onMouseEnter, onMouseLeave } = props;
    const { id } = props;

    return (
        <div className="full-height full-width" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <EditorPanel
                id={`${id}_SVG`}
                allowedsInDrop={[]}
                width={boardSize.width}
                height={boardSize.height}
                backgroundType={enabledSelection ? backgroundType : "custom"}
            >

                <SelectorArea  />
            </EditorPanel>
        </div>
    );
});
