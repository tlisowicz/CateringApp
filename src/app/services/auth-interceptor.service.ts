import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  private refreshTokenInProgress = false;
  private refreshTokenSubject = new BehaviorSubject(null);

  constructor(private auth: AuthService, private storageService: StorageService) { }

  addToken(req: HttpRequest<any>, token: string | null){
    if (!token) {
      return req;
    }
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return modifiedReq;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = this.auth.getState()?.token;
    const authReq = this.addToken(req, token);

    return next.handle(authReq).pipe(catchError(err => {
      if (err.status === 401) {
        return this.handle401Error(authReq, next);
      }
      return throwError(() => err);
  }));
}

  private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    console.log('trying to refresh token...')
    if (!this.refreshTokenInProgress) {
      this.refreshTokenInProgress = true;
      this.refreshTokenSubject.next(null);

      if (!this.auth.getState()) {
        return next.handle(req);
      }

      let state = this.auth.getState();
      return this.auth.refreshToken(state).pipe(
        switchMap((tokenResponse) => {
          console.log('token refreshed. New token: ' + tokenResponse.token + '')
          this.refreshTokenInProgress = false;
          this.refreshTokenSubject.next(tokenResponse.token);
          state.token = tokenResponse.token;
          this.storageService.set('userCredentials', JSON.stringify(state));
          return next.handle(this.addToken(req, tokenResponse.token));
        }),
        catchError((err) => {
          this.refreshTokenInProgress = false;
          this.auth.logOutUser();
          return throwError(() => err);
        }));
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addToken(req, token))));
  }
}