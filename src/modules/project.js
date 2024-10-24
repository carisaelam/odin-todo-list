import format from 'date-fns/format';
import { Validation } from './validation';
const validation = new Validation();

export class Project {
  constructor(title = 'New Project', tasks = []) {
    validation.validateProject({ title });
    this.title = title;
    this.tasks = tasks;
  }

  addTaskToProject(task) {
    task.project = this;
    this.tasks.push(task);
  }

  removeTaskFromProject(task) {
    this.tasks = this.tasks.filter((el) => el != task);
  }

  listTasks() {
    const tasks = [];
    this.tasks.forEach((task) => {
      console.log(task.title);
      console.log(format(task.dueDate, 'MM/dd/yyyy'));
      console.log(task.priority);
      tasks.push(task);
    });
    return tasks;
  }

  listCompletedTasks() {
    let completedTasks = [];
    this.tasks.forEach((task) => {
      if (task.isCompleted === true) {
        completedTasks.push(task);
      }
    });
    return completedTasks;
  }

  listIncompleteTasks() {
    let incompleteTasks = [];
    this.tasks.forEach((task) => {
      if (task.isCompleted === false) {
        incompleteTasks.push(task);
      }
    });
    return incompleteTasks;
  }

  findTaskByTitle(title) {
    const foundTask = this.tasks.find((task) => task.title === title);

    if (!foundTask) {
      throw new Error(`No task found with title ${title}`);
    }
    return foundTask;
  }
}
