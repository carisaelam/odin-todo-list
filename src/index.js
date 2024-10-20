import './style.css';

import { Task } from './modules/task.js';
import { Project } from './modules/project.js';

const addTaskForm = document.querySelector('.add-task-form');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const dueDateInput = document.getElementById('due-date');
const taskDisplay = document.querySelector('.task__display');
const projectDisplay = document.querySelector('.project__display');

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

const project1 = new Project('Project 1');
const project2 = new Project('Project 2');

project1.addTaskToProject(task1);
project1.addTaskToProject(task2);
project1.addTaskToProject(task3);

project2.addTaskToProject(task4);
project2.addTaskToProject(task5);
project2.addTaskToProject(task6);
project2.addTaskToProject(task7);

console.log('project1: ', project1);
console.log('project2: ', project2);

function tasksListed(project) {
  const tasks = project.listTasks();
  const html = document.createElement('div');

  tasks.forEach((task) => {
    const taskElement = document.createElement('div');
    taskElement.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <p>${task.dueDate}</p>
    <p>${task.priority}</p>
    <p>${task.createdAt}</p>
    `;

    html.appendChild(taskElement);
  });

  return html;
}

const taskListElement = tasksListed(project2);
projectDisplay.appendChild(taskListElement);
