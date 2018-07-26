import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ApiService} from '../api';
import {HttpResponse} from '@angular/common/http';

@Injectable()
export class UserService {

  protected path = '/user';
  protected message = '/message';
  protected pathSingUp = '/signup';

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

  /**
   * Sign Up function
   * @param user
   * @returns {Observable<HttpEvent<any>>}
   */
  public signUp(user: any) {
    return this.api.post(`${this.pathSingUp}`, user);
  }

  public getMessage(params: string): Observable<HttpResponse<any>> {
    return this.api.get(`${this.message}${params || ''}`);
  }
}
