import React, { memo } from 'react'
import { IFlowEditorBoardProps } from './shared/interfaces/FlowEditorInterfaces';
import { EditorPanel } from '../code-editor/components/editor-panel/EditorPanel';
import { useConfigs } from './contexts/Configurations';
import { useFlowItems } from './contexts/FlowItems';
import { SelectorArea } from '../code-editor/components/selector/SelectorArea';

export const FlowEditorBoard: React.FC<IFlowEditorBoardProps> = memo((props) => {
    const { backgroundType, disableSelection, disableOpacity, snapGridWhileDragging } = useConfigs();
    const { boardSize, items } = useFlowItems();

    const { onMouseEnter, onMouseLeave } = props;
    const { id, childrenWhenItemsEmpty = "Nothing here to edit" } = props;

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

                {items.length === 0
                    && <foreignObject width={"100%"} height={"100%"}>
                        <div className="full-height full-width flex-items-center flex-content-center opacity-5">
                            {childrenWhenItemsEmpty}
                        </div>
                    </foreignObject>
                }
            </EditorPanel>
        </div>
    );
});
