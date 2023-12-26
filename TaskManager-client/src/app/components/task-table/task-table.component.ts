import { Component, OnInit } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { Task, TaskStatus } from "../../shared/types/types";
import { ConfirmationService, ConfirmEventType } from "primeng/api";

@Component({
  selector: "app-task-table",
  templateUrl: "./task-table.component.html",
  styleUrls: ["./task-table.component.css"],
  providers: [ConfirmationService],
})
export class TaskTableComponent implements OnInit {
  columns = [
    { field: "id", header: "ID" },
    { field: "type", header: "Type" },
    { field: "name", header: "Name" },
    { field: "description", header: "Description" },
    { field: "taskStartDate", header: "Task Start Date" },
    { field: "taskEndDate", header: "Task End Date" },
    { field: "isRepeated", header: "Is Cyclic" },
    { field: "isEnded", header: "Task Ended" },
    { field: "isArchive", header: "Is Archive" },
    { field: "updateStatus", header: "Update Status" },
    { field: "deleteTask", header: "Delete Task" },
    { field: "action", header: "Action" },
  ];
  tasks: Task[] = [];
  selectedTasks: Task[] = [];
  tasksType: TaskStatus = TaskStatus.Active;
  statusTypeOptions = [
    { label: "All", value: TaskStatus.All },
    { label: "Active", value: TaskStatus.Active },
    { label: "Archive", value: TaskStatus.Archived },
  ];
  tasksCount: number = 0;
  isLoading: boolean = false;

  constructor(
    private taskService: TaskService,
    private confirmationService: ConfirmationService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.taskService.setTaskTypes();
    // GET all the relevant tasks from the DB according to the tasksType(All, Active, Archive)
    this.getRelevantTasks();
  }

  onPageChange(event: any) {
    this.getRelevantTasks(event.first / event.rows + 1, event.rows);
  }

  getRelevantTasks(page: number = 1, pageSize: number = 10) {
    this.isLoading = true;

    this.taskService
      .getRelevantTasks(this.tasksType, page, pageSize)
      .subscribe((response) => {
        this.tasksCount = response.body.totalCount;

        this.tasks = response.body.tasks.map((task) => {
          return {
            id: task.idDate,
            type: this.taskService
              .getTaskTypes()
              .find((type) => type.id === task.taskType),
            name: task.name,
            description: task.description,
            taskStartDate: task.startTime,
            taskEndDate: task.endTime,
            isRepeated: task.isRepeated,
            isArchive: task.isArchive,
          };
        });

        this.isLoading = false;
      });
  }

  completeTask(task: Task, isActive: boolean = false) {
    this.isLoading = true;

    this.taskService.completeTask(task.id, isActive).subscribe((response) => {
      this.getRelevantTasks();
    });
  }

  confirmRepeatedTask(task: Task) {
    this.confirmationService.confirm({
      header: "Repeated Task",
      message: "Are you want to repeat this task?",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.completeTask(task, true);
      },
      reject: () => {
        this.completeTask(task, false);
      },
    });
  }

  deleteTask(task: Task) {
    this.isLoading = true;

    this.taskService.deleteTask(task.id).subscribe((response) => {
      this.getRelevantTasks();
    });
  }

  changeTaskStatus(task: Task) {
    this.isLoading = true;

    this.taskService.changeTaskStatus(task.id).subscribe((response) => {
      this.getRelevantTasks();
    });
  }

  checkWeekPast(taskEndDate: Date): boolean {
    let today = new Date();
    let weekPast = new Date();
    let endDate = new Date(taskEndDate);

    weekPast.setDate(today.getDate() - 7);

    return endDate < weekPast;
  }
}
