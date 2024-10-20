import './style.css';

import { Task } from './modules/task.js';
import { Project } from './modules/project.js';

const addTaskForm = document.querySelector('.add-task-form');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const dueDateInput = document.getElementById('due-date');
const taskDisplay = document.querySelector('.task__display');

addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const task = new Task(
    titleInput.value,
    descriptionInput.value,
    dueDateInput.value
  );
  console.log(task);
  project1.addTaskToProject(task);
  taskDisplay.textContent = JSON.stringify(task);
  project1.listTasks();

  titleInput.value = '';
  descriptionInput.value = '';
  dueDateInput.value = '';
});

const task1 = new Task('First task', 'first description', '2024-12-31');
const task2 = new Task('Second task', 'second description', '2024-12-30');
const task3 = new Task('Third task', 'third description', '2024-12-29');
const task4 = new Task('Fourth task', 'fourth description', '2024-12-28');
const task5 = new Task('Fifth task', 'fifth description', '2024-12-20', 1);
const task6 = new Task('Sixth task', 'sixth description', '2024-12-18', 2);
const task7 = new Task('Seventh task', 'seventh description', '2025-01-01');

const project1 = new Project();

project1.addTaskToProject(task1);
project1.addTaskToProject(task6);
project1.addTaskToProject(task7);
