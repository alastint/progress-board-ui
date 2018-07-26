import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/userservice';
import {AuthService} from '../../../services/authservice';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.css']
})
export class RegistrationDialogComponent implements OnInit {
  public user: any = {};
  public passwordConfirm = {};
  @Input() options: any = {
    isOpen: false,
    title: '',
    message: '',
    confirm: false,
    reject: false,
    changed: false
  };
  @Input() targetItem: any = {};
  @Output() doConfirm: any = new EventEmitter();
  @Output() doReject: any = new EventEmitter();
  public isOpen = false;

  constructor(
    public router: Router,
    public _user: UserService,
    public authservice: AuthService
  ) { }

  public ngOnInit() {
    setTimeout(() => this.isOpen = this.options.isOpen, 50);
  }

  public do(action: string) {
    this.isOpen = false;
    setTimeout(() => {
      switch (action) {
        case 'confirm':
          this.doConfirm.next(this.targetItem);
          break;
        default:
          this.doReject.next();
          break;
      }
    }, 200);
  }
// Function try to save changes or create user to backend
  public trySave(user: any) {
      this._user.signUp(user).subscribe(
        (resp: any) => {
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
        },
        (err: any) => {
          console.log('err', err);
        }
      );
  }
}
