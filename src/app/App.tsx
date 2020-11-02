import React from 'react';

import { ItemsLogical, ToolItems, AllowedsInDrop } from './Mock';
import { FlowEditor,  } from './flow-editor';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <FlowEditor
                id="FlowEditor"
                toolItems={ToolItems}
                items={ItemsLogical.map(item => ({ ...item }))}
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
