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
    return this.tasks.filter((task) => task.isCompleted === true);
  }

  listIncompleteTasks() {
    return this.tasks.filter((task) => task.isCompleted === false);
  }

  findTaskByTitle(title) {
    const foundTask = this.tasks.find((task) => task.title === title);

    if (!foundTask) {
      throw new Error(`No task found with title ${title}`);
    }
    return foundTask;
  }
}
