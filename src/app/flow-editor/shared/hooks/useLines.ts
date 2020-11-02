import { useCallback, useEffect, useState } from "react";

import { IConnection } from "../interfaces";
import { FlowItemsState } from "../stores";

export const useLines = () => {
    const items = FlowItemsState.value;

    const initState = useCallback(() => {
        const res: IConnection[] = [];

        items.forEach(item => {
            item.connections.value.forEach(connection => {
                res.push(connection);
            });
        });

        return res;
    }, [items]);

    const [lines, setLines] = useState<IConnection[]>(initState());

    useEffect(() => {
        const subscriptions: any[] = [];
        items.forEach(item => {
            subscriptions.push(item.connections.subscribe(connections => {
                connections.forEach(connection => {
                    setLines(oldLines => {
                        const indexToUpdate = oldLines.findIndex(line => line.id.value === connection.id.value)
                        if (indexToUpdate > -1) {
                            oldLines[indexToUpdate] = connection;
                        } else {
                            oldLines.push(connection);
                        }

                        return oldLines.sort();
                    });
                });
            }));
        });
        return () => subscriptions.forEach(subscription => subscription.unsubscribe());
    }, [items]);

    return lines.map(line => ({
        id: line.id.value,
        originId: line.originId,
        targetId: line.targetId,
    }));
}
