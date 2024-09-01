const todoList = [
  {id: 1, task: 'Learn HTML', completed: true},
  {id: 2, task: 'Learn CSS', completed: true},
  {id: 3, task: 'Learn JS', completed: false},
  {id: 4, task: 'Learn TypeScript', completed: false},
  {id: 5, task: 'Learn React', completed: false},
];

const ulNode = document.querySelector('ul');
populateList();

function populateList() {
  ulNode.innerHTML = '';
  for (const todo of todoList) {
    const liNode = document.createElement('li');
    const inputNode = document.createElement('input');
    const labelNode = document.createElement('label');

    inputNode.type = 'checkbox';
    inputNode.id = `todo-${todo.id}`;
    inputNode.checked = todo.completed;

    inputNode.addEventListener('change', ev => {
      ev.preventDefault();
      todo.completed = ev.target.checked;
      console.log(todoList);
    });

    labelNode.htmlFor = `todo-${todo.id}`;
    labelNode.innerText = todo.task;

    const deleteButtonNode = document.createElement('button');
    deleteButtonNode.innerText = '🗑️';
    deleteButtonNode.addEventListener('click', ev => {
      ev.preventDefault();
      todoList.splice(todoList.indexOf(todo), 1);
      ulNode.removeChild(liNode);
    });

    liNode.append(inputNode, labelNode, deleteButtonNode);
    ulNode.append(liNode);
  }
}

const addButtonNode = document.querySelector('.add-btn');
const dialogNode = document.querySelector('dialog');
addButtonNode.addEventListener('click', ev => {
  ev.preventDefault();
  dialogNode.showModal();
});

const submitButton = document.querySelector('button[type="submit"]');
const inputTextNode = document.querySelector(
  'input[placeholder="Add todo item here"]'
);
submitButton.addEventListener('click', e => {
  e.preventDefault();
  const newTodoId =
    todoList.length > 0 ? todoList[todoList.length - 1].id + 1 : 1;
  todoList.push({
    id: newTodoId,
    task: inputTextNode.value,
    completed: false,
  });
  inputTextNode.value = '';
  console.log(todoList);
  populateList();
  dialogNode.close();
});
