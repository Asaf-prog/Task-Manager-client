import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  constructor(private router: Router) {}

  moveToCreation() {
    //Move to create new task page
    this.router.navigate(["new-task"]);
  }

}
