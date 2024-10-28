import { Validation } from './validation';
const validation = new Validation();

export class Task {
  constructor(
    title,
    description,
    dueDate,
    priority = 3,
    isCompleted = false,
    project
  ) {
    validation.validateTask({ title, description, dueDate, priority });
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isCompleted = isCompleted;
    // this.project = project;
    this.createdAt = new Date();
  }

  toggleCompleted() {
    this.isCompleted = !this.isCompleted;
  }

  // Updates title property
  updateTitle(newTitle) {
    if (validation.validateTitle(newTitle)) {
      this.title = newTitle;
    }
  }

  // Updates description property
  updateDescription(newDescription) {
    if (validation.validateDescription(newDescription)) {
      this.description = newDescription;
    }
  }

  // Updates dueDate property
  updateDueDate(newDueDate) {
    if (validation.validateDueDate(newDueDate)) {
      this.dueDate = newDueDate;
    }
  }

  // Updates priority property
  updatePriority(newPriority) {
    if (validation.validatePriority(newPriority)) {
      this.priority = newPriority;
    }
  }
}
