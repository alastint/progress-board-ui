import { Injectable } from '@angular/core';
import { ApiService } from '../api';
import { Observable } from "rxjs/index";
import { HttpResponse } from "@angular/common/http";

@Injectable()
export class MessageService {
  protected messagePath = '/message';
  //
  constructor(
    public api: ApiService,
  ) { }

  /**
   * take user data from local storage
   * @returns {{}}
   */
  public getUserData() {
    // Retrieve data by key from local storage
    const userString: string = localStorage.getItem('currentUser');
    // Return user object if data in local storage exist, or empty object if no user data available
    return typeof userString === 'string' ? JSON.parse(userString) : {};
  }



  /**
   * get message by id from server
   * @param {string} params
   * @returns {Observable<HttpResponse<any>>}
   */
  public getMessage(params: string): Observable<HttpResponse<any>> {
    return this.api.get(`${this.messagePath}${params || ''}`);
  }

  /**
   * post message to the server
   * @param userId
   * @param text
   * @returns {Observable<HttpEvent<any>>}
   */
  public postMessage(userId: number, text: string) {
    return this.api.post(`${this.messagePath}`, {text: text, userId: userId});
  }

  /**
   * post news to the server
   * @param userId
   * @param text
   * @param {string} status
   * @returns {Observable<HttpEvent<any>>}
   */
  public postNews(userId: any, text: any, status: string) {
    return this.api.post(`${this.messagePath}`, {text: text, userId: userId, status: status});
  }
}
