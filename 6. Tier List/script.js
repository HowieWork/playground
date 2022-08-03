'use strict';
// 1. Drag related events: 'dragstart'; 'drop' & 'dragover'
// 2. Double click: 'dblclick'
let draggedItem;

document.querySelectorAll('.item').forEach(setUpItem);
document.querySelectorAll('.drop-zone').forEach(setUpDropZone);

// DRAGGABLE ITEM
function setUpItem(item) {
  item.addEventListener('dragstart', onDragStartItem);
  item.addEventListener('dblclick', onDoubleClickItem);
}

function onDragStartItem(event) {
  draggedItem = event.target;
}

function onDoubleClickItem() {
  const unrankedDropZone = document.getElementById('unranked-drop-zone');
  if (this.parentNode !== unrankedDropZone) {
    unrankedDropZone.appendChild(this);
  }
}

// DROPZONE
function setUpDropZone(dropZone) {
  dropZone.addEventListener('drop', onDropOverDropZone);
  // IMPORTANT
  dropZone.addEventListener('dragover', onDragOverDropZone);
}

function onDropOverDropZone() {
  if (this !== draggedItem.parentNode) {
    this.appendChild(draggedItem);
  }
}

function onDragOverDropZone(event) {
  // IMPORTANT prevent default to allow drop
  event.preventDefault();
}
