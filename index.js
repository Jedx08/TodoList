let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

statusFilter();

function todoHTML(filtered) {
  let listHTML = '';

  filtered.forEach(listItem => {
    listHTML += `
    <div class="todo-id-${listItem.todoId}" data-todo-status="${filtered}">
      <div class="m-auto mt-1 relative top-1/3 list-none w-80 bg-white p-2 text-lg flex justify-between ">
        <li class="js-list">${listItem.todo}</li>
        <div>
          <button class="js-done" data-todo-id="${listItem.todoId}">mark</button>
          <button class="js-delete" data-todo-id="${listItem.todoId}">delete</button>
        </div>
      </div>
    </div>
    `;
  });
  
  document.querySelector('.js-html').innerHTML = listHTML;
}

const input = document.querySelector('.js-input');
const list = document.querySelector('.js-list');
const addButton = document.querySelector('.js-add-button');

function addTodo() {
  addButton.addEventListener('click', () => {
    todoPush();
    deleteTodo();
    markDone();
  });
}


input.addEventListener('keydown', () => {
  if ( event.key === "Enter") {
    todoPush();
    deleteTodo();
    markDone()
  }
});


addTodo();
deleteTodo();
markDone();


// functions

function statusFilter() {
  document.querySelector('.js-status')
  .addEventListener('click', () => {
    filteredStatus();
  });

  todoHTML(todoList);
}

function filteredStatus() {
  let statusValue = document.querySelector('.js-status').value;

  switch (statusValue) {
    case 'All':
      todoHTML(todoList);
      markDone();
      deleteTodo();
      break
    case 'completed':
      filtering('completed');
      todoHTML(filtered);
      markDone();
      deleteTodo();
      break
    case 'uncompleted':
      filtering('uncompleted');
      todoHTML(filtered);
      markDone();
      deleteTodo();
      break
  }
}

function inputValue() {
  let values = input.value;

  return values;
}

function todoPush() {
  inputValue();

  if ( inputValue() === '') {
    alert('please input somedick');
  } else {
    todoList.push({
      todoId: randomId(),
      status: 'uncompleted',
      todo: inputValue()
    });
  }
  
  input.value = '';
  saveToStorage();
  filteredStatus();
}

function removeTodo(todoId) {
  const newTodoList = [];

  todoList.forEach((todoItem) => {
    if ( todoItem.todoId !== todoId ) {
      newTodoList.push(todoItem);
    }
  });
  todoList = newTodoList;
  saveToStorage();
 }

 function deleteTodo() {
  document.querySelectorAll('.js-delete')
  .forEach((button) => {
    button.addEventListener('click', () => {
      todoId = Number(button.dataset.todoId);
      removeTodo(todoId)
      const container = document.querySelector(`.todo-id-${todoId}`);
      container.remove();
    });
  });
}

function randomId() {
  const random = Math.floor(Math.random() * 1000000);
  const random2 = Number(random);

  return random2;
}


function markDone() {
  document.querySelectorAll('.js-done')
  .forEach((button) => {
    button.addEventListener('click', () => {
      todoId = Number(button.dataset.todoId);

      let newStatus = [];

      todoList.forEach((todoItem) => {
        if ( todoItem.todoId === todoId ) {
          newStatus = todoItem;
        }
      });

      if ( newStatus.status === 'uncompleted' ) {
        newStatus.status = 'completed';
        saveToStorage();
        filteredStatus();
      } else {
        newStatus.status = 'uncompleted';
        saveToStorage();
        filteredStatus();
      }
    });
  });
}

function filtering(status) {

  let filter = [];

  todoList.forEach((todoItem) => {
    if ( todoItem.status === status) {
      filter.push(todoItem);
    }
  });

  return filtered = filter;
}