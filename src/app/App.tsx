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
                // onMouseEnter={console.log}
                // onMouseLeave={console.log}
                onChangeItems={console.log}
                onContextMenu={console.log}
                onFocus={console.log}
                items={ItemsLogical.map(item => ({ ...item }))}
                onDropItem={(oldId, newId, item) => { console.log(oldId, newId, item); return { ...item, isEnabledNewConnetion: true }; }}
                breadcrumbs={[
                    { label: 'Routes', onClick: console.log, disabled: true },
                    { label: 'authenticate', onClick: console.log },
                    /* { label: 'authenticate2', onClick: console.log },
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
                    { label: 'authenticate14', onClick: console.log }, */
                ]}
                configs={{

                    /** FLOW ITEMS */
                    flowItemWarningColor: 'var(--main-warning-color)',
                    flowItemSelectedColor: 'var(--color-botton-bar)',
                    flowItemErrorColor: 'var(--main-error-color)',
                    commentTextColor: '#ffffff',
                    // flowItemTextColor: 'white',
                    // disableOpacity: 0.5,
                    // commentColor: '',
                    // linesColor: '',
                    lineWidth: 1,

                    /** EDITOR */
                    typesAllowedToDrop: AllowedsInDrop,
                    // snapGridWhileDragging: true,
                    // backgroundColor: '#ffffff',
                    // elevationColor: '#d2d2d2',
                    backgroundType: "dotted",
                    // useElevation: true,
                    // dotColor: 'black',
                    dottedSize: 15,

                    /** BREADCRUMB */
                    // breadcrumbBackgroundColor:'#d2d2d2',
                    // breadcrumbBorderColor: '#a7a7a7',
                    // breadcrumbTextColor: '#a8a8a8',

                    /** TOOLBAR */
                    // toolbarBackgroundColor:'#d2d2d2',
                    // toolbarBorderColor:'#a7a7a7',
                    // toolbarItemWidth:100,
                    showToolbar: true,

                    /** SELECTION */
                    selectionBorderColor: 'var(--color-botton-bar)',
                    selectionBackgroundColor: '#ffffff11',
                    // selectionBorderType: 'dash',
                    // selectionBorderWidth: 1,
                    // disableSelection: true,
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
