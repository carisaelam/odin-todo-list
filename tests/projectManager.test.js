import { describe, it, expect, beforeEach } from 'vitest';
import { Project } from '../src/modules/project.js';
import { Task } from '../src/modules/task.js';
import { ProjectManager } from '../src/modules/projectManager.js';

describe('Project Manager Class', () => {
  let projectManager;
  const task1 = new Task('Task1', 'Desc1', '2035-10-25');
  const task2 = new Task('Task2', 'Desc2', '2035-11-25');
  const task3 = new Task('Task3', 'Desc3', '2035-12-25');

  beforeEach(() => {
    projectManager = new ProjectManager();
  });

  // Constructor Validation
  describe('Constructor Validation', () => {
    // Project Default
    it('should add a default Inbox project', () => {
      expect(projectManager.projects).toEqual([new Project('Inbox')]);
    });
  });

  // Create Project
  describe('Create Project', () => {
    it('should create a new project with given title', () => {
      const newProject = projectManager.createProject('Work');
      expect(newProject.title).toEqual('Work');
    });

    it('should return null if project exists', () => {
      const newerProject = projectManager.createProject('Work');
      expect(newerProject).toBeNull;
    });
  });

  // List all projects
  describe('List All Projects', () => {
    it('should return a list of project titles', () => {
      expect(projectManager.listAllProjects()).toEqual(['Inbox']);
    });

    it('should work with an added project', () => {
      projectManager.createProject('Work');
      expect(projectManager.listAllProjects()).toEqual(['Inbox', 'Work']);
    });
  });
});
