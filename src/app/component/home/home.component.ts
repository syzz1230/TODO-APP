import { Component } from '@angular/core';
import { ServicesService } from '../../service/services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  todoObj;
  todoArr;
  todoTitle;
  status;
  editTitle;
  searchedTodo;
  constructor(private service: ServicesService) {}

  ngOnInit() {
    this.getAllTodo();
  }

  editTitleHandler(editTitle) {

    this.todoTitle = editTitle;
    this.editTitle = editTitle;
  }

  getAllTodo() {

    this.service.getAllTodo().subscribe((res) => {
      (this.todoArr = res), (err) => console.log(err.message);
    });
  }

  addTask() {
    console.log(this.todoTitle);
    const taskObj = { title: this.todoTitle, status: 'incomplete' };
    this.service.addTask(taskObj).subscribe(
      (res) => //console.log(res),
      (err) => console.log(err.message)
    );
    this.ngOnInit();
    this.todoTitle = '';
  }

  editTodo(s, id) {
    if (s) {
      let status = s === 'complete' ? 'incomplete' : 'complete';
      this.service.editTodo({ status }, id).subscribe(
        (res) =>// console.log(res),
        (err) => console.log(err.message)
      );
    } else {
      this.service.editTodo({ title: this.todoTitle }, id).subscribe(
        (res) => //console.log(res),
        (err) => console.log(err.message)
      );
    }
    this.editTitleHandler('');
    this.ngOnInit();
    this.todoTitle = '';
  }

  deleteTodo(id) {
    this.service.deleteTodo(id).subscribe(
      (res) => //console.log(res),
      (err) => console.log(err.message)
    );
    this.ngOnInit();
  }

  searchTodoMethod() {
    this.service.getAllTodo().subscribe((res) => {
      {
        this.todoArr = res;
        const filterdTodo = this.todoArr.filter((todo) =>
          todo.title.toLowerCase().includes(this.searchedTodo.toLowerCase())
        );
        this.todoArr = filterdTodo;
      }
    });
  }
}
