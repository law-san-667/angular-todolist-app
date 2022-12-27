import { Component, Input, OnInit } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task-service';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login-service';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})

export class EditTaskComponent implements OnInit {
  faPen = faPenToSquare;
  taskToEdit:any = {};
  activeUser:any = undefined;

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private router: Router,
              private loginService:LoginService
) {}

  ngOnInit(): void {
    this.loginService.getAll().subscribe(data => {
      this.activeUser = data[0];
      if (this.activeUser == undefined){
        this.router.navigateByUrl("");
      }else{
        const taskId: number = +this.route.snapshot.params['id'];
        this.taskService.getOne(taskId).subscribe((data) => this.taskToEdit = data);
      }  
    });
    }

    editTask(form: NgForm){
      const task = form.value;
      if(task.libelle == "")
        task.libelle = this.taskToEdit.libelle;
      if(task.statut == "")
        task.statut = this.taskToEdit.statut;
      task.user = this.activeUser.login;
      this.taskService.editTask(this.taskToEdit.id, task).subscribe(() => {
      this.router.navigateByUrl("list");
    });
    }
}
