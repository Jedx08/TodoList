let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

filteredStatus();
statusFilter();

function todoHTML(filtered) {
  let listHTML = '';

  filtered.forEach(listItem => {
    listHTML += `
    <div class="transition duration-200 todo-id-${listItem.todoId} todo-status-${listItem.status}" data-todo-status="${filtered}">
      <div class="m-auto mt-1 relative top-1/3 list-none w-80 bg-white p-2 text-lg flex justify-between ">
        <li class="js-list">${listItem.todo}</li>
        <div >
          <button class="hover:bg-green-500 hover:text-white text-black transition duration-200 w-7 rounded-3xl js-done todo-item-status-${listItem.status}" data-todo-id="${listItem.todoId}"><i class="fa-solid fa-check"></i></button>
          <button class="w-7 hover:text-red-500 transition duration-200 active:duration-200 js-delete" data-todo-id="${listItem.todoId}"><i class="fa-solid fa-trash"></i></button>
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
    deletingAllCondition();
  });
}


input.addEventListener('keydown', () => {
  if ( event.key === "Enter") {
    todoPush();
    deleteTodo();
    markDone();
    deletingAllCondition();
  }
});

addTodo();
deleteTodo();
markDone();
deletingAllCondition();

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
      deletingAllCondition();
      todoHTML(todoList);
      break
    case 'completed':
      filtering('completed');
      todoHTML(filtered);
      markDone();
      deleteTodo();
      document.querySelector('.js-delete-all-container').innerHTML = '';
      todoHTML(filtered);
      break
    case 'uncompleted':
      filtering('uncompleted');
      todoHTML(filtered);
      markDone();
      deleteTodo();
      document.querySelector('.js-delete-all-container').innerHTML = '';
      todoHTML(filtered);
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
    document.querySelector('.js-input-empty').innerHTML = 'please input something';
  } else {
    document.querySelector('.js-input-empty').innerHTML = '';
    todoList.push({
      todoId: randomId(),
      status: 'uncompleted',
      todo: inputValue()
    });
  }
  
  input.value = '';
  saveToStorage();
  filteredStatus();
  markDone();
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
      removeTodo(todoId);
      filteredStatus();
      deletingAllCondition();
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

function deletingAll() {

  const deleteAllButton = document.querySelector('.js-delete-all-container');

  deleteAllButton.innerHTML = `<button class="js-delete-all p-2 bg-red-700 transition duration-150 text-white font-medium">Delete All</button>`;

  document.querySelector('.js-delete-all')
    .addEventListener('click', () => {
      deleteAll();

      deleteAllButton.innerHTML = '';
    })

  saveToStorage();
}

function deleteAll() {
  todoList = [];
  filteredStatus();
  saveToStorage();
}

function deletingAllCondition() {
  if (todoList.length !== 0) {
    deletingAll();
  } else {
    document.querySelector('.js-delete-all-container').innerHTML = '';
  }
}