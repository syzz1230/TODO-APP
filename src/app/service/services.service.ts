import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  serviceURL;
  constructor(private http: HttpClient) {
    this.serviceURL = 'http://localhost:3000/todo';
  }

  getAllTodo() {
    return this.http.get(this.serviceURL);
  }
  addTask(taskObj) {
    return this.http.post(this.serviceURL, taskObj);
  }

  editTodo(taskObj, id) {
    return this.http.patch(`${this.serviceURL}/${id}`, taskObj);
  }

  deleteTodo(id) {
    return this.http.delete(`${this.serviceURL}/${id}`);
  }
}
