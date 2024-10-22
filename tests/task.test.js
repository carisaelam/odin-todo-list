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

    // Description
    it('should throw error for description longer than 250 characters', () => {
      expect(
        () => new Task('Valid title', 'x'.repeat(251), '2024-10-25')
      ).toThrow(Error);
    });

    // Due Date
    it('should throw error for NaN dueDate', () => {
      expect(
        () => new Task('Valid title', 'Valid description', 'invalid date')
      ).toThrow(Error);
    });

    it('should throw error for date in the past', () => {
      expect(
        () => new Task('Valid title', 'Valid description', '1999-01-01')
      ).toThrow(Error);
    });

    // Priority
    it('should throw error for invalid priority', () => {
      expect(
        () => new Task('Valid title', 'Valid description', '2025-01-01', 10)
      ).toThrow(Error);
    });
  });

  // Toggle Completed
  describe('Toggle Completed', () => {
    it('should toggle isCompleted value', () => {
      task.toggleCompleted();
      expect(task.isCompleted).toBe(true);
    });
  });

  // Update title
  describe('Update Title', () => {
    it('should update title when given valid input', () => {
      task.updateTitle('New title');
      expect(task.title).toBe('New title');
    });
  });

  // Update description
  describe('Update Description', () => {
    it('should update description when given valid input', () => {
      task.updateDescription('New description');
      expect(task.description).toBe('New description');
    });
  });

  // Update dueDate
  describe('Update DueDate', () => {
    it('should update dueDate when given valid input', () => {
      task.updateDueDate('2050-10-10');
      expect(task.dueDate).toBe('2050-10-10');
    });
  });

  // Update priority
  describe('Update Priority', () => {
    it('should update priority with valid number', () => {
      task.updatePriority(1);
      expect(task.priority).toBe(1);
    });
  });
});
