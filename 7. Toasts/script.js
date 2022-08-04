/*
1. Add toast
  1.1 Create toast (type, isCancelable, message)
  1.2 Prepend to toasts container
2. Duration
  2.1 setTimeout
*/
const toasts = document.getElementById('toasts');

document.getElementById('add-button').addEventListener('click', addToast);
document.getElementById('clear-button').addEventListener('click', clearToasts);

function addToast() {
  // !!! How to select input with 'name: type' and 'checked'
  const type = document.querySelector('input[name="type"]:checked').value;
  // !!! How to get checkbox wheather checked or NOT
  const isCancelable = document.getElementById('cancelable').checked;
  const message = document.getElementById('message-content').value;

  const toast = createToast(type, isCancelable, message);

  toasts.prepend(toast);
}

function clearToasts() {
  toasts.innerHTML = '';
}

function createToast(type, isCancelable, message) {
  const defaultMessage = type === 'success' ? 'Success!' : 'Error.';
  if (message.length === 0) message = defaultMessage;

  const toastContent = document.createElement('p');
  toastContent.classList.add('message');
  toastContent.textContent = message;

  const toast = document.createElement('div');
  toast.classList.add('toast', `${type}-toast`);
  toast.appendChild(toastContent);

  if (isCancelable) {
    const cancelBtn = createCancelBtn();
    toast.appendChild(cancelBtn);
  }

  const duration = parseInt(document.getElementById('duration').value);
  setTimeout(() => toast.remove(), duration > 500 ? duration : 500);

  return toast;
}

function createCancelBtn() {
  const cancelBtn = document.createElement('button');
  cancelBtn.classList.add('cancel-button');
  cancelBtn.textContent = 'X';

  cancelBtn.addEventListener('click', onClickCancelBtn);

  return cancelBtn;
}

function onClickCancelBtn(event) {
  event.target.parentNode.remove();
}
