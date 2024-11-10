import { ProjectManager } from './projectManager';

export class DOMHelper {
  constructor() {
    this.projectInput = document.getElementById('project');
    this.projectDisplay = document.querySelector('.project__display');
    this.projectDisplayButtonsContainer = document.querySelector(
      '.project__display__buttons__container'
    );
    this.taskDetailsContainer = document.querySelector(
      '.task__details__container'
    );
  }

  // Adds a project option to dropdown UI
  addProjectsToDropdown(projects) {
    this.projectInput.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.innerHTML = 'Select a project';
    this.projectInput.appendChild(defaultOption);

    projects.forEach((project) => {
      const projectOption = document.createElement('option');
      projectOption.value = project.title;
      projectOption.innerHTML = `${project.title}`;
      this.projectInput.appendChild(projectOption);

      console.log('Project added: ', project.title);
    });
  }

  // Generates button for new projects
  generateProjectButtons(projects) {
    const allButton = document.getElementById('display__all__projects__button');

    // Clear all existing buttons besides the "All"
    const buttons = Array.from(this.projectDisplayButtonsContainer.children);

    buttons.forEach((button) => {
      if (button !== allButton) {
        this.projectDisplayButtonsContainer.removeChild(button);
      }
    });

    projects.forEach((project) => {
      const tempButton = document.createElement('button');
      tempButton.textContent = project.title;
      tempButton.classList.add('project__display__button');

      this.projectDisplayButtonsContainer.appendChild(tempButton);

      console.log('new project button', project.title);
    });
  }

  // Appends HTML for the task to the UI
  createSingleTaskHTML(task, taskContainer) {
    if (!taskContainer) {
      console.error('taskContainer not found');
      return;
    }

    const tempDiv = document.createElement('div');

    tempDiv.innerHTML = `
        <div class="single__task">
          <input type="checkbox" name="task" id="${task.createdAt}" />
          <div class="task__and__more__container">
            <label class="single__task__title" for="${task.createdAt}">${task.title}</label>
            <p class="single__task__details">+</p>
          </div>
        </div>
        
        `;

    taskContainer.appendChild(tempDiv.firstElementChild);
  }

  // Appends HTML for all projects to the UI
  createSingleProjectHTML(project) {
    if (!this.projectDisplay) {
      console.error('project__display not found');
      return;
    }

    const tempDiv = document.createElement('div');

    tempDiv.innerHTML = `
        <div class="single__project__container">
          <h3 class="single__project__title">${project.title}</h3>
          <i class="fa-solid fa-x delete__project__button"></i>
          <div class="task__list__container">
          <div class="task__container" id="${project.title.toLowerCase()}__container"></div>
          </div>
        </div>
        `;

    this.projectDisplay.appendChild(tempDiv.firstElementChild);
  }

  // Appends HTML for task details to the UI
  displaySingleTask(task) {
    if (!this.taskDetailsContainer) {
      console.error('task__details__container not found');
      return;
    }

    this.taskDetailsContainer.textContent = '';
    this.taskDetailsContainer.classList.toggle('hidden');

    const tempDiv = document.createElement('div');

    tempDiv.innerHTML = `
          <h3>${task.title}</h3>
          <p>${task.description}</p>
          <p>${task.dueDate}</p>
          <p>${task.priority}</p>
          <button class="delete__task__button">Delete</button>
          <i class="fa-solid fa-x close__task__details"></i>
          
        `;

    this.taskDetailsContainer.appendChild(tempDiv);
  }

  // Toggle task details display
  toggleTaskDetailsDisplay() {
    this.taskDetailsContainer.classList.toggle('hidden');
  }

  // Cycles through projects and creates HTML
  populateProjectDisplay(projects) {
    this.projectDisplay.textContent = '';
    projects.forEach((project) => {
      this.createSingleProjectHTML(project);

      const taskContainer = document.getElementById(
        `${project.title.toLowerCase()}__container`
      );

      project.tasks.forEach((task) => {
        this.createSingleTaskHTML(task, taskContainer);
      });
    });
  }
}
