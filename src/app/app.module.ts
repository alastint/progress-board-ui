import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ApproutingModule} from './approuter.module';
import {ApiService} from '../services/api';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthService} from '../services/authservice/auth.service';
import {FormsModule} from '@angular/forms';
import {UserService} from '../services/userservice';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { UnknownpageComponent } from './unknownpage/unknownpage.component';
import { BasecoverComponent } from './basecover/basecover.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserslistComponent } from './userslist/userslist.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import {AuthGuardService} from '../services/authguard';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { CvcoverComponent } from './cvcover/cvcover.component';
import { SkillsComponent } from './skills/skills.component';
import {Angular2FontawesomeModule} from 'angular2-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    LoginpageComponent,
    UnknownpageComponent,
    BasecoverComponent,
    DashboardComponent,
    UserslistComponent,
    ManageuserComponent,
    ContactComponent,
    AboutComponent,
    CvcoverComponent,
    SkillsComponent,

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
