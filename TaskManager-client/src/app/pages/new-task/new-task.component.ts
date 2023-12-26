import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TaskService } from "../../services/task.service";
import { TaskDto, TaskType } from "../../shared/types/types";
import { Router } from "@angular/router";

@Component({
  selector: "app-new-task",
  templateUrl: "./new-task.component.html",
  styleUrl: "./new-task.component.css",
})
export class NewTaskComponent implements OnInit {
  taskForm: FormGroup;
  minDate: Date = new Date();
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.taskForm = this.fb.group({
      taskName: ["", [Validators.required, Validators.minLength(3)]],
      description: [""],
      taskDate: [null, Validators.required],
      taskType: ["", Validators.required],
      isRepeated: [false],
    });

    this.isLoading = false;
  }

  onSubmit() {
    // Create a FormData object
    const date = this.taskForm.get("taskDate").value;
    const formData: TaskDto = {
      Name: this.taskForm.get("taskName").value,
      Description: this.taskForm.get("description").value,
      TaskType: this.taskForm.get("taskType").value.id,
      IsRepeated: this.taskForm.get("isRepeated").value,
      startTime:
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        date.getDate().toString().padStart(2, "0"),
    };

    // Send form data to the server to create a new task
    this.taskService.createTask(formData).subscribe((newTask) => {
      //navigate to the task table page
      this.router.navigate(["/home"]);
    });
  }

  moveToTable() {
    //Move to create new task page
    this.router.navigate(["home"]);
  }
  
}
