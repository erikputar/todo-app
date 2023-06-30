import { TaskList } from "./taskList.js";

export class taskListDOM extends TaskList {
  constructor(elements) {
    super();
    super.fetchTasks();

    this.elements = elements;
    this.renderDate();
    this.renderPageTitle();
    this.renderTasksAmount();
    this.renderTasks();
    this.setupFormHandler();
    this.setuplistSectionHandler();
  }

  // RENDERING COMPUTED VALUES

  renderDate() {
    this.elements.dateHeading.textContent = this.getCurrentDate();
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

  renderPageTitle() {
    document.title = `${this.getCurrentDate()} | TODO app`;
  }

  renderTasksAmount() {
    const incompletedAmount = super.getIncompletedTasksAmount();
    const completedAmount = super.getCompletedTasksAmount();
    const content = `${incompletedAmount} incomplete,${completedAmount} complete`;

    this.elements.tasksAmount.textContent = content;
  }

  // RENDERING DATA STRUCTURE

  renderTasks() {
    this.elements.incompletedList.innerHTML = "";
    this.elements.completedList.innerHTML = "";

    this.tasks.forEach((task) => this.renderTask(task));
  }

  renderTask(task) {
    const taskHTML = this.createTaskHTML(task);
    if (task.isCompleted) {
      this.elements.completedList.prepend(taskHTML);
    } else {
      this.elements.incompletedList.prepend(taskHTML);
    }
  }

  createTaskHTML(task) {
    const li = document.createElement("li");
    li.className = "list-item";
    li.dataset.id = task.id;
    const checkbox = `<input type="checkbox" class="checkbox" ${
      task.isCompleted ? "checked" : ""
    } />`;
    const title = `<p>Title: ${task.title}</p>`;
    const description = `<p>Desc: ${task.description}</p>`;

    li.innerHTML = checkbox + title + description;

    return li;
  }

  // ACTIONS

  addTask(title, description) {
    super.addTask(title, description);
    this.renderTasksAmount();
    this.renderTasks();
  }

  toggleTaskIsCompleted(taskId) {
    super.toggleTaskIsCompleted(taskId);
    this.renderTasksAmount();
    this.renderTasks();
  }

  // SETUP FORM

  setupFormHandler() {
    this.elements.addTaskForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const { taskTitle, taskDescription } = this.getFormData();
      this.addTask(taskTitle, taskDescription);

      event.target.reset();
    });
  }

  getFormData() {
    const formData = new FormData(this.elements.addTaskForm);
    const taskTitle = formData.get("title");
    const taskDescription = formData.get("description");

    return { taskTitle, taskDescription };
  }

  // CHECKBOX/LIST-ITEM/LIST-SECTION HANDLER

  setuplistSectionHandler() {
    this.elements.incompletedList.addEventListener("change", (event) => {
      this.listSectionHandler(event);
    });

    this.elements.completedList.addEventListener("change", (event) => {
      this.listSectionHandler(event);
    });
  }

  listSectionHandler(event) {
    const parentListItem = event.target.closest(".list-item");
    const taskID = Number(parentListItem.dataset.id);
    this.toggleTaskIsCompleted(taskID);
  }
}
