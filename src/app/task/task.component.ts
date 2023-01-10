import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { ListComponent } from '../list/list.component';
import { LoginService } from '../services/login-service';
import { TaskService } from '../services/task-service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task!: any;

  faTrash = faTrash;
  faInfo = faInfoCircle;
  faEdit = faPencilAlt;
  activeUser:any = null;


  constructor(private taskService:TaskService,
              private router: Router,
              private listComponent: ListComponent,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.getAll().subscribe(
      res => {
        this.activeUser = res[0];
        if(this.activeUser == null)
          this.router.navigateByUrl("");
      });
    }

  onDelete(){

    if(this.activeUser  == null)
      this.router.navigateByUrl("");

    if(confirm("Are you sure you want to delete ?")){
      this.taskService.deleteTask(this.task.id).subscribe(
        res => {
          console.log(res);
          this.taskService.getAll().
          subscribe(data =>{
             this.listComponent.list = data.filter((t:any) => t.user == this.activeUser.login);
             this.listComponent.nbTasks = this.listComponent.list.length;
             this.listComponent.endedTasks = this.listComponent.list.filter((task:any) => (task.statut == "Terminé")).length;
             this.listComponent.currentTasks = this.listComponent.list.filter((task:any) => (task.statut == "En cours")).length;
             this.listComponent.unstartedTasks = this.listComponent.list.filter((task:any) => (task.statut == "En attente")).length;   
             });  
        });  
    }
  }
  onEdit(){
    
    if(this.activeUser  == null)
      this.router.navigateByUrl("");

    this.router.navigateByUrl("edit/" + this.task.id);
  }

}
