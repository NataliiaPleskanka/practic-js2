// Створи перелік справ.
// Є інпут, який вводиться назва завдання.
// Після натискання на кнопку "Додати" завдання додається до списку #list.
// Поруч із кожним завданням знаходиться кнопка "Видалити", щоб можна було
// Забрати завдання зі списку.
// Список із завданнями має бути доступним після перезавантаження сторінки.

const todoForm = document.querySelector('#task-form');
const todoList = document.querySelector('#task-list');
const todoes = [];

function handleTodoSubmit(event) {
  event.preventDefault();

  const taskNameValue = todoForm.elements.taskName.value.trim();

  if (taskNameValue === '') {
    return;
  }
  todoes.push(taskNameValue);
  todoList.innerHTML = '';
  renderTodoes();
  todoForm.reset();
}
function renderTodoes() {
  let markup = '';
  todoes.forEach(todo => (markup += `<li>${todo}</li>`));
  todoList.insertAdjacentHTML('beforeend', markup);
}
todoForm.addEventListener('submit', handleTodoSubmit);
