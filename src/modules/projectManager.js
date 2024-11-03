import { Project } from './project.js';

export class ProjectManager {
  constructor() {
    this.projects = [new Project('Inbox')];
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
    return newProject;
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
