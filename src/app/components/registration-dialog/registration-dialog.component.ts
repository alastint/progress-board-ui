import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/userservice';

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
    public userService: UserService,
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

  /**
   * Function try to save changes or create user to backend
   * @param user
   */
  public trySave(user: any) {
      this.userService.signUp(user).subscribe(
        (resp: any) => {
          if (resp && resp.data && resp.data.authToken) {
            localStorage. setItem('currentUser', JSON.stringify(resp.data));
            console.log('Registration Sucsess');
            this.router.navigate([ '', 'home']);
          }
        },
        (err: any) => {
          console.log('err', err);
        }
      );
  }
}
