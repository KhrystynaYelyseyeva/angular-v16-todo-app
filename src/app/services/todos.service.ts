import { Todo } from './../types/todo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, switchMap, tap } from 'rxjs';

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
  refetch$$ = new BehaviorSubject(null);
  todos$: Observable<Todo[]>;

  constructor(private http: HttpClient) {
    this.todos$ = this.refetch$$.pipe(switchMap(() => this.getTodos()));
  }

  getTodos() {
    return this.http.get<Todo[]>(`${API}/todos`);
  }

  createTodo(title: string) {
    return this.http
      .post<Todo>(`${API}/todos`, {
        id: Date.now(),
        title,
        completed: false,
      })
      .pipe(tap(() => this.refetch$$.next(null)));
  }

  updateTodo(todo: Todo) {
    return this.http
      .patch<Todo>(`${API}/todo/${todo}`, todo)
      .pipe(tap(() => this.refetch$$.next(null)));
  }

  deleteTodo(id: number) {
    return this.http
      .delete<number>(`${API}/todo/${id}`)
      .pipe(tap(() => this.refetch$$.next(null)));
  }
}
