import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { InputTextModule } from "primeng/inputtext";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { NewTaskComponent } from "./pages/new-task/new-task.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CardModule } from "primeng/card";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { TaskTableComponent } from "./components/task-table/task-table.component";
import { FormsModule } from "@angular/forms";
import { HomeComponent } from "./pages/home/home.component";
import { TaskService } from "./services/task.service";
import { DropdownModule } from "primeng/dropdown";
import { AppRoutingModule } from "./app-routing.module";
import { CalendarModule } from "primeng/calendar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CheckboxModule } from "primeng/checkbox";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { SelectButtonModule } from "primeng/selectbutton";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewTaskComponent,
    TaskTableComponent,
    HomeComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    TableModule,
    FormsModule,
    ButtonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CardModule,
    CalendarModule,
    DropdownModule,
    BrowserAnimationsModule,
    InputTextModule,
    CheckboxModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    SelectButtonModule,
    CommonModule,
  ],
  providers: [TaskService],
  bootstrap: [AppComponent],
})
export class AppModule {}
