import './style.css';

import { Task } from './modules/task.js';
import { ProjectManager } from './modules/projectManager.js';
import { DOMHelper } from './modules/domHelper.js';

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const addTaskForm = document.querySelector('.add__task__form');
  const addTaskFormContainer = document.querySelector(
    '.add__task__form__container'
  );
  const addTaskButton = document.querySelector('.add__task__button');
  const projectInput = document.getElementById('project');
  const newProjectInput = document.getElementById('new-project');
  const newProjectForm = document.querySelector('.new__project__form');
  const deleteButton = document.querySelector('.delete__button');
  const displayAllProjectsButton = document.getElementById(
    'display__all__projects__button'
  );
  const projectDisplay = document.querySelector('.project__display');
  const projectDisplayButtonsContainer = document.querySelector(
    '.project__display__buttons__container'
  );

  // Variables
  const domHelper = new DOMHelper();
  const projectManager = new ProjectManager();
  const projects = projectManager.projects;

  // Initialize with Inbox
  domHelper.addProjectsToDropdown(projectManager.projects[0]);

  // Displays all projects at start
  domHelper.populateProjectDisplay(projects);

  // EVENT LISTENERS

  // Creates new project and updates dropdown menu
  newProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const project = projectManager.createProject(newProjectInput.value);

    if (project) {
      domHelper.addProjectsToDropdown(project);
      domHelper.populateProjectDisplay(projects);
      generateProjectButton(project);
    }

    newProjectInput.value = '';
  });

  // Creates a new task and assigns to project
  addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const dueDateInput = document.getElementById('due-date');

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
    domHelper.populateProjectDisplay(projects);

    // createSingleTaskHTML(task);
    addTaskFormContainer.classList.toggle('hidden');

    titleInput.value = '';
    descriptionInput.value = '';
    dueDateInput.value = '';
    projectInput.value = '';
  });

  // Opens addTaskForm
  addTaskButton.addEventListener('click', () => {
    addTaskFormContainer.classList.toggle('hidden');
    addTaskForm.querySelector('input').focus();
  });

  // Closes add task menu
  deleteButton.addEventListener('click', () => {
    addTaskFormContainer.classList.toggle('hidden');
  });

  // Adds filter to project display
  projectDisplayButtonsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('project__display__button')) {
      const title = e.target.textContent;
      console.log('Selected project title', title);

      const selectedProject = projectManager.listSpecificProject(title);
      projectDisplay.textContent = '';
      displaySingleProject(selectedProject);
    }
  });

  // Display all projects
  displayAllProjectsButton.addEventListener('click', () => {
    domHelper.populateProjectDisplay(projects);
  });

  // FUNCTIONS

  // Filters projectDisplay for single project
  function displaySingleProject(project) {
    projectDisplay.textContent = '';

    domHelper.createSingleProjectHTML(project);

    const taskContainer = document.getElementById(
      `${project.title.toLowerCase()}__container`
    );

    project.tasks.forEach((task) => {
      domHelper.createSingleTaskHTML(task, taskContainer);
    });
  }

  // Generates button for new projects
  function generateProjectButton(project) {
    const tempButton = document.createElement('button');
    tempButton.textContent = project.title;
    tempButton.classList.add('project__display__button');

    projectDisplayButtonsContainer.appendChild(tempButton);

    console.log('new project button', project.title);
  }
});
