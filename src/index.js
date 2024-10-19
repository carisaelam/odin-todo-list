import './style.css';

import { Task } from './modules/task.js';
import { Project } from './modules/project.js';

const task1 = new Task('First task', 'first description', '2024-12-31');
const task2 = new Task('Second task', 'second description', '2024-12-30');
const task3 = new Task('Third task', 'third description', '2024-12-29');
const task4 = new Task('Fourth task', 'fourth description', '2024-12-28');

const project1 = new Project();

project1.addTaskToProject(task1);
project1.addTaskToProject(task2);
project1.addTaskToProject(task3);
project1.addTaskToProject(task4);

task2.toggleComplete();

project1.listTasks();
