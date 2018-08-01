import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/userservice";

@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class ManageuserComponent implements OnInit {

  public user: any = {};
  public userUnchanged: any = {};
  public options: any = {
    changed: false,
    isNew: true
  };
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public userService: UserService
  ) { }

  public ngOnInit() {
    console.log('ngOnInit this.route', this.route);
    this.route.params.subscribe((param: any) => {
      if (param['id'] && param['id'] !== 'newUser') {
        this.requestUser(param['id']);
      }
    });
  }

  /**
   * request User by id from server
   * @param id
   */
  public requestUser(id: any) {
    if (id) {
      this.userService.getUserById(id).subscribe(
        (resp: any) => {
          console.log('resp', resp);
          if (resp && resp.data) {
            this.user = this.clone(resp.data);
            this.userUnchanged = this.clone(resp.data);
            this.options.isNew = false;
          }
        },
        (err: any) => {
          console.log('err', err);
        }
      );
    }
  }

  /**
   * route to admin userlist
   */
  public goBack() {
    this.router.navigate(['admin', 'userlist']);
  }

  /**
   * Delete user data from backend
   * @param id
   */
  public deleteUserData(id) {
    this.userService.deleteUser(id).subscribe(
      (resp: any) => {
        this.router.navigate(['admin', 'userlist']);
      },
      (err: any) => {
        console.log('err', err);
      }
    );
  }

  /**
   * Function try to save changes or create user to backend
   * @param user
   */
  public trySave(user: any) {
    if (user && user.id) {
      const changedUserData: any = this.getChanged(this.userUnchanged, this.user);
      this.userService.updateUser(changedUserData, user.id).subscribe(
        (resp: any) => {
          console.log('resp', resp);
          this.router.navigate([ 'admin', 'userlist']);
        },
        (err: any) => {
          console.log('err', err);
        }
      );
    } else {
      this.userService.createNewUser(user).subscribe(
        (resp: any) => {
          console.log('resp', resp);
          this.router.navigate([ 'admin', 'userlist']);
        },
        (err: any) => {
          console.log('err', err);
        }
      );
    }
  }

  /**
   * Function what create array with difference of unchanged data and changed
   */
  public onChange() {
    this.options.changed = !this.areEqual(this.user, this.userUnchanged);
    const changedObj: any = this.getChanged(this.userUnchanged, this.user);
    console.log('changedObj', changedObj);
  }

  /**
   * Checking did some field changed and add it to send for update
   * @param unchanged
   * @param changed
   * @returns {any}
   */
  private getChanged(unchanged: any, changed: any) {
    const diff: any = {};
    for (const prop in unchanged) {
      if (prop && prop !== 'authorizedCountry') {
        if (unchanged[prop] !== changed[prop]) {
          diff[prop] = changed[prop];
        }
      }
    }
    return diff;
  }

  private areEqual(a: any, b: any) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  private clone(sourceObj: any) {
    return JSON.parse(JSON.stringify(sourceObj));
  }

}
