import React from 'react';

import { ItemType, ItemFluxo, FlowItem } from './code-editor/models/ItemFluxo';
import { FlowEditor } from './code-editor/CodeEditor';
import './App.scss';


const itens: FlowItem[] = [
  new FlowItem({ id: '1', sucessor: ['2'], top: 100, left: 80, width: 50, height: 50, isSelected: false, name: "START", itemType: ItemType.START }),
  new FlowItem({ id: '2', sucessor: ['3', '0'], top: 200, left: 80, width: 50, height: 50, isSelected: false, name: "IF", itemType: ItemType.IF }),
  new FlowItem({ id: '3', sucessor: ['4'], top: 300, left: 80, width: 50, height: 50, isSelected: false, name: "FOREACH", itemType: ItemType.FOREACH }),
  new FlowItem({ id: '4', sucessor: ['5'], top: 400, left: 80, width: 50, height: 50, isSelected: false, name: "ACTION", itemType: ItemType.ACTION }),
  new FlowItem({ id: '5', sucessor: ['6'], top: 500, left: 80, width: 50, height: 50, isSelected: false, name: "SWITCH", itemType: ItemType.SWITCH }),
  new FlowItem({ id: '6', sucessor: ['7'], top: 600, left: 80, width: 50, height: 50, isSelected: false, name: "ASSIGN", itemType: ItemType.ASSIGN }),
  new FlowItem({ id: '7', sucessor: ['0'], top: 700, left: 80, width: 50, height: 50, isSelected: false, name: "END", itemType: ItemType.END }),
];
const itensLogica: FlowItem[] = [
  new FlowItem({ id: '1', sucessor: ['0'], top: 0, left: 0, width: 0, height: 0, isSelected: false, name: "START", itemType: ItemType.START }),
  new FlowItem({ id: '2', sucessor: ['0'], top: 0, left: 0, width: 0, height: 0, isSelected: false, name: "ACTION", itemType: ItemType.ACTION }),
  new FlowItem({ id: '3', sucessor: ['0', '0'], top: 0, left: 0, width: 0, height: 0, isSelected: false, name: "IF", itemType: ItemType.IF }),
  new FlowItem({ id: '4', sucessor: ['0'], top: 0, left: 0, width: 0, height: 0, isSelected: false, name: "FOREACH", itemType: ItemType.FOREACH }),
  new FlowItem({ id: '6', sucessor: ['0'], top: 0, left: 0, width: 0, height: 0, isSelected: false, name: "SWITCH", itemType: ItemType.SWITCH }),
  new FlowItem({ id: '7', sucessor: ['0'], top: 0, left: 0, width: 0, height: 0, isSelected: false, name: "ASSIGN", itemType: ItemType.ASSIGN }),
  new FlowItem({ id: '8', sucessor: ['0'], top: 0, left: 0, width: 0, height: 0, isSelected: false, name: "END", itemType: ItemType.END }),
];

const outItens = (itens: ItemFluxo[]) => {
  console.log(itens);
}

const App: React.FC = () => {
  return (
    <div className="App">
      <FlowEditor
        itens={itens}
        allowDropTo={[]}
        isShowToolbar={true}
        toolItens={itensLogica}
        onChangeItens={outItens}
        onContextMenu={(data, e) => {
          console.log(data);
          console.log(e);
        }}
        onDropItem={(oldItemId: string, newItemId: string, newItem: FlowItem) => {

          console.log(oldItemId);
          console.log(newItemId);
          console.log(newItem);

          return newItem;
        }}
      />
    </div>
  );
}

export default App;
