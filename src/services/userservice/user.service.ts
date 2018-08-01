import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ApiService} from '../api';

@Injectable()
export class UserService {

  protected path = '/user';
  protected pathSingUp = '/signup';


  constructor(
    public api: ApiService
  ) {}

  /**
   * Get list of users
   * @returns {Observable<any>}
   */
  public getUsers(params?: string): Observable<any> {
    return this.api.get(`${this.path}${params || ''}`);
  }

  /**
   * Create new user
   * @param user
   * @returns {Observable<any>}
   */
  public createNewUser(user: any) {
    return this.api.post(`${this.path}`, user);
  }
  public updateUser(user: any, userId: number) {
    return this.api.put(`${this.path}/${userId}`, user);
  }
  /**
   * Sign Up function
   * @param user
   * @returns {Observable<HttpEvent<any>>}
   */
  public signUp(user: any) {
    return this.api.post(`${this.pathSingUp}`, user);
  }
  /**
   * Get one user by id
   * @param {number | string} id
   * @returns {Observable<any>}
   */
  public getUserById(id: number | string): Observable<any> {
    return this.api.get(`${this.path}/${id}`);
  }

  /**
   * Delete user by id
   * @param {number} id
   * @returns {Observable<any>}
   */
  public deleteUser(id: number) {
    return this.api.delete(`${this.path}/${id}`);
  }
}
