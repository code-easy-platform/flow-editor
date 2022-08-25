export const FlowEditorBoardCss = `
:root {
  --color-panel-paper: #484848;
  --color-panel-default: #1e1e1e;
  --color-panel-dot: #1e1e1e;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: block;
}

.panel-wrapper {
  z-index: 0;
  width: 100vw;
  height: 100vh;
  display: block;
  position: fixed;
  overflow: hidden;
  background-image: radial-gradient(var(--color-panel-dot) 5%, var(--color-panel-default) 5%);
}

.panel {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: auto;
  position: fixed;
  background-color: transparent;
}



/* Ajusta o scroll de todos os elementos. */

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-corner {
  background-color: transparent;
}

::-webkit-scrollbar:horizontal {
  height: 16px;
}

::-webkit-scrollbar-button {
  display: none;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: var(--color-panel-paper);
}
`;
