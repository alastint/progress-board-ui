import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginpageComponent} from './loginpage/loginpage.component';
import {UnknownpageComponent} from './unknownpage/unknownpage.component';
import {ManageuserComponent} from './manageuser/manageuser.component';
import {AuthGuardService} from '../services/authguard';
import {LandpageComponent} from './landpage/landpage.component';
import {ProgressComponent} from './progress/progress.component';
import {RecoveryComponent} from './recovery/recovery.component';
import {HomepageComponent} from './homepage/homepage.component';
import {AdminsideComponent} from './adminside/adminside.component';



const appRoutes: Routes = [
  { path: 'land', component: LandpageComponent },
  { path: '', redirectTo: 'land', pathMatch: 'full' },
  { path: 'login', component: LoginpageComponent,
      children: [
        { path: 'recovery', component: RecoveryComponent },
      ],
    },
  { path: 'unknown', component: UnknownpageComponent },

  { path: 'home/:id', component: HomepageComponent,
    children: [
      { path: '', component: ProgressComponent },
    ],
  },

  { path: 'admin', component: AdminsideComponent,
    children: [
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
