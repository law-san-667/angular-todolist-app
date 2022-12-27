import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListComponent } from '../list/list.component';
import { TaskService } from '../services/task-service';
import {Task} from '../model/task';
import { LoginService } from '../services/login-service';
import { Router } from '@angular/router';
import { User } from '../model/user';


@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {
  @Output() taskToAdd:EventEmitter<any> = new EventEmitter();

  activeUser: any = undefined;

  constructor(private taskService:TaskService,
              private listComponent:ListComponent,
              private loginService: LoginService,
              private router: Router) { }

            
  ngOnInit(): void {
    this.loginService.getAll().subscribe(
      users => {
        if(users.length == 0){
          this.router.navigateByUrl("");
        }
        this.activeUser = users[0];
      });

  }

  addTask(form:NgForm): void {
    if (this.activeUser != undefined){
      const task:Task = new Task(0, form.value.libelle, "En attente", this.activeUser.login);
      this.taskService.addTask(task).subscribe(
        res => {
          console.log(res);
          this.taskService.getAll().
          subscribe(data => this.listComponent.list = data.filter((task:any) => (task.user == this.activeUser.login)));
        }
      ); 
      form.reset();      
    }else
    this.router.navigateByUrl(""); 
  }

  logout(){
    if(confirm("Are you sure you want to log out ?")){
      this.loginService.deleteUser(this.activeUser.id).subscribe(
        res => {
          console.log(res);
          this.router.navigateByUrl("");
        }
      );
    }
  }

}
