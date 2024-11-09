import { describe, it, expect, beforeEach } from 'vitest';
import { Project } from '../src/modules/project.js';
import { Task } from '../src/modules/task.js';
import { ProjectManager } from '../src/modules/projectManager.js';

global.localStorage = {
  storage: {},
  getItem(key) {
    return this.storage[key] || null;
  },
  setItem(key, value) {
    this.storage[key] = value.toString();
  },
  removeItem(key) {
    delete this.storage[key];
  },
  clear() {
    this.storage = {};
  },
};

describe('Project Manager Class', () => {
  let projectManager;
  const task1 = new Task('Task1', 'Desc1', '2035-10-25', 2, false, Date.now());
  const task2 = new Task('Task2', 'Desc2', '2035-11-25', 2, false, Date.now());
  const task3 = new Task('Task3', 'Desc3', '2035-12-25', 2, false, Date.now());

  beforeEach(() => {
    projectManager = new ProjectManager();
  });

  // Constructor Validation
  describe('Constructor Validation', () => {
    // Project Default
    it('should add a default Inbox project', () => {
      expect(projectManager.projects).toEqual([new Project('Inbox')]);
    });

    // Tasks Default
    it('should add the tasks to the project', () => {
      projectManager.addTaskToProject('Inbox', task1);
      expect(projectManager.projects[0].tasks).toContain(task1);
    });
  });

  // Create Project
  describe('Create Project', () => {
    it('should create a new project with given title', () => {
      const newProject = projectManager.createProject('Work');
      expect(newProject.title).toEqual('Work');
    });

    it('should return null if project exists', () => {
      const newProject = projectManager.createProject('Work');
      const newerProject = projectManager.createProject('Work');
      expect(newerProject).toBeNull;
    });
  });

  // List all projects
  describe('List All Projects', () => {
    it('should return a list of project titles', () => {
      expect(projectManager.listAllProjects()).toEqual(['Inbox', 'Work']);
    });

    it('should work with an added project', () => {
      projectManager.createProject('Work');
      expect(projectManager.listAllProjects()).toEqual(['Inbox', 'Work']);
    });
  });

  // List Specific Project
  describe('List Specific Project', () => {
    it('should list specific project by title', () => {
      const specificListed = projectManager.listSpecificProject('Inbox');

      expect(specificListed.title).toEqual('Inbox');
    });

    it('should return null if no project found', () => {
      const specificListed = projectManager.listSpecificProject('Invalid');

      expect(specificListed).toBeNull;
    });
  });

  // Delete Specific Project
  describe('Delete Project', () => {
    beforeEach(() => {
      projectManager.createProject('Work');
    });

    it('should delete the given project', () => {
      projectManager.deleteProject('Work');
      expect(projectManager.listAllProjects()).toEqual(['Inbox']);
    });

    it('should return null for project not found', () => {
      projectManager.deleteProject('Invalid');
      expect(projectManager.listAllProjects()).toBeNull;
    });
  });

  // Add Task to Project
  describe('Add Task to Project', () => {
    beforeEach(() => {
      projectManager.createProject('Work');
    });

    let task = new Task(
      'Title',
      'Description',
      Date.now() + 1,
      2,
      false,
      Date.now()
    );

    it('should add a task to the Work project', () => {
      projectManager.addTaskToProject('Work', task);
      expect(projectManager.projects[1].tasks).toContain(task);
    });
  });
});
