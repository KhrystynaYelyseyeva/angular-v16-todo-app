import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FilterActivePipe } from './pipes/filter-active.pipe';
import { TodoComponent } from './components/todo/todo.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { MessageComponent } from './components/message/message.component';
import { TodosPageComponent } from './components/todos-page/todos-page.component';

const routes: Routes = [
  { path: 'todos', component: TodosPageComponent },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutModule),
  },
  { path: '**', redirectTo: '/todos', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoFormComponent,
    FilterActivePipe,
    MessageComponent,
    TodosPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
