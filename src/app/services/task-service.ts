import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url: string = "http://localhost:3002/list";

  constructor(private http: HttpClient) {}

  getAll(){
    return this.http.get<Array<Task>>(this.url);
  }

  addTask(task: Task){
    return this.http.post<Task>(this.url, task);
  }
  getOne(id: number){
    return this.http.get<Task>(`${this.url}/${id}`);
  }
  deleteTask(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  editTask(id: number, task:Task){
    const editUrl = `${this.url}/${id}`;
    return this.http.put(editUrl, task);
  }
}
