import { useEffect, useState } from "react";
import { ISubscription, useObserverValue } from "react-observing";

import { IConnection } from "../interfaces";
import { FlowItemsState } from "../stores";

export const useLines = () => {
    const items = useObserverValue(FlowItemsState);

    const [lines, setLines] = useState<IConnection[]>([]);
    useEffect(() => {
        const conns: IConnection[] = [];

        items.forEach(item => {
            item.connections.value.forEach(connection => {
                conns.push(connection);
            });
        });

        setLines(conns)
    }, [items]);

    useEffect(() => {
        const subscriptions: ISubscription[] = [];

        items.forEach(item => {
            subscriptions.push(item.connections.subscribe(connections => {
                connections.forEach(connection => {
                    if (lines.some(line => line.id.value === connection.id.value)) {
                        setLines([
                            ...lines.map(conn => {
                                if (conn.id.value === connection.id.value) {
                                    return {
                                        ...conn,
                                        targetId: connection.targetId
                                    };
                                } else {
                                    return conn;
                                }
                            })
                        ]);
                    } else {
                        setLines([
                            ...lines,
                            connection,
                        ]);
                    }
                });
            }));
        });
        return () => subscriptions.forEach(subscription => subscription.unsubscribe());
    }, [items, lines]);

    return lines.map(line => ({
        id: line.id.value,
        originId: line.originId,
        targetId: line.targetId,
    }));
}
