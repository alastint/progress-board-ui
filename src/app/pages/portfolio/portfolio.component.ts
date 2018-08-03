import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/userservice";
import {Router} from "@angular/router";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  public userUnchanged: any = {};
  public user = {
    fullname: '',
    firstName: '',
    lastName: '',
    country: '',
    email: '',
    phoneNumber1: '',
    phoneNumber2: '',
    company: '',
    gender: '',
    companyName: '',
    id: ''
  };
  public visibility: boolean = true;
  public options: any = {
    changed: false,
  };

  constructor(
    public userService: UserService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadData()
  }
  public loadData() {
    this.user = this.userService.getUserData();
    console.log('this.user data', this.user)
  }

  public toggle(){
    this.visibility=!this.visibility;
  }

  /**
   * Function try to save changes or create user to backend
   * @param user
   */
  public trySaveProfile(user: any) {
    console.log('user', user);
    if (user && user.id) {
      const changedUserData: any = this.getChanged(this.userUnchanged, this.user);
      this.userService.updateUser(changedUserData, user.id).subscribe(
        (resp: any) => {
          console.log('resp', resp);
          this.visibility = true;
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
