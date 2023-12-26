import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Task, TaskDto, TaskStatus, TaskType } from "../shared/types/types";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private apiUrl = "https://localhost:8080/TaskManager/";
  private taskTypes: TaskType[] = [];

  constructor(private http: HttpClient) {}

  getRelevantTasks(
    tasksType: TaskStatus,
    page: number,
    pageSize: number
  ): Observable<any> {
    const endPoint = "get_tasks";
    const params = {
      taskStatus: tasksType,
      page: page,
      pageSize: pageSize,
    };

    return this.http.get<any>(this.apiUrl + endPoint, {
      params,
      observe: "response",
    });
  }

  createTask(task: TaskDto): Observable<any> {
    const endPoint = "create_task";

    return this.http.post<TaskDto>(this.apiUrl + endPoint, task);
  }

  setTaskTypes() {
    const endPoint = "get_all_task_types";

    this.http.get<any>(this.apiUrl + endPoint).subscribe((taskTypes) => {
      this.taskTypes = taskTypes.map((taskType) => {
        return {
          id: taskType.item1,
          type: taskType.item2,
        };
      });
    });
  }

  completeTask(taskId: number, isActive: boolean): Observable<any> {
    const endPoint = "task_ended";
    const params = {
      taskId: taskId,
      isActive: isActive,
    };

    return this.http.post<any>(this.apiUrl + endPoint, null, { params });
  }

  deleteTask(taskId: number): Observable<any> {
    const endPoint = "delete_task";
    const params = {
      id: taskId,
    };

    return this.http.post<any>(this.apiUrl + endPoint, null, { params });
  }

  changeTaskStatus(taskId: number): Observable<any> {
    const endPoint = "move_task_toggle_archive";
    const params = {
      id: taskId,
    };

    return this.http.post<any>(this.apiUrl + endPoint, null, { params });
  }

  getTaskTypes() {
    return this.taskTypes;
  }
}
