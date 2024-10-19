export class Task {
  constructor(title, description, dueDate, priority = 3, isCompleted = false) {
    (this.title = title),
      (this.description = description),
      (this.dueDate = dueDate),
      (this.priority = priority),
      (this.isCompleted = isCompleted);
    this.createdAt = new Date();
  }

  toggleComplete() {
    this.isCompleted = !this.isCompleted;
  }

  updateTitle(newTitle) {
    this.title = newTitle;
  }

  updateDescription(newDescription) {
    this.description = newDescription;
  }

  updateDueDate(newDueDate) {
    this.dueDate = newDueDate;
  }

  updatePriority(newPriority) {
    this.priority = newPriority;
  }
}
