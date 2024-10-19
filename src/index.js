import './style.css';

import { Task } from './modules/task.js';
import { Project } from './modules/project.js';

const task1 = new Task('First task', 'first description', '2024-12-31');
const task2 = new Task('Second task', 'second description', '2024-12-30');
const task3 = new Task('Third task', 'third description', '2024-12-29');
const task4 = new Task('Fourth task', 'fourth description', '2024-12-28');
const task5 = new Task('Fifth task', 'fifth description', '2024-12-20', 1);
const task6 = new Task('Sixth task', 'sixth description', '2024-12-18', 2);

const project1 = new Project();

project1.addTaskToProject(task1);
project1.addTaskToProject(task2);
project1.addTaskToProject(task3);
project1.addTaskToProject(task4);
project1.addTaskToProject(task5);
project1.addTaskToProject(task6);

task4.updateDueDate('2032-01-11');
task4.updatePriority(1);

project1.listTasks();
