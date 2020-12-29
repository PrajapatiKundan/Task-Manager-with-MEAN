import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

const routes: Routes = [
  { path:  '', redirectTo: '/signin', pathMatch: 'full'},//match the exact URL
  { path:  'lists', component:  TaskViewComponent},
  { path:  'signup', component:  SignUpComponent},
  { path:  'signin', component:  SignInComponent},
  { path:  'lists/:listId', component:  TaskViewComponent},
  { path:  'new-list', component:  NewListComponent},
  { path:  'lists/:listId/new-task', component:  NewTaskComponent},
  { path:  'edit-list/:listId', component:  EditListComponent},
  { path:  'edit-task/:listId/tasks/:taskId', component:  EditTaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
