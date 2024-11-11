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
  const taskDetailsContainer = document.querySelector(
    '.task__details__container'
  );

  // Variables
  const domHelper = new DOMHelper();
  const projectManager = new ProjectManager();
  const projects = projectManager.projects;

  // Initialize with Inbox
  domHelper.addProjectsToDropdown(projects);

  // Displays all projects at start
  domHelper.populateProjectDisplay(projects);
  domHelper.generateProjectButtons(projects);

  // EVENT LISTENERS

  // Creates new project and updates dropdown menu
  newProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const project = projectManager.createProject(newProjectInput.value);

    if (project) {
      domHelper.addProjectsToDropdown(projects);
      domHelper.populateProjectDisplay(projects);
      domHelper.generateProjectButtons(projects);
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
      false,
      Date.now(),
      selectedProject.title
    );

    projectManager.addTaskToProject(selectedProjectTitle, task);
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

  // Delete project
  projectDisplay.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete__project__button')) {
      console.log('e.target', e.target);
      const projectTitle = e.target
        .closest('.single__project__container')
        .querySelector('.single__project__title')
        .textContent.trim();

      console.log('projectTitle', projectTitle);

      const confirmed = confirm(`Delete Project: ${projectTitle}?`);

      if (confirmed) {
        projectManager.deleteProject(projectTitle);
        domHelper.populateProjectDisplay(projects);
        domHelper.addProjectsToDropdown(projects);
        domHelper.generateProjectButtons(projects);
      }
    }
  });

  // Display task details
  projectDisplay.addEventListener('click', (e) => {
    if (e.target.classList.contains('single__task__details')) {
      const taskTitle = e.target
        .closest('.single__task')
        .querySelector('.single__task__title')
        .textContent.trim();
      const projectTitle = e.target
        .closest('.single__project__container')
        .querySelector('.single__project__title')
        .textContent.trim();

      const project = projectManager.listSpecificProject(projectTitle);

      const task = project.findTaskByTitle(taskTitle);

      domHelper.displaySingleTask(task);
    }
  });

  // Delete a task
  taskDetailsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete__task__button')) {
      console.log('delete a task triggered');

      const taskContainer = e.target.closest('.task__details__container');

      if (taskContainer) {
        const projectElement = taskContainer.querySelector(
          '.task__details__project'
        );
        const projectTitle = projectElement ? projectElement.textContent : null;

        const taskTitleElement = taskContainer.querySelector(
          '.task__details__title'
        );
        const taskTitle = taskTitleElement
          ? taskTitleElement.textContent
          : null;

        console.log('project title: ', projectTitle);
        console.log('task title: ', taskTitle);

        if (taskTitle && projectTitle) {
          const taskToDelete = projectManager
            .listSpecificProject(projectTitle)
            .findTaskByTitle(taskTitle);

          const project = projectManager.listSpecificProject(projectTitle);

          if (taskToDelete) {
            project.removeTaskFromProject(taskToDelete);
            console.log(`Task ${taskTitle} removed from ${projectTitle}`);

            projectManager.saveToLocalStorage();
            domHelper.populateProjectDisplay(projects);
            domHelper.toggleTaskDetailsDisplay();
          }
        }
      }
    }
  });

  // Hide task details
  taskDetailsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('close__task__details')) {
      domHelper.toggleTaskDetailsDisplay();
    }
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
});
