import React from 'react';

import { ItemType, FlowItem } from './code-editor/models/ItemFluxo';
import { FlowEditor } from './code-editor/CodeEditor';
import './App.css';


const itens: FlowItem[] = [
    new FlowItem({ id: '1', sucessor: ['2'], top: 100, left: 80, name: "START", itemType: ItemType.START }),
    new FlowItem({ id: '2', sucessor: ['3', '0'], top: 200, left: 80, name: "IF", itemType: ItemType.IF }),
    new FlowItem({ id: '3', sucessor: ['4'], top: 300, left: 80, name: "FOREACH", itemType: ItemType.FOREACH }),
    new FlowItem({ id: '4', sucessor: ['5'], top: 400, left: 80, name: "ACTION", itemType: ItemType.ACTION }),
    new FlowItem({ id: '5', sucessor: ['6'], top: 500, left: 80, name: "SWITCH", itemType: ItemType.SWITCH }),
    new FlowItem({ id: '6', sucessor: ['7'], top: 600, left: 80, name: "ASSIGN", hasError: true, itemType: ItemType.ASSIGN }),
    new FlowItem({ id: '7', sucessor: ['0'], top: 700, left: 80, name: "END", itemType: ItemType.END }),
    new FlowItem({ id: '8', sucessor: ['0'], top: 100, left: 200, name: `COMMENT`, itemType: ItemType.COMMENT }),
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
