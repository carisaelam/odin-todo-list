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
const projects = [];

function createProject(title) {
  const newProject = new Project(title);
  projects.push(newProject);
  addProjectsToDropdown(newProject);
  return newProject;
}

function addProjectsToDropdown(project) {
  const projectOption = document.createElement('option');
  projectOption.innerHTML = `${project.title}`;
  projectInput.appendChild(projectOption);
}

// Initialize with Inbox
createProject('Inbox');

newProjectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  createProject(newProjectInput.value);
  newProjectInput.value = '';
});

function listAllProjects(projects) {
  if (projects.length === 0) {
    console.log('No projects available');
  }

  projects.forEach((project) => {
    console.log(project.title);
  });
}

function listSpecificProject(title) {
  const foundProject = projects.find(
    (project) => project.title.toLowerCase() === title.toLowerCase()
  );

  if (!foundProject) {
    console.log(`${title} not found.`);
    return;
  }

  console.log(foundProject);
  return foundProject;
}


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

  titleInput.value = '';
  descriptionInput.value = '';
  dueDateInput.value = '';
  projectInput.value = '';
});
