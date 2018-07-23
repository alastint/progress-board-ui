import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public router: Router) {
  }

  /**
   * Checking ofr key in storage
   * @returns {boolean}
   */
  canActivate(): boolean {
    // if (!localStorage.getItem('currentUser')) {
    //   this.router.navigate(['', 'land']);
    //   return false;
    // }
    return true;
  }
}

