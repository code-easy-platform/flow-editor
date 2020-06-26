import React from 'react';

import { ItemType } from './code-editor/shared/enums/ItemType';
import { FlowItem } from './code-editor/models/ItemFluxo';
import { FlowEditor } from './code-editor/CodeEditor';
import './App.css';

const items: FlowItem[] = [
    new FlowItem({ id: '1', connections: [{ connectionId: '2' }], isDisabled:true, top: 105, left: 90, name: "START", itemType: ItemType.START }),
    new FlowItem({ id: '2', connections: [{ connectionId: '3', connectionLabel: 'True' }, { connectionId: '0' }], top: 210, left: 90, name: "IF", itemType: ItemType.IF }),
    new FlowItem({ id: '3', connections: [{ connectionId: '4', connectionLabel: 'Circle' }, { connectionId: '5' }], top: 370, left: 90, name: "FOREACH", itemType: ItemType.FOREACH }),
    new FlowItem({ id: '4', connections: [{ connectionId: '3' }], top: 370, left: 280, name: "ACTION", itemType: ItemType.ACTION }),
    new FlowItem({ id: '5', connections: [{ connectionId: '6' }], top: 525, left: 90, name: "SWITCH", itemType: ItemType.SWITCH }),
    new FlowItem({ id: '6', connections: [{ connectionId: '7' }], top: 630, left: 90, name: "ASSIGN", itemType: ItemType.ASSIGN }),
    new FlowItem({ id: '7', connections: [{ connectionId: '0' }], top: 735, left: 90, name: "END", itemType: ItemType.END }),
    new FlowItem({ id: '8', connections: [{ connectionId: '0' }], top: 105, left: 200, name: `COMMENT`, itemType: ItemType.COMMENT }),
];
const itemsLogica: FlowItem[] = [
    new FlowItem({ id: '1', name: "START", itemType: ItemType.START }),
    new FlowItem({ id: '2', name: "ACTION", itemType: ItemType.ACTION }),
    new FlowItem({ id: '3', name: "IF", itemType: ItemType.IF }),
    new FlowItem({ id: '4', name: "FOREACH", itemType: ItemType.FOREACH }),
    new FlowItem({ id: '6', name: "SWITCH", itemType: ItemType.SWITCH }),
    new FlowItem({ id: '7', name: "ASSIGN", itemType: ItemType.ASSIGN }),
    new FlowItem({ id: '8', name: "END", itemType: ItemType.END }),
    new FlowItem({ id: '9', name: "COMMENT", itemType: ItemType.COMMENT }),
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
                    { label: 'authenticate', onClick: console.log },
                ]}
            />
        </div>
    );
}

export default App;
