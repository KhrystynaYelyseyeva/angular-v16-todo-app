import { Component, OnInit } from '@angular/core';
import { Todo } from './types/todo';
import { TodosService } from './services/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  _todos: Todo[] = [];
  activeTodos: Todo[] = [];

  get todos() {
    return this._todos;
  }
  set todos(todos: Todo[]) {
    if (this._todos === todos) {
      return;
    }

    this._todos = todos;
    this.activeTodos = todos.filter(({ completed }) => !completed);
  }

  constructor(private todosSevice: TodosService) {}

  ngOnInit(): void {
    this.todosSevice.todos$.subscribe((todos) => (this.todos = todos));
  }

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  addTodo(title: string) {
    this.todosSevice.createTodo(title).subscribe();
  }

  renameTodo(todo: Todo, title: string) {
    this.todosSevice.updateTodo({ ...todo, title }).subscribe();
  }

  toggleTodo(todo: Todo) {
    this.todosSevice
      .updateTodo({ ...todo, completed: !todo.completed })
      .subscribe();
  }

  deleteTodo(todoId: number) {
    this.todosSevice.deleteTodo(todoId).subscribe();
  }
}
