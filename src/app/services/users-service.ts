import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = "http://localhost:3001/users";

  constructor(private http: HttpClient) {}

  getAll(){
    return this.http.get<Array<User>>(this.url);
  }

  addUser(user: User){
    return this.http.post<User>(this.url, user);
  }
  getOne(id: number){
    return this.http.get<User>(`${this.url}/${id}`);
  }
  deleteUser(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  editUser(id: number, user:User){
    const editUrl = `${this.url}/${id}`;
    return this.http.put(editUrl, user);
  }
}
