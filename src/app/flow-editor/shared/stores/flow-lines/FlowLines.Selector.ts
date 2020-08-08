import { selectorFamily } from "recoil";

import { EFlowItemType } from "../../enums";
import { useSizeByText } from "../../hooks";
import { FlowItemStore } from "./../";

interface IConnectionLinePros {
    connectionDescription: string | undefined;
    connectionLabel: string | undefined;
    lineType: "dotted" | "normal";
    isSelected?: boolean;
    isDisabled?: boolean;
    isComment: boolean;
    isCurved: boolean,
    height?: number,
    radius: number,
    width?: number,
    left2: number,
    top2: number,
    left: number,
    top: number,
}
export const GetConnectionPropsSelector = selectorFamily<IConnectionLinePros, { id: string | undefined, originId: string | undefined }>({
    key: 'get-connection-props-selection',
    get: ({ id, originId }) => ({ get }) => {
        const getSizeByText = useSizeByText();

        // Find the origin component
        const { connections = [], isDisabled, flowItemType, ...originItem } = get(FlowItemStore(String(originId)));
        const isComment = flowItemType === EFlowItemType.comment;
        const lineType = isComment ? 'dotted' : 'normal';
        let { width, height, top, left } = originItem;

        if (isComment) {
            const commentSizes = getSizeByText(originItem.description || '');
            width = commentSizes.width + 8;
            height = commentSizes.height + 4;   
        }

        // Find the current connection in their item
        const connection = connections.find(connection => connection.id === id);

        // Find the target component
        const { connections: targetConnections = [], ...targetItem } = get(FlowItemStore(String(connection?.targetId)));
        const isCurved = targetConnections.some(connection => connection.targetId === originId);

        // Calc the correct positions of the line arrow
        top = top + ((height || 0) / 2);
        left = left + ((width || 0) / 2);
        const top2 = id !== undefined ? targetItem.top + ((targetItem.height || 0) / 2) : top + ((height || 0) / 2);
        const left2 = id !== undefined ? targetItem.left + ((targetItem.width || 0) / 2) : left + ((width || 0) / 2);

        /** Used to guide the line arrow when connected */
        let radius: number = (targetItem.width || 0) - ((targetItem.width || 0) / 4);

        return {
            connectionDescription: connection?.connectionDescription,
            connectionLabel: connection?.connectionLabel,
            isSelected: connection?.isSelected,
            isDisabled,
            isComment,
            lineType,
            isCurved,
            radius,
            height,
            width,
            left2,
            top2,
            left,
            top,
        };
    }
});
