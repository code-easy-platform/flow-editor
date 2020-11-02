import { observe, useObserverValue } from "react-observing";
import { EFlowItemType } from "../enums";
import { FlowItemsState } from "../stores";

export const useLineProps = (id: string | undefined, originId: string, targetId: string) => {
    const originItem = FlowItemsState.value.find(item => item.id.value === originId);

    // Find the origin component props
    const flowItemType = useObserverValue(originItem?.flowItemType || observe(EFlowItemType.acorn));
    const isDisabled = useObserverValue(originItem?.isDisabled || observe(false));
    const connections = useObserverValue(originItem?.connections || observe([]));
    const left = useObserverValue(originItem?.left || observe(0));
    const top = useObserverValue(originItem?.top || observe(0));
    const isComment = flowItemType === EFlowItemType.comment;
    const lineType = isComment ? 'dotted' : 'normal';

    // Find the current connection in their item
    const connection = connections.find(connection => connection.id.value === id);
    const connectionDescription = useObserverValue(connection?.connectionDescription || observe(''));
    const connectionLabel = useObserverValue(connection?.connectionLabel || observe(''));
    const isSelected = useObserverValue(connection?.isSelected || observe(false));


    const targetItem = FlowItemsState.value.find(item => item.id.value === targetId);

    // Find the target component
    const targetConnections = useObserverValue(targetItem?.connections || observe([]));
    const targetLeft = useObserverValue(targetItem?.left || observe(0));
    const targetTop = useObserverValue(targetItem?.top || observe(0));
    const isCurved = targetConnections.some(connection => connection.targetId.value === originId);

    // Calc the correct positions of the line arrow
    const newLeft = left + ((originItem?.width.value || 0) / 2);
    const newTop = top + ((originItem?.height.value || 0) / 2);
    const top2 = id !== undefined ? targetTop + ((targetItem?.height.value || 0) / 2) : top + ((originItem?.height.value || 0) / 2);
    const left2 = id !== undefined ? targetLeft + ((targetItem?.width.value || 0) / 2) : left + ((originItem?.width.value || 0) / 2);

    /** Used to guide the line arrow when connected */
    const radius = (targetItem?.width.value || 0) - ((targetItem?.width.value || 0) / 4);

    return {
        connectionDescription: connectionDescription,
        lineType: lineType as "dotted" | "normal",
        connectionLabel: connectionLabel,
        left: newLeft,
        top: newTop,
        isSelected,
        isDisabled,
        isComment,
        isCurved,
        radius,
        left2,
        top2,
    };
}
