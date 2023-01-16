import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  private refreshTokenInProgress = false;
  private refreshTokenSubject = new BehaviorSubject(null);

  constructor(private auth: AuthService) { }

  addToken(req: HttpRequest<any>){
    const state = this.auth.userState.value;
    if (!state) {
      return req;
    }
    const token = state.token;
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return modifiedReq;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // return next.handle(this.addToken(req)).pipe(
    //   catchError((err) => {
    //     if (err && err.status === 401) {
    //       if (this.refreshTokenInProgress) {
    //         return this.refreshTokenSubject.asObservable();
    //       }
    //       const refreshToken = this.auth.userState.value.refreshToken;
    //       next.handle(this.addToken(refreshToken));
    //     }
    //   }
    // )
    return next.handle(this.addToken(req));
  }

  
}
