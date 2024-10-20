export class Task {
  constructor(title, description, dueDate, priority = 3, isCompleted = false) {
    this.validateTask({ title, description, dueDate, priority });
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isCompleted = isCompleted;
    this.createdAt = new Date();
  }

  validateTask(task) {
    let errors = [];

    try {
      this.validateTitle(task.title);
    } catch (error) {
      errors.push(error.message);
    }

    try {
      this.validateDescription(task.description);
    } catch (error) {
      errors.push(error.message);
    }

    try {
      this.validateDueDate(task.dueDate);
    } catch (error) {
      errors.push(error.message);
    }

    try {
      this.validatePriority(task.priority);
    } catch (error) {
      errors.push(error.message);
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
  }

  toggleCompleted() {
    this.isCompleted = !this.isCompleted;
  }

  // Updates title property
  updateTitle(newTitle) {
    if (this.validateTitle(newTitle)) {
      this.title = newTitle;
    }
  }

  // Updates description property
  updateDescription(newDescription) {
    if (this.validateDescription(newDescription)) {
      this.description = newDescription;
    }
  }

  // Updates dueDate property
  updateDueDate(newDueDate) {
    if (this.validateDueDate(newDueDate)) {
      this.dueDate = newDueDate;
    }
  }

  // Updates priority property
  updatePriority(newPriority) {
    if (this.validatePriority(newPriority)) {
      this.priority = newPriority;
    } else {
      throw new Error('Priority must be either 1, 2, or 3');
    }
  }

  // Validates title length at <= 50
  validateTitle(newTitle) {
    if (newTitle.length > 50) {
      throw new Error('Title cannot exceed 50 characters');
    }
    return newTitle;
  }

  // Validates description length at <= 250
  validateDescription(newDescription) {
    if (newDescription.length > 250) {
      throw new Error('Description cannot exceed 250 characters.');
    }
    return newDescription;
  }

  // Validates correct date object in future
  validateDueDate(date) {
    const dueDate = new Date(date);
    const now = new Date();

    if (isNaN(dueDate) || dueDate <= now) {
      throw new Error('Date must be valid and in the future');
    }
    return true;
  }

  // Validates priority as either 1, 2, or 3
  validatePriority(newPriority) {
    if (![1, 2, 3].includes(newPriority)) {
      throw new Error('Priority must be 1, 2, or 3');
    }
    return newPriority;
  }
}
