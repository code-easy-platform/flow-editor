import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { CodeEditor } from './code-editor/CodeEditor';
import './App.scss';
import { ItemType } from './code-editor/interfaces/ItemFluxo';


const itens: any[] = [
    { id: 1, sucessorId: 2, nome: "START", top: 100, left: 80, width: 50, height: 50, itemType: ItemType.START, isSelecionado: false },
    { id: 2, sucessorId: 3, nome: "IF", top: 200, left: 80, width: 50, height: 50, itemType: ItemType.IF, isSelecionado: false },
    { id: 3, sucessorId: 4, nome: "FOREACH", top: 300, left: 80, width: 50, height: 50, itemType: ItemType.ASSIGN, isSelecionado: false },
    { id: 4, sucessorId: 5, nome: "ACTION", top: 400, left: 80, width: 50, height: 50, itemType: ItemType.ASSIGN, isSelecionado: false },
    { id: 5, sucessorId: 6, nome: "SWICTH", top: 500, left: 80, width: 50, height: 50, itemType: ItemType.ASSIGN, isSelecionado: false },
    { id: 6, sucessorId: 7, nome: "ASSIGN", top: 600, left: 80, width: 50, height: 50, itemType: ItemType.ASSIGN, isSelecionado: false },
    { id: 7, sucessorId: 0, nome: "END", top: 800, left: 80, width: 50, height: 50, itemType: ItemType.END, isSelecionado: false },
];
const itensLogica: any[] = [
    { id: 1, sucessorId: 2, top: 100, left: 80, width: 50, height: 50, nome: "START", itemType: ItemType.START, isSelecionado: false },
    { id: 2, sucessorId: 3, top: 200, left: 80, width: 50, height: 50, nome: "IF", itemType: ItemType.IF, isSelecionado: false },
    { id: 3, sucessorId: 4, top: 300, left: 80, width: 50, height: 50, nome: "FOREACH", itemType: ItemType.ASSIGN, isSelecionado: false },
    { id: 4, sucessorId: 5, top: 400, left: 80, width: 50, height: 50, nome: "ACTION", itemType: ItemType.ASSIGN, isSelecionado: false },
    { id: 5, sucessorId: 6, top: 500, left: 80, width: 50, height: 50, nome: "SWICTH", itemType: ItemType.ASSIGN, isSelecionado: false },
    { id: 6, sucessorId: 7, top: 600, left: 80, width: 50, height: 50, nome: "ASSIGN", itemType: ItemType.ASSIGN, isSelecionado: false },
    { id: 7, sucessorId: 8, top: 700, left: 80, width: 50, height: 50, nome: "END", itemType: ItemType.END, isSelecionado: false },
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
