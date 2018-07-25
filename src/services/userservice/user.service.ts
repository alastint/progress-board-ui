import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ApiService} from '../api';

@Injectable()
export class UserService {

  protected path = '/user';

  constructor(
    public api: ApiService
  ) {}

  /**
   * Create new user
   * @param user
   * @returns {Observable<any>}
   */
  public createNewUser(user: any) {
    return this.api.post(`${this.path}`, user);
  }
}
