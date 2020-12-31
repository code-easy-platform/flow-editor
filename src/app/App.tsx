import React, { useEffect, useState } from 'react';

import { ItemsLogical, ToolItems, AllowedsInDrop, BreadCrumps } from './Mock';
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
                breadcrumbs={breadCrumps}
                onChangeItems={items => {
                    console.log(items)
                    setItemsLogical(items);
                }}
                configs={{

                    /** FLOW ITEMS */
                    flowItemWarningColor: 'var(--main-warning-color)',
                    flowItemSelectedColor: 'var(--color-botton-bar)',
                    flowItemErrorColor: 'var(--main-error-color)',
                    commentTextColor: '#ffffff',
                    lineWidth: 1,

                    /** EDITOR */
                    typesAllowedToDrop: AllowedsInDrop,
                    snapGridWhileDragging: true,
                    backgroundType: "dotted",
                    dottedSize: 15,

                    showToolbar: true,

                    /** SELECTION */
                    selectionBorderColor: 'var(--color-botton-bar)',
                    selectionBackgroundColor: '#ffffff11',
                }}
                childrenWhenItemsEmpty={<>
                    <div style={{ height: '-webkit-fill-available', width: '-webkit-fill-available', justifyContent: 'center', alignItems: 'center', opacity: 0.5 }}>
                        <h1>Drag and drop something here to start</h1>
                    </div>
                </>}
            />
        </div>
    );
}

export default App;
