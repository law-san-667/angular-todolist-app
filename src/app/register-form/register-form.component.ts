import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { User } from '../model/user';
import { LoginService } from '../services/login-service';
import { UserService } from '../services/users-service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  faCheck = faCheckSquare;
  listUsers:any = null;

  constructor(private usersService: UserService,
    private loginService: LoginService,
    private router:Router) { }

  ngOnInit(): void {
    
  }

  register(form: NgForm){
    const login = form.value.login;
    const password = form.value.password;
    const rePassword = form.value.re_password;

    this.usersService.getAll().subscribe(
      users => {
        this.listUsers = users.filter((user:any) => (user.login == login && user.password == password));
        console.log(users);

        const user: User  = new User(login, password);
        if(password == rePassword && this.listUsers[0] == null){
          this.usersService.addUser(user).subscribe(
            res => {
              console.log(res)
              this.loginService.addUser(user).subscribe(
                res => {
                  console.log(res);
                  this.router.navigateByUrl("list");
                });
            }
          );
        }else if(this.listUsers != null && password == rePassword){
          alert("Cet utilisateur existe déjà !");
          form.reset();        
        }
        else{
          alert("Veuillez correctement remplir le formulaire !");
          form.reset();
        }  
    });

  }

}
