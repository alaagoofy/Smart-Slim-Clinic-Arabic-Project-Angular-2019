import { Injectable } from '@angular/core';
import { RouterStateSnapshot, Router,CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth-service.service';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private checkuser : AuthService,private router : Router) { }

  canActivate( router, state :RouterStateSnapshot) {
    return this.checkuser.user$.pipe(map(
      user => {
        if (user) {

          return true;
        } else {
          this.router.navigate(['ar/login'], {queryParams : {returnURL : state.url}});
          return false ;
        }
      }
    ))
      }



}
