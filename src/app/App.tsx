import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { CodeEditor } from './code-editor/CodeEditor';
import './App.scss';
import { ItemType, ItemFluxo, FlowItem } from './code-editor/models/ItemFluxo';


const itens: FlowItem[] = [
  new FlowItem({ id: 1, sucessor: [2], top: 100, left: 80, width: 50, height: 50, isSelecionado: false, nome: "START",   itemType: ItemType.START   }),
  new FlowItem({ id: 2, sucessor: [3], top: 200, left: 80, width: 50, height: 50, isSelecionado: false, nome: "IF",      itemType: ItemType.IF      }),
  new FlowItem({ id: 3, sucessor: [4], top: 300, left: 80, width: 50, height: 50, isSelecionado: false, nome: "FOREACH", itemType: ItemType.FOREACH }),
  new FlowItem({ id: 4, sucessor: [5], top: 400, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ACTION",  itemType: ItemType.ACTION  }),
  new FlowItem({ id: 5, sucessor: [6], top: 500, left: 80, width: 50, height: 50, isSelecionado: false, nome: "SWITCH",  itemType: ItemType.SWITCH  }),
  new FlowItem({ id: 6, sucessor: [7], top: 600, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ASSIGN",  itemType: ItemType.ASSIGN  }),
  new FlowItem({ id: 7, sucessor: [0], top: 700, left: 80, width: 50, height: 50, isSelecionado: false, nome: "END",     itemType: ItemType.END     }),
];
const itensLogica: FlowItem[] = [
  new FlowItem({ id: 1, sucessor: [0], top: 0, left: 0, width: 0, height: 0, isSelecionado: false, nome: "START",   itemType: ItemType.START   }),
  new FlowItem({ id: 2, sucessor: [0], top: 0, left: 0, width: 0, height: 0, isSelecionado: false, nome: "ACTION",  itemType: ItemType.ACTION  }),
  new FlowItem({ id: 3, sucessor: [0], top: 0, left: 0, width: 0, height: 0, isSelecionado: false, nome: "IF",      itemType: ItemType.IF      }),
  new FlowItem({ id: 4, sucessor: [0], top: 0, left: 0, width: 0, height: 0, isSelecionado: false, nome: "FOREACH", itemType: ItemType.FOREACH }),
  new FlowItem({ id: 6, sucessor: [0], top: 0, left: 0, width: 0, height: 0, isSelecionado: false, nome: "SWITCH",  itemType: ItemType.SWITCH  }),
  new FlowItem({ id: 7, sucessor: [0], top: 0, left: 0, width: 0, height: 0, isSelecionado: false, nome: "ASSIGN",  itemType: ItemType.ASSIGN  }),
  new FlowItem({ id: 8, sucessor: [0], top: 0, left: 0, width: 0, height: 0, isSelecionado: false, nome: "END",     itemType: ItemType.END     }),
];

const outItens = (itens: ItemFluxo[]) => {
  console.log(itens);
}

const App: React.FC = () => {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <CodeEditor itens={itens} toolItens={itensLogica} onChangeItens={outItens} isShowToolbar={true} />
      </DndProvider>
    </div>
  );
}

export default App;
