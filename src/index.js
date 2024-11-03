import './style.css';

import { Task } from './modules/task.js';
import { ProjectManager } from './modules/projectManager.js';
import { differenceInHours } from 'date-fns';

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
  const projectDisplay = document.querySelector('.project__display');

  // Variables
  const projectManager = new ProjectManager();
  const projects = projectManager.projects;

  // Adds a project option to dropdown UI
  function addProjectsToDropdown(project) {
    const projectOption = document.createElement('option');
    projectOption.value = project.title;
    projectOption.innerHTML = `${project.title}`;
    projectInput.appendChild(projectOption);

    console.log('Project added: ', project.title);
    console.log(projects);
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
      populateProjectDisplay(project);
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
    populateProjectDisplay(project);

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
  });

  // Closes add task menu
  deleteButton.addEventListener('click', () => {
    addTaskFormContainer.classList.toggle('hidden');
  });

  // Appends HTML for the task to the UI
  function createSingleTaskHTML(task, taskContainer) {
    if (!taskContainer) {
      console.error('taskContainer not found');
      return;
    }

    const tempDiv = document.createElement('div');

    tempDiv.innerHTML = `
      <div class="single__task">
        <input type="checkbox" name="task" id="${task.createdAt}" />
        <label for="${task.createdAt}">${task.title}</label>
      </div>

    `;

    taskContainer.appendChild(tempDiv.firstElementChild);
  }

  // Appends HTML for all projects to the UI
  function createSingleProjectHTML(project) {
    if (!projectDisplay) {
      console.error('project__display not found');
      return;
    }

    const tempDiv = document.createElement('div');

    tempDiv.innerHTML = `
          <div class="single__project__container">
            <h3>${project.title}</h3>
            <div class="task__list__container">
              <div class="task__container" id="${project.title.toLowerCase()}__container"></div>
            </div>
          </div>
    
    
    `;

    projectDisplay.appendChild(tempDiv.firstElementChild);
  }

  // Cycles through projects and creates HTML
  function populateProjectDisplay() {
    projectDisplay.textContent = '';
    projects.forEach((project) => {
      createSingleProjectHTML(project);

      const taskContainer = document.getElementById(
        `${project.title.toLowerCase()}__container`
      );

      project.tasks.forEach((task) => {
        createSingleTaskHTML(task, taskContainer);
      });
    });
  }

  // populateProjectDisplay();
});
