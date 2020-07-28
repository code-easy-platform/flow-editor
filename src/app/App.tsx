import React from 'react';

import { newItemsLogical } from './Mock';
// import { FlowEditor } from './code-editor/CodeEditor';
import { FlowEditor } from './flow-editor';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <FlowEditor
                id="FlowEditor"
                items={newItemsLogical.map(item => ({ ...item/* , id: Utils.getUUID() */ }))}
                // onMouseEnter={console.log}
                // onMouseLeave={console.log}
                configs={{
                    // disableSelection: true,
                    flowItemWarningColor: 'var(--main-warning-color)',
                    flowItemSelectedColor: 'var(--color-botton-bar)',
                    flowItemErrorColor: 'var(--main-error-color)',
                    snapGridWhileDragging: true,
                    backgroundType: "dotted",
                    dottedSize: 15,
                }}
                childrenWhenItemsEmpty={<>
                    <h1>Drag and drop something here to start</h1>
                </>}
            />

            {/* <FlowEditor
                items={items}
                id={"FLOW_EDITOR"}
                showToolbar={true}
                allowedsInDrop={[]}
                key={"FLOW_EDITOR"}
                toolItems={itemsLogica}
                // enabledSelection={false}
                onChangeItems={console.log}
                // onMouseOver={console.log}
                emptyMessage={"Drag an item on this panel to start"}
                breadcrumbs={[
                    { label: 'Routes', onClick: console.log },
                    { label: 'authenticate1', onClick: console.log },
                    { label: 'authenticate2', onClick: console.log },
                    { label: 'authenticate3', onClick: console.log },
                    { label: 'authenticate4', onClick: console.log },
                    { label: 'authenticate5', onClick: console.log },
                    { label: 'authenticate6', onClick: console.log },
                    { label: 'authenticate7', onClick: console.log },
                    { label: 'authenticate8', onClick: console.log },
                    { label: 'authenticate9', onClick: console.log },
                    { label: 'authenticate10', onClick: console.log },
                    { label: 'authenticate11', onClick: console.log },
                    { label: 'authenticate12', onClick: console.log },
                    { label: 'authenticate13', onClick: console.log },
                    { label: 'authenticate14', onClick: console.log },
                ]}
            /> */}

        </div>
    );
}

export default App;