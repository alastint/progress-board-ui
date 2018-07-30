import {IAuthData} from '../../shared/interfaces';
import {Injectable} from '@angular/core';
import {ApiService} from '../api';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()

export class AuthService {
  // public logged = false;
  public user: IAuthData = {email: '', password: ''};

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  // Authenticate function
  public authenticate(data: IAuthData): Observable <any> {
    console.log('data', data);
    return this.api.post('/signin', {email: data.email, password: data.password})
      .pipe(map((resp: any) => {
        console.log('auth resp in service', resp);
        return resp;
      }));
  }
              // log out func, delete user from storage
  public logOutFunk() {
    localStorage.removeItem('currentUser');
    if (!localStorage.getItem('currentUser')) {
      console.log('Log out sucsess');
      this.router.navigate([ '', 'land']);
    }
  }
}
