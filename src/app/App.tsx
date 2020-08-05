import React from 'react';

import { FlowEditor } from './flow-editor';
import { ItemsLogical } from './Mock';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <FlowEditor
                id="FlowEditor"
                items={ItemsLogical.map(item => ({ ...item/* , id: Utils.getUUID() */ }))}
                // onMouseEnter={console.log}
                // onMouseLeave={console.log}
                // onContextMenu={console.log}
                // onChange={console.log}
                configs={{
                    // disableSelection: true,
                    flowItemWarningColor: 'var(--main-warning-color)',
                    flowItemSelectedColor: 'var(--color-botton-bar)',
                    flowItemErrorColor: 'var(--main-error-color)',
                    commentTextColor: '#fff000',

                    // linesColor: '',
                    // commentColor: '',
                    // disableOpacity: 0.5,
                    // disableSelection: true,
                    // typesAllowedToDrop: [],
                    // flowItemTextColor: 'white',
                    // snapGridWhileDragging: true,

                    selectionBorderColor: 'var(--color-botton-bar)',
                    selectionBackgroundColor: '#ffffff11',
                    // selectionBorderType: 'dash',
                    // selectionBorderWidth: 1,

                    backgroundType: "dotted",
                    dottedSize: 15,
                    lineWidth: 2,
                }}
                childrenWhenItemsEmpty={<>
                    <h1>Drag and drop something here to start</h1>
                </>}
            />
        </div>
    );
}

export default App;
