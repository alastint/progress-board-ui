import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnknownpageComponent } from './pages/unknownpage/unknownpage.component';
import { ManageuserComponent } from './pages/manageuser/manageuser.component';
import {AuthAdminGuardService, AuthGuardService} from '../services/authguard';
import { LandpageComponent } from './pages/landpage/landpage.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AdminsideComponent } from './pages/adminside/adminside.component';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { MentorComponent } from "./pages/mentor/mentor.component";
import { QuestionDiscussComponent } from "./pages/question-discuss/question-discuss.component";
import {ConversationpageComponent} from "./pages/conversationpage/conversationpage.component";
import {UserListComponent} from "./pages/user-list/user-list.component";



const appRoutes: Routes = [
  { path: 'land', component: LandpageComponent },
  { path: '', redirectTo: 'land', pathMatch: 'full' },
  { path: 'recovery', component: RecoveryComponent },
  { path: 'home', component: HomepageComponent,
    children: [
      { path: '', component: DashboardComponent  },
      { path: 'progress', component: ProgressComponent },
      { path: 'mentor', component: MentorComponent },
      { path: 'discuss/:id', component: QuestionDiscussComponent },
      { path: 'conversations', component: ConversationpageComponent },
    ],
    canActivate: [ AuthGuardService ]
  },

  { path: 'admin', component: AdminsideComponent,
    children: [
      {path: 'userlist', component: UserListComponent },
      {path: 'manageuser/:id', component: ManageuserComponent },
    ],
    canActivate: [ AuthAdminGuardService ]
  },
  { path: '**', component: UnknownpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class ApproutingModule {

}
