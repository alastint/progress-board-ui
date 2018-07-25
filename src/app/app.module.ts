import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ApproutingModule} from './approuter.module';
import {ApiService} from '../services/api';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthService} from '../services/authservice/';
import {FormsModule} from '@angular/forms';
import {UserService} from '../services/userservice';
import { UnknownpageComponent } from './pages/unknownpage/unknownpage.component';
import { ManageuserComponent } from './pages/manageuser/manageuser.component';
import {AuthGuardService} from '../services/authguard';
import {Angular2FontawesomeModule} from 'angular2-fontawesome';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LandpageComponent } from './pages/landpage/landpage.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { AdminsideComponent } from './pages/adminside/adminside.component';
import { ConfirmDialogComponent } from './components/';
import { RegistrationDialogComponent } from './components';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    RegistrationDialogComponent,
    LandpageComponent,
    UnknownpageComponent,
    ManageuserComponent,
    RecoveryComponent,
    HomepageComponent,
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
