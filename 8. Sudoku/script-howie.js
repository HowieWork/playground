/*
1. Handle click on each cell
  1.1 Highlight
2. Handle click on number controls
  2.1 Normal move
  2.2 Candidate move
    (1) SORT before append!
    (2) Removed if click again

2nd Issues:
// 💥 Strictly un-equal
// 💥 How to mutate the original array?
// 💥 Deal with cur number
// 💥 Check whether an item exists in an array *-1
// 💥 candidates.push(curNumber).sort() -> ERROR
// 💥 checkbox type input checked: default is FALSE
*/
let curNumber = null;
let isNormal = true;

const emptyCells = document.querySelectorAll('td:not(.given-number)');
const numberControls = document.querySelectorAll('.number-control');
const moveSwitch = document.getElementById('candidate-switch');

emptyCells.forEach(emptyCell => {
  emptyCell.addEventListener('click', onClickEmptyCell);
});

numberControls.forEach(numberControl => {
  numberControl.addEventListener('click', onClickNumberControl);
});

moveSwitch.addEventListener('click', onClickSwitch);

function onClickEmptyCell(event) {
  emptyCells.forEach(emptyCell => {
    emptyCell.classList.remove('selected');
  });

  event.target.classList.add('selected');
}

function onClickNumberControl(event) {
  curNumber = parseInt(event.target.textContent);

  if (isNormal) {
    const selectedCellValue = document.querySelector(
      "td[class='selected'] span[class='value']"
    );
    selectedCellValue.textContent = curNumber;
  } else {
    const selectedCellCandidate = document.querySelector(
      "td[class='selected'] span[class='candidates']"
    );

    let candidates = null;

    if (selectedCellCandidate.textContent == null) {
      candidates = [];
    }

    candidates = selectedCellCandidate.textContent.split('');

    // 💥 Strictly un-equal
    if (candidates.length !== 0) {
      // 💥 How to mutate the original array?
      candidates.forEach(candidate => {
        candidates[candidates.indexOf(candidate)] = parseInt(candidate);
      });
    }

    // 💥 Deal with cur number
    const curNumberIdx = candidates.indexOf(curNumber);
    // 💥 Check whether an item exists in an array
    if (curNumberIdx === -1) {
      candidates.push(curNumber);
      // 💥 candidates.push(curNumber).sort() -> ERROR
      candidates.sort();
    } else {
      candidates.splice(curNumberIdx, 1);
    }

    selectedCellCandidate.textContent = candidates.join('');
  }
}

// 💥 checkbox type input checked: default is FALSE
function onClickSwitch(event) {
  isNormal = !event.target.checked;
}
