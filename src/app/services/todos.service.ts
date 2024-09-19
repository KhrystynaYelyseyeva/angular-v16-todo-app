import { Todo } from './../types/todo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  Subject,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';

// const todos: Todo[] = [
//   { "id": 1, "title": "HTML + CSS", "completed": true },
//   { "id": 2, "title": "JS", "completed": false },
//   { "id": 3, "title": "React", "completed": false },
//   { "id": 4, "title": "Vue", "completed": false },
// ];
const API = 'https://angular-todo-app.free.beeceptor.com';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private todos$$ = new BehaviorSubject<Todo[]>([]);

  todos$ = this.todos$$.asObservable();

  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<Todo[]>(`${API}/todos`).pipe(
      tap((todos) => {
        this.todos$$.next(todos);
      })
    );
  }

  createTodo(title: string) {
    return this.http
      .post<Todo>(`${API}/todos`, {
        id: Date.now(),
        title,
        completed: false,
      })
      .pipe(
        withLatestFrom(this.todos$$),
        tap(([createdTodo, todos]) => {
          this.todos$$.next([...todos, createdTodo]);
        })
      );
  }

  updateTodo(todo: Todo) {
    return this.http.patch<Todo>(`${API}/todo/${todo.id}`, todo).pipe(
      withLatestFrom(this.todos$$),
      tap(([updatedTodo, todos]) => {
        this.todos$$.next(
          todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
        );
      })
    );
  }

  deleteTodo(id: number) {
    return this.http.delete<number>(`${API}/todo/${id}`).pipe(
      withLatestFrom(this.todos$$),
      tap(([_, todos]) => {
        this.todos$$.next(todos.filter((todo) => todo.id !== id));
      })
    );
  }
}
