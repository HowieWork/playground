'use strict';
/*
1. Handle cell
  1.1 Select normal cells
  1.2 Selected ? ...
2. Handle control number
  2.1 is any cell selected ?
  2.2 is Candidate move ?
*/

const normalCells = document.querySelectorAll('td').forEach(cell => {
  if (!cell.classList.contains('given-number')) {
    cell.addEventListener('click', onClickNormalCell);
  }
});

const numberControls = document
  .querySelectorAll('.number-control')
  .forEach(numberControl => {
    numberControl.addEventListener('click', onClickNumberControl);
  });

function onClickNormalCell(event) {
  document
    .querySelectorAll('td')
    .forEach(cell => cell.classList.remove('selected'));
  event.target.classList.add('selected');
}

function onClickNumberControl(event) {
  const selectedCell = document.getElementsByClassName('selected');
  const numberControl = event.target.textContent;

  if (!selectedCell.length) return;

  const isNormalMove = !document.getElementById('candidate-switch').checked;
  if (isNormalMove) {
    document.querySelector('.selected > .value').textContent = numberControl;
  } else {
    // CANDIDATE MODE
    const selectedCellCandidates = document.querySelector(
      '.selected > .candidates'
    );
    const candidatesArray = selectedCellCandidates.textContent.split('');
    const numberControlIdx = candidatesArray.indexOf(numberControl);

    if (numberControlIdx === -1) {
      candidatesArray.push(numberControl);
    } else {
      candidatesArray.splice(numberControlIdx, 1);
    }

    selectedCellCandidates.textContent = candidatesArray.sort().join('');
  }
}
