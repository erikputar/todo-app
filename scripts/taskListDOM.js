import { TaskList } from "./taskList.js";

export class taskListDOM extends TaskList {
  constructor(elements) {
    super();
    this.fetchTasks();

    this.elements = elements;
    this.renderDate();
    this.renderPageTitle();
    this.renderTasksAmount();
    this.renderTasks();
    this.setupFormHandler();
    this.setupListItemHandler();
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

  // RENDERING DATA STRUCTURE

  renderTasks() {
    this.elements.incompletedList.innerHTML = "";
    this.elements.completedList.innerHTML = "";

    this.tasks.forEach((task) => {
      const taskHTML = this.createTaskHTML(task);

      if (task.isCompleted) {
        this.elements.completedList.prepend(taskHTML);
      } else {
        this.elements.incompletedList.prepend(taskHTML);
      }
    });
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
    const taskId = super.addTask(title, description);
    const task = super.getTaskById(taskId);
    this.renderTasksAmount();
    this.renderTasks(task);
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

  // CHECKBOX/LIST-ITEM HANDLER

  setupListItemHandler() {
    this.elements.incompletedList.addEventListener("change", (event) => {
      this.listItemHandler(event);
    });

    this.elements.completedList.addEventListener("change", (event) => {
      this.listItemHandler(event);
    });
  }

  listItemHandler(event) {
    if (!event.target.className.includes("checkbox")) {
      return;
    }

    const taskID = +event.target.closest("li").dataset.id;
    this.toggleTaskIsCompleted(taskID);
  }
}
