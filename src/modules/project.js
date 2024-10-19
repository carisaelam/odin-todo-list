import format from 'date-fns/format';

export class Project {
  constructor(tasks = []) {
    this.tasks = tasks;
  }

  addTaskToProject(task) {
    this.tasks.push(task);
  }

  removeTaskFromProject(task) {
    this.tasks = this.tasks.filter((el) => el != task);
  }

  listTasks() {
    this.tasks.forEach((task) => {
      console.log(task.title);
      console.log(format(task.dueDate, 'MM/dd/yyyy'));
      console.log(task.priority);
      return task;
    });
  }

  listCompletedTasks() {
    this.tasks.forEach((task) => {
      if (task.isCompleted === true) {
        console.log(task.title);
      }
    });
  }

  listIncompleteTasks() {
    this.tasks.forEach((task) => {
      if (task.isCompleted === false) {
        console.log(task.title);
      }
    });
  }

  findTaskByTitle(title) {
    this.tasks.forEach((task) => {
      if (task.title === title) {
        console.log(task);
        return task;
      }
    });
  }
}
