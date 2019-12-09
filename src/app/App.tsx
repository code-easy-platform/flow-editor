import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { CodeEditor } from './code-editor/CodeEditor';
import './App.scss';
import { ItemType } from './code-editor/interfaces/ItemFluxo';


const itens: any[] = [
    { id: 1, sucessorId: 2, top: 100, left: 80, width: 50, height: 50, isSelecionado: false, nome: "START",   itemType: ItemType.START  },
    { id: 8, sucessorId: 2, top: 100, left: 200, width: 50, height: 50, isSelecionado: false, nome: "ACTION",  itemType: ItemType.ACTION },
    { id: 2, sucessorId: 3, top: 200, left: 80, width: 50, height: 50, isSelecionado: false, nome: "IF",      itemType: ItemType.IF     },
    { id: 3, sucessorId: 4, top: 300, left: 80, width: 50, height: 50, isSelecionado: false, nome: "FOREACH", itemType: ItemType.ASSIGN },
    { id: 4, sucessorId: 5, top: 400, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ACTION",  itemType: ItemType.ASSIGN },
    { id: 5, sucessorId: 6, top: 500, left: 80, width: 50, height: 50, isSelecionado: false, nome: "SWICTH",  itemType: ItemType.ASSIGN },
    { id: 6, sucessorId: 7, top: 600, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ASSIGN",  itemType: ItemType.ASSIGN },
    { id: 7, sucessorId: 0, top: 800, left: 80, width: 50, height: 50, isSelecionado: false, nome: "END",     itemType: ItemType.END    },
];
const itensLogica: any[] = [
    { id: 1, sucessorId: 2, top: 100, left: 80, width: 50, height: 50, isSelecionado: false, nome: "START",   itemType: ItemType.START  },
    { id: 8, sucessorId: 2, top: 100, left: 200, width: 50, height: 50, isSelecionado: false, nome: "ACTION",  itemType: ItemType.ACTION },
    { id: 2, sucessorId: 3, top: 200, left: 80, width: 50, height: 50, isSelecionado: false, nome: "IF",      itemType: ItemType.IF     },
    { id: 3, sucessorId: 4, top: 300, left: 80, width: 50, height: 50, isSelecionado: false, nome: "FOREACH", itemType: ItemType.ASSIGN },
    { id: 4, sucessorId: 5, top: 400, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ACTION",  itemType: ItemType.ASSIGN },
    { id: 5, sucessorId: 6, top: 500, left: 80, width: 50, height: 50, isSelecionado: false, nome: "SWICTH",  itemType: ItemType.ASSIGN },
    { id: 6, sucessorId: 7, top: 600, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ASSIGN",  itemType: ItemType.ASSIGN },
    { id: 7, sucessorId: 8, top: 700, left: 80, width: 50, height: 50, isSelecionado: false, nome: "END",     itemType: ItemType.END    },
];


const App: React.FC = () => {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <CodeEditor itens={itens} toolItens={itensLogica} />
      </DndProvider>
    </div>
  );
}

export default App;
