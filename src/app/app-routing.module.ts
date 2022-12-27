import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ListComponent } from './list/list.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';

const routes: Routes = [
  {"path" : "" , component: LoginFormComponent},
  {"path" : "register", component: RegisterFormComponent},
  {"path" : "edit/:id", component: EditTaskComponent},
  {"path" : "list", component: ListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
