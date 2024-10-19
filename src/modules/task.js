export class Task {
  constructor(title, description, dueDate, priority = 3, isCompleted = false) {
    (this.title = title),
      (this.description = description),
      (this.dueDate = dueDate),
      (this.priority = priority),
      (this.isCompleted = isCompleted);
    this.createdAt = new Date();
  }

  toggleCompleted() {
    this.isCompleted = !this.isCompleted;
  }

  // Validates title length at <= 50
  updateTitle(newTitle) {
    if (newTitle.length <= 50) {
      this.title = newTitle;
    } else {
      console.error('Title must be 50 characters or less');
    }
  }

  // Validates description length at <= 250
  updateDescription(newDescription) {
    if (newDescription.length <= 250) {
      this.description = newDescription;
    } else {
      console.error('Description must be 250 characters or less');
    }
  }

  // Calls validateDueDate
  updateDueDate(newDueDate) {
    if (this.validateDueDate(newDueDate)) {
      this.dueDate = newDueDate;
    } else {
      console.error('Due date must be a valid date in the future.');
    }
  }

  // Validates priority as 1, 2, or 3
  updatePriority(newPriority) {
    if ([1, 2, 3].includes(newPriority)) {
      this.priority = newPriority;
    } else {
      console.error('Priority must be 1, 2, or 3');
    }
  }

  // Validates correct date object in future
  validateDueDate(date) {
    const dueDate = new Date(date);
    const now = new Date();

    return !isNaN(dueDate) && dueDate > now;
  }
}
