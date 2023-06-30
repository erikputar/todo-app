import { TaskList } from "./taskList.js";

export class taskListDOM extends TaskList {
  constructor(elements) {
    super();
    this.fetchTasks();

    this.elements = elements;
    this.renderDate();
  }

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
}
