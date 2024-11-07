import { Project } from './project.js';

export class ProjectManager {
  constructor() {
    const storedProjects = JSON.parse(localStorage.getItem('projects'));

    if (storedProjects && storedProjects.length > 0) {
      this.projects = storedProjects.map(
        (project) => new Project(project.title)
      );
    } else {
      this.projects = [new Project('Inbox')];
    }
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
    localStorage.setItem('projects', JSON.stringify(this.projects));
    return newProject;
  }

  // Deletes a project
  deleteProject(title) {
    const projectIndex = this.projects.findIndex(
      (project) => project.title.toLowerCase() === title.toLowerCase()
    );

    if (projectIndex != -1) {
      this.projects.splice(projectIndex, 1);
      localStorage.setItem('projects', JSON.stringify(this.projects));

      console.log(`Project ${title} deleted.`);
    } else {
      console.log(`Project ${title} not found`);
      return null;
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
