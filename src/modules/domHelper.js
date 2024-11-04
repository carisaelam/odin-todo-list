import { ProjectManager } from './projectManager';

export class DOMHelper {
  constructor() {
    this.projectInput = document.getElementById('project');
    this.projectDisplay = document.querySelector('.project__display');
  }

  // Adds a project option to dropdown UI
  addProjectsToDropdown(project) {
    const projectOption = document.createElement('option');
    projectOption.value = project.title;
    projectOption.innerHTML = `${project.title}`;
    this.projectInput.appendChild(projectOption);

    console.log('Project added: ', project.title);
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
        <label class="single__task__title" for="${task.createdAt}">${task.title}</label>
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
        <div class="task__list__container">
        <div class="task__container" id="${project.title.toLowerCase()}__container"></div>
        </div>
        </div>
        `;

    this.projectDisplay.appendChild(tempDiv.firstElementChild);
  }
}
