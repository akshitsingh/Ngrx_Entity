import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path : '',
    component : ReactiveFormComponent
  },
  {
    path : 'profile',
    component : UserDataComponent
  },
  {
    path : '**',
    component : ReactiveFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
