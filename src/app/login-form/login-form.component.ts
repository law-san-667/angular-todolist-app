import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../services/login-service';
import { UserService } from '../services/users-service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  faCheck = faCheckSquare;
  listUsers:any = null;

  constructor(private usersService: UserService,
              private loginService: LoginService,
              private router:Router) { }

  ngOnInit(): void {
  }

  log_in(form: NgForm){
    const login = form.value.login;
    const password = form.value.password;

    this.usersService.getAll().
    subscribe(users => {  
      this.listUsers = users.filter((user:any) => (user.login == login && user.password == password))
    
      if(this.listUsers.length > 0) {
        this.loginService.addUser(this.listUsers[0]).subscribe(
          res => {
            console.log(res); 
            console.log(this.listUsers);
            this.router.navigateByUrl("list");
          })
      }else{
        alert("Informations incorrectes !");
        form.reset();
      }
  
    })

  }
}
