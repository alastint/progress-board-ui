import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingpageComponent} from './landingpage/landingpage.component';
import {LoginpageComponent} from './loginpage/loginpage.component';
import {UnknownpageComponent} from './unknownpage/unknownpage.component';
import {BasecoverComponent} from './basecover/basecover.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserslistComponent} from './userslist/userslist.component';
import {ManageuserComponent} from './manageuser/manageuser.component';
import {AuthGuardService} from '../services/authguard';
import {ContactComponent} from './contact/contact.component';
import {CvcoverComponent} from './cvcover/cvcover.component';
import {AboutComponent} from './about/about.component';
import {SkillsComponent} from './skills/skills.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'land', pathMatch: 'full' },
  { path: 'login', component: LoginpageComponent },
  { path: 'unknown', component: UnknownpageComponent },

  { path: '', component: CvcoverComponent,
    children: [
      { path: 'land', component: LandingpageComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'about', component: AboutComponent },
      { path: 'skills', component: SkillsComponent },
    ],
  },

  { path: 'admin', component: BasecoverComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent },
      {path: 'userlist', component: UserslistComponent },
      {path: 'manageuser/:id', component: ManageuserComponent },
    ],
    canActivate: [ AuthGuardService ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class ApproutingModule {

}
