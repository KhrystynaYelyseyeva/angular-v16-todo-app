import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { TodosService } from 'src/app/services/todos.service';
import { Todo } from 'src/app/types/todo';

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.scss'],
})
export class TodosPageComponent implements OnInit {
  _todos: Todo[] = [];
  activeTodos: Todo[] = [];
  errorMessage = '';

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

  constructor(
    private todosSevice: TodosService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.todosSevice.todos$.subscribe((todos) => (this.todos = todos));
    this.todosSevice.getTodos().subscribe({
      error: () => this.messageService.showMessage('Unable to load todos'),
    });
  }

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  addTodo(title: string) {
    this.todosSevice.createTodo(title).subscribe({
      error: () => this.messageService.showMessage('Unable to add a todo'),
    });
  }

  renameTodo(todo: Todo, title: string) {
    this.todosSevice.updateTodo({ ...todo, title }).subscribe({
      error: () => this.messageService.showMessage('Unable to update the todo'),
    });
  }

  toggleTodo(todo: Todo) {
    this.todosSevice
      .updateTodo({ ...todo, completed: !todo.completed })
      .subscribe({
        error: () =>
          this.messageService.showMessage('Unable to update the todo'),
      });
  }

  deleteTodo(todoId: number) {
    this.todosSevice.deleteTodo(todoId).subscribe({
      error: () => this.messageService.showMessage('Unable to delete the todo'),
    });
  }
}
