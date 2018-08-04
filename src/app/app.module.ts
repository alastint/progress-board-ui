import { Angular2FontawesomeModule } from 'angular2-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ApproutingModule } from './approuter.module';

import {
  ApiService,
  AuthAdminGuardService,
  AuthGuardService,
  AuthService,
  MessageService,
  QuestionAnswerService,
  UserService
} from '../services';

import {
  ConfirmDialogComponent,
  ChatComponentComponent,
  RegistrationDialogComponent,
  QuestionanswerDialogComponent
} from './components';

import {
  UnknownpageComponent,
  ManageuserComponent,
  UserListComponent,
  RecoveryComponent,
  QuestionDiscussComponent,
  ProgressComponent,
  PortfolioComponent,
  MentorComponent,
  LandpageComponent,
  HomepageComponent,
  AdminsideComponent,
  ConversationpageComponent,
  DashboardComponent
} from './pages';

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
    DashboardComponent,
    MentorComponent,
    QuestionanswerDialogComponent,
    QuestionDiscussComponent,
    ChatComponentComponent,
    ConversationpageComponent,
    UserListComponent,
    PortfolioComponent,
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
    AuthGuardService,
    MessageService,
    QuestionAnswerService,
    AuthAdminGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
