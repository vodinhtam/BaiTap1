import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { UserMainComponent } from './user/user-main/user-main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminDetailComponent } from './admin/admin-detail/admin-detail.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { AdminEditUserComponent } from './admin/admin-edit-user/admin-edit-user.component';
import { AdminListUserComponent } from './admin/admin-list-user/admin-list-user.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminCreateUserComponent } from './admin/admin-create-user/admin-create-user.component';
import { LoginModalComponent } from './login-modal/login-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminMainComponent,
    UserMainComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminDetailComponent,
    UserDetailComponent,
    AdminEditUserComponent,
    AdminListUserComponent,
    AdminCreateUserComponent,
    LoginModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
