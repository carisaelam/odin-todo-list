import { describe, it, expect, beforeEach } from 'vitest';
import { Task } from '../src/modules/task.js';

describe('Task Class', () => {
  let task;

  beforeEach(() => {
    task = new Task('Sample Task', 'This is a sample task', '2024-10-25');
  });

  describe('Initialization', () => {
    // Priority
    it('should create a task with default priority', () => {
      expect(task.priority).toBe(3);
    });

    it('should create a task with defined priority', () => {
      const task1 = new Task('Task One', 'Description One', '2024-10-25', 1);
      expect(task1.priority).toBe(1);
    });

    // isCompleted
    it('should default isCompleted to false', () => {
      expect(task.isCompleted).toBe(false);
    });
  });

  describe('Toggle Completed', () => {
    it('should toggle isCompleted value', () => {
      task.toggleCompleted();
      expect(task.isCompleted).toBe(true);
    });
  });

  describe('Update DueDate', () => {
    it('should update dueDate when given valid input', () => {
      task.updateDueDate('2050-10-10');
      expect(task.dueDate).toBe('2050-10-10');
    });

    it('should keep dueDate the same when given invalid date', () => {
      expect(() => task.updateDueDate('invalid date')).toThrow(Error);
      expect(task.dueDate).toBe('2024-10-25');
    });

    it('should keep dueDate the same when given date in the past', () => {
      expect(() => task.updateDueDate('2020-10-25')).toThrow(Error);
      expect(task.dueDate).toBe('2024-10-25');
    });
  });

  describe('Update Priority', () => {
    it('should keep priority the same when given invalid number', () => {
      expect(() => task.updatePriority(4)).toThrow(Error);
      expect(task.priority).toBe(3);
    });

    it('should update priority with valid number', () => {
      task.updatePriority(1);
      expect(task.priority).toBe(1);
    });
  });

  describe('Update Title', () => {
    it('should update title when given valid input', () => {
      task.updateTitle('New title');
      expect(task.title).toBe('New title');
    });

    it('should keep title the same when given invalid title', () => {
      expect(() =>
        task.updateTitle(
          'asdfjkl;asdfjkl;asdfjkl;asdfjkl;asdfjkl;asdfjkl;asdfjkl;'
        )
      ).toThrow(Error);
      expect(task.title).toBe('Sample Task');
    });
  });

  describe('Update Description', () => {
    it('should update description when given valid input', () => {
      task.updateDescription('New description');
      expect(task.description).toBe('New description');
    });

    it('should keep description the same when given invalid description', () => {
      expect(() =>
        task.updateDescription(
          'In the ever-evolving world of technology, staying updated is crucial for growth. Embrace new tools, learn continuously, and adapt to changes. Collaborate with others, share knowledge, and do not hesitate to ask for help. Together, we can overcome challenges and achieve great things. Keep pushing forward!'
        )
      ).toThrow(Error);
      expect(task.description).toBe('This is a sample task');
    });
  });

  describe('Validate Due Date', () => {
    it('should return true for valid date', () => {
      expect(task.validateDueDate('2026-10-10')).toBe(true);
    });

    it('should return false for invalid date', () => {
      expect(task.validateDueDate('2020-10-10')).toBe(false);
    });
  });
});
