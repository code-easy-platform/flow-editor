import React from 'react';

import { ItemsLogical, ToolItems, AllowedsInDrop } from './Mock';
import { FlowEditor } from './flow-editor';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <FlowEditor
                id="FlowEditor"
                items={ItemsLogical.map(item => ({ ...item/* , id: Utils.getUUID() */ }))}
                showToolbar={true}
                toolItems={ToolItems}
                onDropItem={(oldId, newId, item) => { console.log(oldId, newId, item); return {...item, isEnabledNewConnetion:true}; }}
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
                // onContextMenu={console.log}
                // onMouseEnter={console.log}
                // onMouseLeave={console.log}
                // onChange={console.log}
                configs={{
                    // disableSelection: true,
                    flowItemWarningColor: 'var(--main-warning-color)',
                    flowItemSelectedColor: 'var(--color-botton-bar)',
                    flowItemErrorColor: 'var(--main-error-color)',
                    typesAllowedToDrop: AllowedsInDrop,
                    commentTextColor: '#fff000',

                    // linesColor: '',
                    // commentColor: '',
                    // disableOpacity: 0.5,
                    // disableSelection: true,
                    // typesAllowedToDrop: [],
                    // flowItemTextColor: 'white',
                    // snapGridWhileDragging: true,

                    // toolbarBackgroundColor:'darkred',
                    // toolbarBorderColor:'yellow',
                    // toolbarItemWidth:100,

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
