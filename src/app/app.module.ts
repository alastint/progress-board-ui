import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ApproutingModule} from './approuter.module';
import {ApiService} from '../services/api';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthService} from '../services/authservice/auth.service';
import {FormsModule} from '@angular/forms';
import {UserService} from '../services/userservice';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { UnknownpageComponent } from './unknownpage/unknownpage.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import {AuthGuardService} from '../services/authguard';
import {Angular2FontawesomeModule} from 'angular2-fontawesome';
import { RecoveryComponent } from './recovery/recovery.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LandpageComponent } from './landpage/landpage.component';
import { ProgressComponent } from './progress/progress.component';
import { AdminsideComponent } from './adminside/adminside.component';
import { ConfirmDialogComponent } from './components/';
import { RegistrationDialogComponent } from './components';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    RegistrationDialogComponent,
    LoginpageComponent,
    UnknownpageComponent,
    ManageuserComponent,
    RecoveryComponent,
    HomepageComponent,
    LandpageComponent,
    ProgressComponent,
    AdminsideComponent,

  ],
  imports: [
    Angular2FontawesomeModule,
    ApproutingModule,
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    HttpClientModule,
    HttpClient,
    ApiService,
    UserService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
