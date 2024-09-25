import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Constants} from '../constants'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public router:Router) { }
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
  login({email,password}:any) :Observable<any>{
    if (email === Constants.userInfo.email && password === Constants.userInfo.password) {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      return of({ name: 'User', email: Constants.userInfo.email });
    }
    return throwError(new Error('Failed to login'));
  }
  }

