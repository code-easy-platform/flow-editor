export const DraggableContainerCss = `
.draggableContainer {
  top: 0;
  left: 0;
  z-index:1;
  cursor: move;
  display: flex;
  user-select: none;
  position: absolute;
  flex-direction: column;
}

.draggableContainerContent {
  flex: 1;
  display: flex;
  overflow: auto;
  flex-direction: column;
}

.draggableContainerContent::-webkit-scrollbar:horizontal {
  height: 8px;
}

.draggableContainerInput {
  width: 10px;
  left: -17px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  border: 2px solid green;
  background-color: green;
}

.draggableContainerOutput {
  width: 10px;
  right: -17px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  border: 2px solid crimson;
  background-color: darkslategray;
}
`;
