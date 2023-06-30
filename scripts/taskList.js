export class TaskList {
  // data structures
  tasks = [];

  constructor() {}

  fetchTasks() {
    this.tasks = [
      {
        id: 1,
        title: "Task1",
        description: "Task 1 description",
        isCompleted: false,
      },
      {
        id: 2,
        title: "Task2",
        description: "Task 2 description",
        isCompleted: false,
      },
      {
        id: 3,
        title: "Task3",
        description: "Task 3 description",
        isCompleted: true,
      },
    ];
  }

  // computed values

  getTasksByCompletedStatus(completedStatus) {
    const filteredTasks = [];
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].isCompleted === completedStatus) {
        filteredTasks.push(this.tasks[i]);
      }
    }

    return filteredTasks;
  }

  getCompletedTasks() {
    return this.getTasksByCompletedStatus(true);
  }

  getTasksStatusText() {
    return [this.getIncompletedTasksAmount(), this.getCompletedTasksAmount()];
  }

  getCompletedTasksAmount() {
    const completedTasks = this.getCompletedTasks();
    return completedTasks.length;
  }

  getIncompletedTasks() {
    return this.getTasksByCompletedStatus(false);
  }

  getIncompletedTasksAmount() {
    const incompletedTasks = this.getIncompletedTasks();
    return incompletedTasks.length;
  }

  // actions

  getTaskById(taskId) {
    return this.tasks.find((t) => t.id === taskId);
  }

  toggleTaskIsCompleted(taskId) {
    const task = this.getTaskById(taskId);
    if (task != null) {
      task.isCompleted = !task.isCompleted;
    }
  }

  addTask(title, description) {
    this.tasks.push({
      id: this.tasks.length + 1,
      title: title,
      description: description,
      isCompleted: false,
    });
  }
}
