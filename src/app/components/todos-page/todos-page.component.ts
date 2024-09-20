import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { TodosService } from 'src/app/services/todos.service';
import { Status } from 'src/app/types/status';
import { Todo } from 'src/app/types/todo';

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.scss'],
})
export class TodosPageComponent implements OnInit {
  todos$ = this.todosSevice.todos$;
  completedTodos$ = this.todos$.pipe(
    map((todos) => todos.filter((todo) => todo.completed))
  );
  activeTodos$ = this.todos$.pipe(
    map((todos) => todos.filter((todo) => !todo.completed))
  );
  activeCount$ = this.activeTodos$.pipe(map((todos) => todos.length));
  visibleTodos$ = this.route.params.pipe(
    switchMap((params) => {
      switch (params['status'] as Status) {
        case 'active':
          return this.activeTodos$;
        case 'completed':
          return this.completedTodos$;
        default:
          return this.todos$;
      }
    })
  );

  constructor(
    private todosSevice: TodosService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
