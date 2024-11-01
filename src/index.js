import './style.css';

import { Task } from './modules/task.js';
import { ProjectManager } from './modules/projectManager.js';
import { differenceInHours } from 'date-fns';

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const addTaskForm = document.querySelector('.add__task__form');
  const addTaskButton = document.querySelector('.add__task__button');
  const projectInput = document.getElementById('project');
  const newProjectInput = document.getElementById('new-project');
  const newProjectForm = document.querySelector('.new__project__form');
  const deleteButton = document.querySelector('.delete__button');
  const taskContainer = document.querySelector('.task__container');

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

    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const dueDateInput = document.getElementById('due-date');
    const projectDisplay = document.querySelector('.project__display');

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
    // selectedProject.listTasks();
    createSingleTaskHTML(task);
    addTaskForm.classList.toggle('hidden');

    // projectDisplay.textContent = '';

    titleInput.value = '';
    descriptionInput.value = '';
    dueDateInput.value = '';
    projectInput.value = '';
  });

  // Opens addTaskForm
  addTaskButton.addEventListener('click', () => {
    addTaskForm.classList.toggle('hidden');
  });

  // Closes add task menu
  deleteButton.addEventListener('click', () => {
    addTaskForm.classList.toggle('hidden');
  });

  function createSingleTaskHTML(task) {
    if (!taskContainer) {
      console.error('task__container not found');
      return;
    }

    const singleTaskDiv = document.createElement('div');
    singleTaskDiv.classList.add('single__task');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'task';
    checkbox.id = task.createdAt;

    const label = document.createElement('label');
    label.htmlFor = task.createdAt;
    label.textContent = task.title;

    singleTaskDiv.appendChild(checkbox);
    singleTaskDiv.appendChild(label);

    taskContainer.appendChild(singleTaskDiv);
  }
});
