import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ApproutingModule } from './approuter.module';
import { ApiService } from '../services/api';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/authservice/';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/userservice';
import { UnknownpageComponent } from './pages/unknownpage/unknownpage.component';
import { ManageuserComponent } from './pages/manageuser/manageuser.component';
import {AuthAdminGuardService, AuthGuardService} from '../services/authguard';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LandpageComponent } from './pages/landpage/landpage.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { AdminsideComponent } from './pages/adminside/adminside.component';
import { ConfirmDialogComponent } from './components/';
import { RegistrationDialogComponent } from './components';
import { MessageService } from '../services/messageservice';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MentorComponent } from './pages/mentor/mentor.component';
import { QuestionanswerDialogComponent } from './components/questionanswer-dialog/';
import { QuestionAnswerService } from '../services/question-answer';
import { QuestionDiscussComponent } from './pages/question-discuss/question-discuss.component';
import { ChatComponentComponent } from './components/chat-component/';
import { ConversationpageComponent } from './pages/conversationpage/conversationpage.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';

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
