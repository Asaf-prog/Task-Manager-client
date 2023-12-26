import { Component, OnInit } from "@angular/core";
import { TaskService } from "./services/task.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  constructor(private taskService: TaskService) {
    this.taskService.setTaskTypes();
  }
}
