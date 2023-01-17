import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.userState.pipe(
      map(userState => {
        //prevent user from accessing logIn page if already logged in
        if (userState) {
          if (next.url[0].path === "logIn"){
            this.router.navigate(['/menu']);
            return false;
          }
        }
        //prevent user from accessing order-history page if not logged in       
        if (next.url.length >1) {
          if (next.url[1].path === 'order-history') {
            if (!userState) {
              this.router.navigate(['/logIn']);
              return false;
            }
            //prevent user from accessing other user's order-history page
            if (next.url[0].path !== userState.username && !userState.roles.includes("admin") &&!userState.roles.includes("dishManager")) {
              this.router.navigate(['/menu']);
              return false;
            }
          }
        }
        //prevent user from accessing cart page if not logged in     
        if (next.url[0].path === "cart" || next.url[0].path === "dish-details") {
          if (!userState) {
            this.router.navigate(['/logIn']);
            return false;
          }
        }

        //prevent user from accessing admin pages if not logged in or not admin
        //backend authorization demo
        if (next.url[0].path == "add" || next.url[0].path == "dishManagement") {
          if (!userState) {
            this.router.navigate(['/logIn']);
            return false;
          }
          if (!userState.roles.includes("admin") && !userState.roles.includes("dishManager")) {
            this.router.navigate(['/menu']);
            return false;
          }
        }

        if (next.url[0].path === "adminView") {
          if (!userState) {
            this.router.navigate(['/logIn']);
            return false;
          }
          if (!userState.roles.includes("admin")) {
            this.router.navigate(['/menu']);
            return false;
          }
        }
    return true;
      }));
    }
}
