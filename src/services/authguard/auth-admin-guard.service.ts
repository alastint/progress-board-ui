import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable()
export class AuthAdminGuardService implements CanActivate {
  constructor(public router: Router) {
  }
  public getUserData() {
    // Retrieve data by key from local storage
    const userString: string = localStorage.getItem('currentUser');
    // Return user object if data in local storage exist, or empty object if no user data available
    return typeof userString === 'string' ? JSON.parse(userString) : {};
  }

  /**
   * Checking ofr key in storage
   * @returns {boolean}
   */
  canActivate(): boolean {
    const appUser = this.getUserData();
    console.log('appUser guard', appUser);
    if (!localStorage.getItem('currentUser') || !(appUser.role === 'super')) {
      this.router.navigate(['', 'home']);
    }
    return true;
  }
}

