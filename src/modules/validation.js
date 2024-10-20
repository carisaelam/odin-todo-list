export class Validation {
  // Validates title length at <= 50
  validateTitle(newTitle) {
    if (newTitle.length > 50) {
      throw new Error('Title cannot exceed 50 characters');
    }
    return true;
  }

  // Validates description length at <= 250
  validateDescription(newDescription) {
    if (newDescription.length > 250) {
      throw new Error('Description cannot exceed 250 characters.');
    }
    return true;
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
    return true;
  }


  // Project creation validation
  validateProject(project) {
    let errors = [];
    try {
      this.validateTitle(project.title);
    } catch (error) {
      throw new Error('Title must not exceed 50 characters');
    }

    if (errors.length > 0) {
      console.log(errors.join(', '));
      throw new Error(errors.join(', '));
    }
  }


  // Task creation validation
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
}
