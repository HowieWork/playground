'use strict';
// Thinking process
// 1. Deal with these buttons DOM manipulation: enabling and disabling the button at the correct times
// 1.1 Hooking up these three buttons: getElementById + addEventListener
// 1.2 Implement event callback functions

// 2. Track the amount of time has elapsed
// 2.1 Convert time to the right format: Intervals / Request animation frame???

/*
How to track time? 
lastTimerStartTime --> elapsedTimeBeforeLastStart --> ...
*/

// RELATIVE DOM ELEMENTS
const timer = document.getElementById('timer');
const startBtn = document.getElementById('start-button');
const stopBtn = document.getElementById('stop-button');
const resetBtn = document.getElementById('reset-button');

// TIMER VARIABLES
let lastTimerStartTime = 0;
let elapsedTimeBeforeLastStart = 0;
let timerID;

startBtn.addEventListener('click', startBtnHandler);
stopBtn.addEventListener('click', stopBtnHandler);
resetBtn.addEventListener('click', resetBtnHandler);

// NOTE BUTTON HANDLERS
function startBtnHandler() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  resetBtn.disabled = true;

  lastTimerStartTime = Date.now();

  updateTimer();
}

function stopBtnHandler() {
  stopBtn.disabled = true;
  startBtn.disabled = false;
  resetBtn.disabled = false;

  elapsedTimeBeforeLastStart += Date.now() - lastTimerStartTime;

  cancelAnimationFrame(timerID);
}

function resetBtnHandler() {
  resetBtn.disabled = true;

  timer.textContent = '00:00:000';

  lastTimerStartTime = 0;
  elapsedTimeBeforeLastStart = 0;
}

// NOTE TIMER FUNCTIONS
function updateTimer() {
  const elapsedTimeInMilliSeconds =
    Date.now() - lastTimerStartTime + elapsedTimeBeforeLastStart;
  const elapsedTimeInSeconds = elapsedTimeInMilliSeconds / 1000;
  const elapsedTimeInMinutes = elapsedTimeInSeconds / 60;

  const milliSecondsText = formatNumber(elapsedTimeInMilliSeconds % 1000, 3);
  const secondsText = formatNumber(Math.floor(elapsedTimeInSeconds % 60), 2);
  const minutesText = formatNumber(Math.floor(elapsedTimeInMinutes % 60), 2);

  timer.textContent = `${minutesText}:${secondsText}:${milliSecondsText}`;

  timerID = requestAnimationFrame(updateTimer);
}

// NOTE HELPERS
function formatNumber(number, desiredLength) {
  const numberInString = String(number);
  if (numberInString.length > desiredLength)
    return numberInString.slice(0, desiredLength);
  return numberInString.padStart(desiredLength, '0');
}
