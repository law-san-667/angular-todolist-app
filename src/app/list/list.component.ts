import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../services/login-service';
import { TaskService } from '../services/task-service';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list!: any;
  faCheck = faCheckSquare;
  activeUser:any = null;
  
  constructor(private taskService: TaskService,
              private router: Router,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.getAll().subscribe(data => {
      this.activeUser = data[0]
      if (this.activeUser == null)
        this.router.navigateByUrl("");
      else{
        this.taskService.getAll().
        subscribe(tasks => this.list = tasks.filter((task:any) => (task.user == this.activeUser.login)))    
      }
  
    }
      );

  }
  displayEnded(){
    this.taskService.getAll().
    subscribe(tasks => this.list = tasks.filter((t: any )=> (t.statut == "Terminé" && t.user == this.activeUser.login)))
  }
  displayAll(){
    this.taskService.getAll().
    subscribe(tasks => this.list = tasks.filter((task:any) => (task.user == this.activeUser.login)))
  }
  displayNotStarted(){
    this.taskService.getAll().
    subscribe(tasks => this.list = tasks.filter((t: any )=> (t.statut == "En attente" && t.user == this.activeUser.login)))
  }
  displayInProgress(){
    this.taskService.getAll().
    subscribe(tasks => this.list = tasks.filter((t: any )=> (t.statut == "En cours" && t.user == this.activeUser.login)))
  }
}
