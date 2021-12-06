import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserMainComponent } from './user/user-main/user-main.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { AdminDetailComponent } from './admin/admin-detail/admin-detail.component';
import { AdminCreateUserComponent } from './admin/admin-create-user/admin-create-user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: AdminMainComponent
  },
  {
    path: 'create-user',
    component: AdminCreateUserComponent
  },
  {
    path: 'admin-edit',
    component: AdminDetailComponent
  },
  {
    path: 'user',
    component: UserMainComponent
  },
  {
    path: 'user-edit',
    component: UserDetailComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    redirectTo:'/index',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
