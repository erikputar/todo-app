import { taskListDOM } from "./taskListDOM.js";

const dateHeading = document.getElementById("date-heading");
const tasksAmount = document.getElementById("tasks-amount");
const incompletedList = document.getElementById("incompleted-list");
const completedList = document.getElementById("completed-list");
const submitButton = document.getElementById("submit-button");
const addTaskForm = document.getElementById("add-task-form");

const taskList = new taskListDOM({
  dateHeading,
  tasksAmount,
  incompletedList,
  completedList,
  submitButton,
  addTaskForm,
});
