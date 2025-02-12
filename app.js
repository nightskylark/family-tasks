document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    // Загрузка задач из localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Функция для сохранения задач в localStorage
    const saveTasks = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
    // Функция для создания элемента задачи
    const createTaskElement = (task, index) => {
      const li = document.createElement('li');
      li.classList.toggle('completed', task.completed);
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        li.classList.toggle('completed', task.completed);
        saveTasks();
      });
  
      const span = document.createElement('span');
      span.textContent = task.text;
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Удалить';
      deleteButton.addEventListener('click', () => {
        tasks.splice(index, 1);
        renderTasks();
        saveTasks();
      });
  
      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteButton);
      return li;
    };
  
    // Функция для отображения задач
    const renderTasks = () => {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
        taskList.appendChild(taskElement);
      });
    };
  
    // Обработка отправки формы
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        const newTask = { text: taskText, completed: false };
        tasks.push(newTask);
        renderTasks();
        saveTasks();
        taskInput.value = '';
      }
    });
  
    // Инициализация отображения задач
    renderTasks();
  });
  