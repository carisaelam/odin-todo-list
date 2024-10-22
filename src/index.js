import './style.css';

import { Task } from './modules/task.js';
import { Project } from './modules/project.js';

const addTaskForm = document.querySelector('.add-task-form');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const dueDateInput = document.getElementById('due-date');
const projectInput = document.getElementById('project');
const newProjectInput = document.getElementById('new-project');
const projectDisplay = document.querySelector('.project__display');

const inbox = new Project('Inbox');
const workProject = new Project('Work');
const personalProject = new Project('Personal');

const projects = [inbox, workProject, personalProject];

projectInput.addEventListener('change', (e) => {
  if (e.target.value === 'new') {
    newProjectInput.style.display = 'block';
  } else {
    newProjectInput.style.display = 'none';
    newProjectInput.value = '';
  }
});

addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let selectedProject = projects.find(
    (project) =>
      project.title.toLowerCase() === projectInput.value.toLowerCase()
  );

  if (projectInput.value === 'new' && newProjectInput.value) {
    selectedProject = new Project(newProjectInput.value);
    projects.push(selectedProject);
  }

  const task = new Task(
    titleInput.value,
    descriptionInput.value,
    dueDateInput.value,
    undefined,
    undefined,
    selectedProject
  );
  console.log(task);
  selectedProject.addTaskToProject(task);
  selectedProject.listTasks();
  const taskListElement1 = tasksListed(inbox);
  projectDisplay.textContent = '';
  projectDisplay.appendChild(taskListElement1);

  projects.forEach((project) => {
    const taskListElement1 = tasksListed(project);
    projectDisplay.appendChild(taskListElement1);
  });

  titleInput.value = '';
  descriptionInput.value = '';
  dueDateInput.value = '';
  projectInput.value = '';
});

const task1 = new Task('First task', 'first description', '2024-12-31');
const task2 = new Task('Second task', 'second description', '2024-12-30');
const task3 = new Task('Third task', 'third description', '2024-12-29');
const task4 = new Task('Fourth task', 'fourth description', '2024-12-28');
const task5 = new Task('Fifth task', 'fifth description', '2024-12-20', 1);
const task6 = new Task('Sixth task', 'sixth description', '2024-12-18', 2);
const task7 = new Task('Seventh task', 'seventh description', '2025-01-01');

// inbox.addTaskToProject(task1);
// inbox.addTaskToProject(task2);
// inbox.addTaskToProject(task3);
// inbox.addTaskToProject(task4);
// inbox.addTaskToProject(task5);
// inbox.addTaskToProject(task6);
// inbox.addTaskToProject(task7);

console.log('inbox: ', inbox);

function tasksListed(project) {
  const tasks = project.listTasks();
  const html = document.createElement('div');

  const titleElement = document.createElement('h3');
  titleElement.textContent = project.title;
  html.appendChild(titleElement);

  tasks.forEach((task) => {
    const taskElement = document.createElement('div');
    taskElement.innerHTML = `
    <h3>Title: ${task.title}</h3>
    <p>Description: ${task.description}</p>
    <p>Due Date: ${task.dueDate}</p>
    <p>Priority: ${task.priority}</p>
    <p>Project: ${task.project.title}</p>
    <p>Created: ${task.createdAt}</p>
    `;

    html.appendChild(taskElement);
  });

  return html;
}
