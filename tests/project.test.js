import { describe, it, expect, beforeEach } from 'vitest';
import { Project } from '../src/modules/project.js';
import { Task } from '../src/modules/task.js';

describe('Project Class', () => {
  let project;
  const task1 = new Task('Task1', 'Desc1', '2035-10-25');
  const task2 = new Task('Task2', 'Desc2', '2035-11-25');
  const task3 = new Task('Task3', 'Desc3', '2035-12-25');

  beforeEach(() => {
    project = new Project();
  });

  // addTaskToProject
  describe('Add Task to Project', () => {
    it('should add a task to a project', () => {
      project.addTaskToProject(task1);
      expect(project.tasks).toContain(task1);
    });
  });

  // removeTaskFromProject
  describe('Remove Task from Project', () => {
    it('should remove given task from project', () => {
      project.addTaskToProject(task1);
      project.removeTaskFromProject(task1);
      expect(project.tasks).not.toContain(task1);
    });

    it('should throw error when given task not in project', () => {
      expect(project.removeTaskFromProject(task2)).toThrow(Error);
    });
  });

  // listTasks
  describe('List Tasks', () => {
    it('should return all tasks in project', () => {
      project.addTaskToProject(task1);
      project.addTaskToProject(task2);
      project.addTaskToProject(task3);

      expect(project.listTasks()).toEqual([task1, task2, task3]);
    });
  });

  // listCompletedTasks
  describe('List Completed Tasks', () => {
    it('should list only completed tasks', () => {
      task3.toggleCompleted();
      project.addTaskToProject(task1);
      project.addTaskToProject(task2);
      project.addTaskToProject(task3);

      expect(project.listCompletedTasks()).toEqual([task3]);
    });
  });
});
