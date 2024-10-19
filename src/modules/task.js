export class Task {
  constructor(title, description, dueDate, isCompleted = false) {
    (this.title = title),
      (this.description = description),
      (this.dueDate = dueDate),
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
}
