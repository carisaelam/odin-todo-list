import { describe, it, expect, beforeEach } from 'vitest';
import { Task } from '../src/modules/task.js';

describe('Task Class', () => {
  let task;

  beforeEach(() => {
    task = new Task('Sample Task', 'This is a sample task', '2024-10-25');
  });

  // Constructor Validation
  describe('Constructor Validation', () => {
    // Title
    it('should throw error for title longer than 50 characters', () => {
      expect(
        () => new Task('x'.repeat(51), 'Valid description', '2024-10-25')
      ).toThrow(Error);
    });

    it('should throw error for description longer than 250 characters', () => {
      expect(
        () => new Task('Valid title', 'x'.repeat(251), '2024-10-25')
      ).toThrow(Error);
    });

    it('should throw error for NaN dueDate', () => {
      expect(
        () => new Task('Valid title', 'Valid description', 'invalid date')
      ).toThrow(Error);
    });

    it('should throw error for date in the past', () => {
      expect(
        () => new Task('Valid title', 'Valid description', '1999-01-01')
      ).toThrow(Error)
    })

    it('should throw error for invalid priority', () => {
      expect(
        () => new Task('Valid title', 'Valid description', '2025-01-01', 10)
      ).toThrow(Error)
    })
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
      expect(() => task.updateTitle('x'.repeat(51))).toThrow(Error);
      expect(task.title).toBe('Sample Task');
    });
  });

  describe('Update Description', () => {
    it('should update description when given valid input', () => {
      task.updateDescription('New description');
      expect(task.description).toBe('New description');
    });

    it('should keep description the same when given invalid description', () => {
      expect(() => task.updateDescription('x'.repeat(251))).toThrow(Error);
      expect(task.description).toBe('This is a sample task');
    });
  });
});
