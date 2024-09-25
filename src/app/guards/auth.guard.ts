import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})

export class AuthGuard implements CanActivate {
    constructor(private router:Router,private authService:AuthService){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(!this.authService.isLoggedIn()){
            this.router.navigate(['login']);
        }
        return this.authService.isLoggedIn();
    }
}