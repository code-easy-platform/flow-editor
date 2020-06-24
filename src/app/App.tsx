import React from 'react';

import { ItemType, FlowItem } from './code-editor/models/ItemFluxo';
import { FlowEditor } from './code-editor/CodeEditor';
import './App.css';


const itens: FlowItem[] = [
    new FlowItem({ id: '1', connections: [{ conectionId: '2' }], top: 105, left: 90, name: "START", itemType: ItemType.START }),
    new FlowItem({ id: '2', connections: [{ conectionId: '3', connectionLabel: 'True' }, { conectionId: '0' }], top: 210, left: 90, name: "IF", itemType: ItemType.IF }),
    new FlowItem({ id: '3', connections: [{ conectionId: '4', connectionLabel: 'Circle' }, { conectionId: '5' }], top: 370, left: 90, name: "FOREACH", itemType: ItemType.FOREACH }),
    new FlowItem({ id: '4', connections: [{ conectionId: '3' }], top: 370, left: 280, name: "ACTION", itemType: ItemType.ACTION }),
    new FlowItem({ id: '5', connections: [{ conectionId: '6' }], top: 525, left: 90, name: "SWITCH", itemType: ItemType.SWITCH }),
    new FlowItem({ id: '6', connections: [{ conectionId: '7' }], top: 630, left: 90, name: "ASSIGN", itemType: ItemType.ASSIGN }),
    new FlowItem({ id: '7', connections: [{ conectionId: '0' }], top: 735, left: 90, name: "END", itemType: ItemType.END }),
    new FlowItem({ id: '8', connections: [{ conectionId: '0' }], top: 105, left: 200, name: `COMMENT`, itemType: ItemType.COMMENT }),
];
const itensLogica: FlowItem[] = [
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
                itens={itens}
                id={"FLOW_EDITOR"}
                showToolbar={true}
                allowedsInDrop={[]}
                key={"FLOW_EDITOR"}
                toolItens={itensLogica}
                //enabledSelection={false}
                onChangeItens={console.log}
                // onMouseOver={console.log}
                emptyMessage={"Drag an item on this panel to start"}
                breadcrumbs={[
                    {
                        label: 'Routes',
                        onClick: console.log,
                    },
                    {
                        label: 'authenticate',
                        onClick: console.log,
                    }
                ]}
            />
        </div>
    );
}

export default App;
