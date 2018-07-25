import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/userservice';

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
    public _user: UserService
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
      this._user.createNewUser(user).subscribe(
        (resp: any) => {
          console.log('resp', resp);
          this.router.navigate([ '', 'home']);
        },
        (err: any) => {
          console.log('err', err);
        }
      );
  }
}
