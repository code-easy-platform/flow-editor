export const DraggableContainerCss = `
.draggable-container {
  top: 0;
  left: 0;
  z-index:1;
  cursor: move;
  display: flex;
  user-select: none;
  position: absolute;
  pointer-events: none;
  flex-direction: column;
  border: thin solid transparent;
}

.draggable-container-content {
  flex: 1;
  display: flex;
  border-radius: 4px;
  pointer-events: auto;
  flex-direction: column;
}

.draggable-container-content::-webkit-scrollbar:horizontal {
  height: 8px;
}

.draggable-container-input {
  width: 10px;
  left: -17px;
  height: 10px;
  cursor: crosshair;
  border-radius: 50%;
  position: absolute;
  pointer-events: auto;
  border: 2px solid green;
  background-color: darkgreen;
}
.draggable-container-input:hover {
  background-color: green;
}

.draggable-container-output {
  width: 10px;
  right: -17px;
  height: 10px;
  cursor: crosshair;
  border-radius: 50%;
  position: absolute;
  pointer-events: auto;
  transition: all .1s;
  border: 2px solid crimson;
  background-color: darkslategray;
}
.draggable-container-output:hover {
  background-color: crimson;
}

.draggable-container-input[data-is-line-dragging=true], .draggable-container-output[data-is-line-dragging=true] {
  border: 2px solid lightgreen;
}

.draggable-container-input[data-is-line-dragging=true]:hover, .draggable-container-output[data-is-line-dragging=true]:hover {
  background-color: lightgreen;
}
`;
