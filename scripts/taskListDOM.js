import { TaskList } from "./taskList.js";

export class taskListDOM extends TaskList {
  constructor(elements) {
    super();
    this.fetchTasks();

    this.elements = elements;
    this.renderDate();
    this.renderPageTitle();
    this.renderTasksAmount();
    this.renderInitialTasks();
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
    const incompletedAmount = super.getIncompletedTasksAmount();
    const completedAmount = super.getCompletedTasksAmount();
    const content = `${incompletedAmount} incomplete,${completedAmount} complete`;

    this.elements.tasksAmount.textContent = content;
  }

  // RENDER INITIAL TASKS

  renderInitialTasks() {
    this.tasks.forEach((task) => {
      const taskHTML = this.createTaskHTML(task);

      if (task.isCompleted) {
        this.elements.completedList.append(taskHTML);
      } else {
        this.elements.incompletedList.append(taskHTML);
      }
    });
  }

  createTaskHTML(task) {
    const li = document.createElement("li");
    li.className = "list-item";
    const checkbox = `<input type="checkbox" ${
      task.isCompleted ? "checked" : ""
    } />`;
    const title = `<p>Title: ${task.title}</p>`;
    const description = `<p>Desc: ${task.description}</p>`;

    li.innerHTML = checkbox + title + description;

    return li;
  }
}
