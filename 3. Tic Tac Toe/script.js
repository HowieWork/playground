'use strict';
/*
problem -> sub-problems
STEP 1:
1. Click each game square: X -> player 1; O -> player 2
2. Remember record game square's location
3. Update h2

STEP 2:
1. Determine when the game ends: check click square causes the player win the game
(1) Assume didPlayerWin

STEP 3 *END GAME PHASE
1. Show restart button
2. Click restart button --> Reset the board
*/
const BOARD_WIDTH = 3;

let boardState = generateEmptyBoardState();
let currentPlayer = 1;
let numMovesDone = 0;

const gameSquares = document.querySelectorAll('.game-square');
const gameHeading = document.getElementById('game-heading');
const restartBtn = document.getElementById('restart-button');

gameSquares.forEach((gameSquare, i) => {
  gameSquare.addEventListener('click', () => {
    const row = Math.floor(i / BOARD_WIDTH);
    const col = i % BOARD_WIDTH;
    makeMove(gameSquare, row, col);
  });
});

restartBtn.addEventListener('click', resetGame);

function makeMove(gameSquare, row, col) {
  gameSquare.textContent = currentPlayer === 1 ? 'X' : 'O';
  gameSquare.disabled = true;

  numMovesDone++;
  boardState[row][col] = currentPlayer;

  if (didPlayerWin(currentPlayer)) {
    gameHeading.textContent = `Player ${currentPlayer} Won!`;
    endGame();
  } else if (numMovesDone >= BOARD_WIDTH ** 2) {
    gameHeading.textContent = 'Tie Game!';
    endGame();
  } else {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    setCurrentPlayerHeader();
  }
}

function didPlayerWin(currentPlayer) {
  const rows = createRowsOrCols(BOARD_WIDTH);
  const cols = createRowsOrCols(BOARD_WIDTH);

  const wonHorizontal = rows.some(row => {
    return (
      boardState[row][0] === currentPlayer &&
      boardState[row][1] === currentPlayer &&
      boardState[row][2] === currentPlayer
    );
  });

  const wonVertical = cols.some(col => {
    return (
      boardState[0][col] === currentPlayer &&
      boardState[1][col] === currentPlayer &&
      boardState[2][col] === currentPlayer
    );
  });

  const wonTopLeftToBottomRight =
    boardState[0][0] === currentPlayer &&
    boardState[1][1] === currentPlayer &&
    boardState[2][2] === currentPlayer;

  const wonTopRightToBottomLeft =
    boardState[0][2] === currentPlayer &&
    boardState[1][1] === currentPlayer &&
    boardState[2][0] === currentPlayer;

  return (
    wonHorizontal ||
    wonVertical ||
    wonTopLeftToBottomRight ||
    wonTopRightToBottomLeft
  );
}

function endGame() {
  restartBtn.style.display = 'block';
  gameSquares.forEach(gameSquare => {
    gameSquare.disabled = true;
  });
}

function resetGame() {
  boardState = generateEmptyBoardState();
  currentPlayer = 1;
  numMovesDone = 0;

  gameHeading.textContent = "Player 1's Turn";
  gameSquares.forEach(gameSquare => {
    gameSquare.disabled = false;
    gameSquare.textContent = '';
  });
  restartBtn.style.display = 'none';
}

// Helper
function setCurrentPlayerHeader() {
  gameHeading.textContent = `Player ${currentPlayer}'s Turn`;
}

function createRowsOrCols(boardWidth) {
  const rowsOrCols = [];
  for (let i = 0; i < boardWidth; i++) rowsOrCols.push(i);
  return rowsOrCols;
}

function generateEmptyBoardState() {
  return new Array(BOARD_WIDTH).fill().map(() => new Array(BOARD_WIDTH).fill());
}
