import React from 'react';

import { ItemType } from './code-editor/shared/enums/ItemType';
import { FlowItem } from './code-editor/models/ItemFluxo';
import { FlowEditor } from './code-editor/CodeEditor';
import './App.css';

const items: FlowItem[] = [
    new FlowItem({ hasWarning: false, id: '1', connections: [{ id: '0', connectionId: '2' }], isDisabled: true, top: 105, left: 90, name: "START", itemType: ItemType.START }),
    new FlowItem({ hasWarning: false, id: '2', connections: [{ id: '1', connectionId: '3', connectionLabel: 'True' }, { id: '8', connectionId: '0' }], top: 210, left: 90, name: "IF", itemType: ItemType.IF }),
    new FlowItem({ hasWarning: false, id: '3', connections: [{ id: '2', connectionId: '4', connectionLabel: 'Circle' }, { id: '9', connectionId: '5' }], top: 370, left: 90, name: "FOREACH", itemType: ItemType.FOREACH }),
    new FlowItem({ hasWarning: false, id: '4', connections: [{ id: '3', connectionId: '3' }], top: 370, left: 280, name: "ACTION", itemType: ItemType.ACTION }),
    new FlowItem({ hasWarning: false, id: '5', connections: [{ id: '4', connectionId: '6' }], top: 525, left: 90, name: "SWITCH", itemType: ItemType.SWITCH }),
    new FlowItem({ hasWarning: true, id: '6', connections: [{ id: '5', connectionId: '7' }], top: 630, left: 90, name: "ASSIGN", itemType: ItemType.ASSIGN }),
    new FlowItem({ hasWarning: false, id: '7', connections: [{ id: '6', connectionId: '0' }], top: 735, left: 90, name: "END", itemType: ItemType.END, hasError: true }),
    new FlowItem({ hasWarning: false, id: '8', connections: [{ id: '7', connectionId: '0' }], top: 105, left: 200, name: "COMMENT COMMENTCOMMENT \n xcvb cvb xc zxc zx cvxcv", itemType: ItemType.COMMENT }),
];
const itemsLogica: FlowItem[] = [
    new FlowItem({ hasWarning: false, id: '1', name: "START", itemType: ItemType.START }),
    new FlowItem({ hasWarning: false, id: '2', name: "ACTION", itemType: ItemType.ACTION }),
    new FlowItem({ hasWarning: false, id: '3', name: "IF", itemType: ItemType.IF }),
    new FlowItem({ hasWarning: false, id: '4', name: "FOREACH", itemType: ItemType.FOREACH }),
    new FlowItem({ hasWarning: false, id: '6', name: "SWITCH", itemType: ItemType.SWITCH }),
    new FlowItem({ hasWarning: false, id: '7', name: "ASSIGN", itemType: ItemType.ASSIGN }),
    new FlowItem({ hasWarning: false, id: '8', name: "END", itemType: ItemType.END }),
    new FlowItem({ hasWarning: false, id: '9', name: "COMMENT", itemType: ItemType.COMMENT }),
];

const App: React.FC = () => {
    return (
        <div className="App">
            <FlowEditor
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
            />
        </div>
    );
}

export default App;
