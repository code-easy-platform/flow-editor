import React, { useEffect, useState } from 'react';

import { ItemsLogical, ToolItems, AllowedInDrop, BreadCrumps } from './Mock';
import { FlowEditor, IBreadCrumbButton, IFlowItem } from './flow-editor';
import './App.css';

const App: React.FC = () => {
    const [breadCrumps, setBreadCrumps] = useState<IBreadCrumbButton[]>([]);
    const [itemsLogical, setItemsLogical] = useState<IFlowItem[]>([]);

    useEffect(() => {
        setTimeout(() => {
            setItemsLogical(ItemsLogical);
            setBreadCrumps(BreadCrumps);
        }, 500);
    }, [setItemsLogical]);

    return (
        <div className="App">
            <FlowEditor
                id="FlowEditor"
                items={itemsLogical}
                toolItems={ToolItems}
                onSelect={console.log}
                breadcrumbs={breadCrumps}
                onChangeItems={setItemsLogical}
                configs={{

                    /** FLOW ITEMS */
                    flowItemWarningColor: 'var(--main-warning-color)',
                    flowItemSelectedColor: 'var(--color-bottom-bar)',
                    flowItemErrorColor: 'var(--main-error-color)',
                    commentTextColor: '#ffffff',
                    lineWidth: 1,

                    /** EDITOR */
                    typesAllowedToDrop: AllowedInDrop,
                    snapGridWhileDragging: true,
                    backgroundType: "dotted",
                    dottedSize: 15,

                    showToolbar: true,

                    /** SELECTION */
                    selectionBorderColor: 'var(--color-bottom-bar)',
                    selectionBackgroundColor: '#ffffff11',

                    rulers: [80]
                }}
                childrenWhenItemsEmpty={
                    <div style={{ height: '-webkit-fill-available', width: '-webkit-fill-available', justifyContent: 'center', alignItems: 'center', opacity: 0.5 }}>
                        <h1>Drag and drop something here to start</h1>
                    </div>
                }
            />
        </div>
    );
}

export default App;
