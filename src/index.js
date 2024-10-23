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
const newProjectForm = document.querySelector('.new__project__form');

const inbox = new Project('Inbox');
const tester = new Project('Tester');
const projects = [];

console.log('projects', projects);

function addProjectsToDropdown(project) {
  const projectOption = document.createElement('option');
  projectOption.innerHTML = `${project.title}`;
  projectInput.appendChild(projectOption);
  projects.push(project);
}

addProjectsToDropdown(inbox);

newProjectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(projects);
  const newProject = new Project(newProjectInput.value);
  addProjectsToDropdown(newProject);
});

addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Sets selectedProject as the element in the projects array that matches the project.title
  let selectedProject = projects.find(
    (project) =>
      project.title.toLowerCase() === projectInput.value.toLowerCase()
  );

  if (!selectedProject) {
    selectedProject = inbox;
  }

  console.log('selected project', selectedProject);

  // Pushes new project into projects array
  // if (projectInput.value === 'new' && newProjectInput.value) {
  //   createProject(newProjectInput.value);
  // }

  // Creates a new Task with user input and selectedProject
  const task = new Task(
    titleInput.value,
    descriptionInput.value,
    dueDateInput.value,
    undefined,
    undefined,
    selectedProject
  );

  selectedProject.addTaskToProject(task);
  selectedProject.listTasks();

  projectDisplay.textContent = '';

  // Calls tasksListed for each project in the array
  projects.forEach((project) => {
    const taskListElement = tasksListed(project);
    projectDisplay.appendChild(taskListElement);
  });

  titleInput.value = '';
  descriptionInput.value = '';
  dueDateInput.value = '';
  projectInput.value = '';
});

// Creates and appends html for projects
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

const task1 = new Task('First task', 'first description', '2024-12-31');
const task2 = new Task('Second task', 'second description', '2024-12-30');
const task3 = new Task('Third task', 'third description', '2024-12-29');
const task4 = new Task('Fourth task', 'fourth description', '2024-12-28');
const task5 = new Task('Fifth task', 'fifth description', '2024-12-20', 1);
const task6 = new Task('Sixth task', 'sixth description', '2024-12-18', 2);
const task7 = new Task('Seventh task', 'seventh description', '2025-01-01');
