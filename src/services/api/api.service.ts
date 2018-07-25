import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ApiService implements OnInit {

  public headers: HttpHeaders = new HttpHeaders({});

  // API endpoint url and details. Should be adjusted for new projects.
  protected apiUrl = 'https://progress-board-server.herokuapp.com/api/';
  protected prefix = 'v1';
  protected endpoint: string = this.apiUrl + this.prefix;

  constructor(
    public http: HttpClient
  ) {}

  /**
   * Invoke logic on service initiation
   */
  public ngOnInit() {
    // Set initial headers required by server side
    this.headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-type': 'application/json'
    });
  }

  /**
   * Retrieve user data from local storage if it exist
   * @returns {{}}
   */
  public getCurrentUser() {
    // Retrieve data by key from local storage
    const userString: string = localStorage.getItem('currentUser');
    // Return user object if data in local storage exist, or empty object if no user data available
    return typeof userString === 'string' ? JSON.parse(userString) : {};
  }

  /**
   * GET request middleware for other services
   * @param {string} path
   * @returns {Observable<any>}
   */
  public get(path: string): Observable<HttpResponse<any>> {
    return this.http.get(`${this.endpoint}${path}`, this.getDefaultOptions())
      .pipe(map(this.checkForError))
      .pipe(catchError(this.catchErr))
      .pipe(map(this.getJson));
  }

  /**
   * POST request middleware for other services
   * @param {string} path
   * @param body
   * @param options
   * @returns {Observable<any>}
   */
  public post(path: string, body: any, options?: any): Observable<HttpEvent<any>> {
    return this.http.post(`${this.endpoint}${path}`, body, this.getDefaultOptions(options))
      .pipe(map(this.checkForError))
      .pipe(catchError(this.catchErr))
      .pipe(map(this.getJson));
  }

  /**
   * PUT request middleware for other services
   * @param {string} path
   * @param body
   * @returns {Observable<any>}
   */
  public put(path: string, body: any): Observable<any> {
    return this.http.put(`${this.endpoint}${path}`, JSON.stringify(body), this.getDefaultOptions())
      .pipe(map(this.checkForError))
      .pipe(catchError(this.catchErr))
      .pipe(map(this.getJson));
  }

  /**
   * DELETE request middleware for other services
   * @param {string} path
   * @returns {Observable<any>}
   */
  public delete(path: string): Observable<any> {
    return this.http.delete(`${this.endpoint}${path}`, this.getDefaultOptions())
      .pipe(map(this.checkForError))
      .pipe(catchError(this.catchErr))
      .pipe(map(this.getJson));
  }

  /**
   * Parse 'string' type response body due to server response type, or return as is if not string
   * Required for getting valid object in other services
   * @param r
   * @returns {any}
   */
  public getJson(r: any) {
    console.log('getJson r', r);
    return r && r._body && r._body.length ? r.json() : r;
  }

  /**
   * Check response status code and provide required action
   * @param resp
   * @returns {HttpResponse<any>}
   */
  public checkForError(resp: any): HttpResponse<any> {
    console.log('checkForError resp', resp);
    if (resp.status >= 500) {
      return resp;
    } else if ((resp.status >= 200 && resp.status < 300) || !resp.status) {
      return resp;
    } else if (resp.status === 401) {
      const error = new Error(resp.statusText);
      error['response'] = resp;
      this.tryRefreshToken();
      // throwError(error);
    } else {
      const error = new Error(resp.statusText);
      error['response'] = resp;
      throwError(error);
    }
  }

  /**
   * Try to get valid authToken with existing refreshToken from server
   * Specific for some API's and my be removed/not used in others if 'refresh token' functionality is not implemented on server side
   */
  public tryRefreshToken() {
    const userStr: any = localStorage.getItem('currentUser');
    const userObj: any = userStr ? JSON.parse(userStr) : {};
    if (userObj.refreshToken) {
      this.post(`${this.prefix}/refresh_token`, { token: userObj.refreshToken }).subscribe(
        (resp: any) => {
          if (resp && resp.data) {
            userObj.authToken = resp.data.authToken;
            userObj.refreshToken = resp.data.refreshToken;
            localStorage.setItem('currentUser', userObj);
          }
        },
        (err: any) => {
          // this.router.navigate([ '', 'home' ]);
        }
      );
    } else {
      // this.router.navigate([ '', 'home' ]);
    }
  }

  /**
   * Catch and throw Error if it occurs in server response
   * @param err
   * @returns {Observable<never>}
   */
  public catchErr(err: any) {
    console.log('catchErr err', err);
    if (err && err._body && typeof err._body === 'string') {
      const errBody: any = JSON.parse(err._body);
      err.message = errBody && errBody.error && errBody.error.message ?
        errBody.error.message : 'Error.';
      return throwError(err);
    } else {
      return err;
    }
  }

  /**
   * Update request headers
   * Add authorization token if it exist or apply optional headers if provided in param
   * @param optionalHeaders
   * @returns {{headers: HttpHeaders}}
   */
  protected getDefaultOptions(optionalHeaders?: any) {
    // Retrieve application user object if exist
    const appUser: any = this.getCurrentUser();
    // Create default headers object with 'common' properties
    const headersObj: any = {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    };
    // Check if user is authorized and has a authToken
    if (appUser && appUser.authToken) {
      // Update headers with authorization token property
      headersObj.Authorization = 'Bearer ' + appUser.authToken;
    }
    return { headers: new HttpHeaders(optionalHeaders || headersObj) };
  }
}
