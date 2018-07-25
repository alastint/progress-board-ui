import { Component } from '@angular/core';
import { IAuthData } from '../../../shared/interfaces';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authservice';

@Component({
  selector: 'app-landpage',
  templateUrl: './landpage.component.html',
  styleUrls: ['./landpage.component.css']
})
export class LandpageComponent {
  public showRegist = false;
  public user: IAuthData = {email: '', password: ''};
  constructor(
    private router: Router,
    private authservice: AuthService,
  ) {}
  // Calling authorisation function from AuthService
  public auth(user) {
    this.authservice.authenticate(user).subscribe(
      (userdata: any) => {
        console.log('resp', userdata);
        if (userdata && userdata.data && userdata.data.authToken) {
          localStorage. setItem('currentUser', JSON.stringify(userdata.data));
          this.user.email = userdata.data.email;
          console.log('Login Sucsess');
          this.router.navigate([ '', 'home']);
        }
      },
      (err: any) => {
        console.log('err', err);
      }
    );
  }

  public registFunc() {
    console.log('confirm clicked');
    this.showRegist = false;
  }
  public reject() {
    console.log('reject clicked');
    this.showRegist = false;
  }
}
