import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from './types/todo';

const todos = [
  { id: 1, title: 'HTML + CSS', completed: true },
  { id: 2, title: 'JS', completed: false },
  { id: 3, title: 'React', completed: false },
  { id: 4, title: 'Vue', completed: false },
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  todos = todos;

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  addTodo(title: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    };

    this.todos = [...this.todos, newTodo];
  }

  renameTodo(todoId: number, title: string) {
    this.todos = this.todos.map((todo) => {
      if (todoId === todo.id) {
        return { ...todo, title };
      }

      return todo;
    });
  }

  completeTodo(todoId: number) {
    this.todos = this.todos.map((todo) => {
      if (todoId === todo.id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });
  }

  deleteTodo(todoId: number) {
    this.todos = this.todos.filter((todo) => todoId !== todo.id);
  }
}
