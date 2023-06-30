import { TaskList } from "./taskList.js";

export class taskListDOM extends TaskList {
  constructor(elements) {
    super();
    this.fetchTasks();

    this.elements = elements;
    this.renderDate();
    this.renderPageTitle();
    this.renderTasksAmount();
  }

  // RENDERING COMPUTED VALUES

  getCurrentDate() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    return formattedDate;
  }

  renderDate() {
    this.elements.dateHeading.textContent = this.getCurrentDate();
  }

  renderPageTitle() {
    document.title = `${this.getCurrentDate()} | TODO app`;
  }

  renderTasksAmount() {
    const incompletedAmount = this.getIncompletedTasksAmount();
    const completedAmount = this.getCompletedTasksAmount();
    const content = `${incompletedAmount} incomplete,${completedAmount} complete`;

    this.elements.tasksAmount.textContent = content;
  }

  // RENDER INITIAL TASKS

  renderInitialCompletedTasks() {}

  createTaskHTML(task) {
    const li = document.createElement("li");
    const checkbox = `<input type="checkbox" ${
      task.isCompleted ? "checked" : ""
    } />`;
    const title = `<p>Title: ${task.title}</p>`;
    const description = `<p>Desc: ${task.description}</p>`;

    li.append(checkbox, title, description);
  }
}
