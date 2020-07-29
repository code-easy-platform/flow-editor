import React, { useCallback } from 'react';
import { useRecoilCallback } from 'recoil';

import { IFlowEditorBoardProps } from './shared/interfaces/FlowEditorInterfaces';
import { EmptyFeedback } from './components/empty-feedback/EmptyFeedback';
import { EditorPanel } from './components/editor-panel/EditorPanel';
import { SelectorArea } from './components/selector/SelectorArea';
import { FlowItem } from './components/flow-item/FlowItem';
import { useFlowItems, useConfigs } from './shared/hooks';
import { ICoords, IFlowItem } from './shared/interfaces';
import { FlowItemStore } from './shared/stores';

export const FlowEditorBoard: React.FC<IFlowEditorBoardProps> = (props) => {
    const { dottedSize, typesAllowedToDrop, backgroundType, disableSelection } = useConfigs();
    const { id, childrenWhenItemsEmpty = "Nothing here to edit" } = props;
    const { onMouseEnter, onMouseLeave, onContextMenu } = props;
    const items = useFlowItems();

    const selectItem = useCallback((item: IFlowItem, coords: ICoords) => {
        const top2 = item.top + (item.height || 0);
        const left2 = item.left + (item.width || 0);

        const yGreaterThan0 = ((coords.endY - coords.startY) > 0);
        const xGreaterThan0 = ((coords.endX - coords.startX) > 0);

        const lessThan0Selected = (_param1: number, _param2: number, _coordStart: number, _coordEnd: number) => {
            return (
                (
                    (_param1 <= _coordStart) || (_param2 <= _coordStart)
                ) && (
                    (_param1 >= _coordEnd) || (_param2 >= _coordEnd)
                )
            );
        }

        const greaterThan0Selected = (_param1: number, _param2: number, _coordStart: number, _coordEnd: number) => {
            return (
                (
                    (_param1 >= _coordStart) || (_param2 >= _coordStart)
                ) && (
                    (_param1 <= _coordEnd) || (_param2 <= _coordEnd)
                )
            );
        }

        return (
            (
                yGreaterThan0
                    ? greaterThan0Selected(item.top, top2, coords.startY, coords.endY)
                    : lessThan0Selected(item.top, top2, coords.startY, coords.endY)
            )
            &&
            (
                xGreaterThan0
                    ? greaterThan0Selected(item.left, left2, coords.startX, coords.endX)
                    : lessThan0Selected(item.left, left2, coords.startX, coords.endX)
            )
        );
    }, [])

    const setSelectedFlowItem = useRecoilCallback(({ set, snapshot }) => (coords: ICoords) => {
        items.forEach(async id => {

            const item = await snapshot.getPromise(FlowItemStore(id));
            const isSelected = selectItem(item, coords);

            if (item.isSelected !== isSelected) {
                set(FlowItemStore(id), { ...item, isSelected });
            }

        });
    });

    return (
        <div className="full-height full-width" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <main key={id} className="overflow-auto flex1 full-height full-width">
                <EditorPanel
                    id={`${id}_SVG`}
                    // ref={editorPanelRef}
                    dottedSize={dottedSize}
                    onContextMenu={onContextMenu}
                    // onKeyDownCtrlA={selectAll}
                    // onKeyDownCtrlC={handleCtrlC}
                    // onKeyDownCtrlV={handleCtrlV}
                    // onMouseDown={removeSelection}
                    backgroundType={backgroundType}
                    allowedsInDrop={typesAllowedToDrop}
                // onKeyDownDelete={removeSelectedItems}
                >
                    {/* getLines().map((line, index) => <Line key={index} {...line} onContextMenu={onContextMenu} />) */}

                    {items.map(id => (
                        <FlowItem
                            id={id}
                            key={id}
                            onContextMenu={onContextMenu}
                        />
                    ))}
                    <SelectorArea
                        isDisabled={disableSelection}
                        onCoordsChange={setSelectedFlowItem}
                    />
                    <EmptyFeedback show={items.length === 0} children={childrenWhenItemsEmpty} />
                </EditorPanel>
            </main>
        </div>
    );
}
