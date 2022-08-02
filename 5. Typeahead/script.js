'use strict';
/*
1. Whenever user starts to type in, once user stops type in for 500 ms, send a request *IMPORTANT THIS IS A COMMON PATTERN - DEBOUNCE
*/

const BASE_URL = 'https://www.algoexpert.io/api/fe/glossary-suggestions';

const input = document.getElementById('typeahead');
const suggestionList = document.getElementById('suggestions-list');

let timerID;

input.addEventListener('input', onType);

function onType() {
  if (input.value.length === 0) {
    clearSuggestions();
    return;
  }

  clearTimeout(timerID);
  timerID = setTimeout(fetchAndAppendSuggestions, 500);
}

function fetchAndAppendSuggestions() {
  const url = createFetchURL();

  fetch(url)
    .then(res => res.json())
    .then(suggestions => {
      const fragment = document.createDocumentFragment();
      suggestions.forEach(suggestion => {
        const suggestionElement = createSuggestionElement(suggestion);
        fragment.appendChild(suggestionElement);
      });
      suggestionList.replaceChildren(fragment);
    })
    .catch(console.error);
}

function createFetchURL() {
  const url = new URL(BASE_URL);
  url.searchParams.set('text', input.value);
  return url;
}

function createSuggestionElement(suggestion) {
  const suggestionElement = document.createElement('li');
  suggestionElement.textContent = suggestion;
  suggestionElement.addEventListener('click', replaceInputValue);
  return suggestionElement;
}

function replaceInputValue() {
  input.value = this.textContent;
  clearSuggestions();
}

function clearSuggestions() {
  clearTimeout(timerID);
  suggestionList.innerHTML = '';
}
