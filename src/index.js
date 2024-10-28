import './style.css';

import { Task } from './modules/task.js';
import { Project } from './modules/project.js';
import { ProjectManager } from './modules/projectManager.js';

// DOM Elements
const addTaskForm = document.querySelector('.add-task-form');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const dueDateInput = document.getElementById('due-date');
const projectInput = document.getElementById('project');
const newProjectInput = document.getElementById('new-project');
const projectDisplay = document.querySelector('.project__display');
const newProjectForm = document.querySelector('.new__project__form');

// Variables
const projectManager = new ProjectManager();

// Adds a project option to dropdown UI
function addProjectsToDropdown(project) {
  const projectOption = document.createElement('option');
  projectOption.value = project.title;
  projectOption.innerHTML = `${project.title}`;
  projectInput.appendChild(projectOption);
}

// Initialize with Inbox
addProjectsToDropdown(projectManager.projects[0]);

// EVENT LISTENERS

// Creates new project and updates dropdown menu
newProjectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const project = projectManager.createProject(newProjectInput.value);

  if (project) {
    addProjectsToDropdown(project);
  }

  newProjectInput.value = '';
});

// Creates a new task and assigns to project
addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Sets selectedProject as the element in the projects array that matches the project.title
  const selectedProjectTitle = projectInput.value || 'Inbox';
  let selectedProject = projectManager.projects.find(
    (project) =>
      project.title.toLowerCase() === selectedProjectTitle.toLowerCase()
  );

  if (!selectedProject) {
    selectedProject = projectManager.projects[0];
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
