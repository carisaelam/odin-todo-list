import { Project } from './project.js';
import { Task } from './task.js';

export class ProjectManager {
  constructor() {
    const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');

    console.log('storedProjects', storedProjects);

    if (storedProjects.length > 0) {
      this.projects = storedProjects.map((projectData) => {
        const project = new Project(projectData.title);
        projectData.tasks.forEach((taskData) => {
          const task = new Task(
            taskData.title,
            taskData.description,
            taskData.dueDate,
            taskData.priority,
            taskData.isCompleted,
            taskData.id,
            project
          );
          project.addTaskToProject(task);
        });

        return project;
      });
    } else {
      this.projects = [new Project('Inbox')];
    }

    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  // Helper function to save to localStorage
  saveToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  // Creates a new project with title
  createProject(title) {
    const existingProject = this.projects.find(
      (project) => project.title.toLowerCase() === title.toLowerCase()
    );

    if (existingProject) {
      console.log(`Project ${title} already exists.`);
      return null;
    }

    const newProject = new Project(title);
    this.projects.push(newProject);

    this.saveToLocalStorage();
    return newProject;
  }

  // Deletes a project
  deleteProject(title) {
    const projectIndex = this.projects.findIndex(
      (project) => project.title.toLowerCase() === title.toLowerCase()
    );

    if (projectIndex != -1) {
      this.projects.splice(projectIndex, 1);
      this.saveToLocalStorage();

      console.log(`Project ${title} deleted.`);
    } else {
      console.log(`Project ${title} not found`);
      return null;
    }
  }

  // Add task to a project
  addTaskToProject(projectTitle, task) {
    const project = this.projects.find(
      (project) => project.title.toLowerCase() === projectTitle.toLowerCase()
    );

    if (project) {
      project.addTaskToProject(task);
      this.saveToLocalStorage();
    }
  }

  // Remove task from project
  removeTaskFromProject(projectTitle, task) {
    const project = this.projects.find(
      (project) => project.title.toLowerCase() === projectTitle.toLowerCase()
    );

    if (project) {
      project.removeTaskFromProject(task);
      this.saveToLocalStorage();
    }
  }

  // Lists all projects
  listAllProjects() {
    const projectTitles = this.projects.map((project) => project.title);
    console.log(projectTitles);
    return projectTitles;
  }

  // Lists and returns a specific project given the title
  listSpecificProject(title) {
    const foundProject = this.projects.find(
      (project) => project.title.toLowerCase() === title.toLowerCase()
    );

    if (!foundProject) {
      console.log(`${title} not found.`);
      return null;
    }

    console.log(foundProject);
    return foundProject;
  }
}
