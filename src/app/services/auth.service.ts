import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { User } from '../shared/user';
import { PersistanceType, StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ROOT: string = 'http://localhost:3000';

  userState: BehaviorSubject<any>;
  constructor(
    private http: HttpClient,
    private storageService: StorageService)
    { 
      this.userState = new BehaviorSubject<any>(this.getState());
    }

  setPersistanceType(type: PersistanceType)  {
  this.storageService.setPersistanceType(type);
  this.userState.next(this.getState());
  }

  getPersistanceType(): PersistanceType | null {
    return Number(localStorage.getItem('persistanceType')) ?? null;
  }

  registerUser(user: User): Observable<boolean> {
    const uri = "/users/new";
    const path = this.ROOT + uri;
    return this.http.post<boolean>(
      path, user, 
      {headers: {'Content-Type': 'application/json'}})
      .pipe(
        catchError(this.handleError)
        );
  }

  logInUser(email: string, password: string) {
    const uri = "/login";
    const path = this.ROOT + uri;
    this.http.post<any>(
      path, {email: email, password: password},
      {headers: {'Content-Type': 'application/json'}})
      .subscribe( {
         next: (state) => {
          this.storageService.set('userCredentials', JSON.stringify(state));
          this.userState.next(this.getState());
         },
         error: (err) => {}
      })
    return this.userState.asObservable();
  }

  handleError(handleError: any) {
    return of(false);    
  }

  logOutUser() {
    const uri = "/logout";
    const path = this.ROOT + uri;
    const user: string = this.getState().username;
    this.http.post<any>(path, {username: user}).subscribe(
      (response: string) =>{
        this.storageService.remove('userCredentials');
        this.userState.next(null);
      }
    )
  }

  refreshToken(userState: any) {
    const uri = "/auth/refresh";
    const path = this.ROOT + uri; 
    return this.http.post<any>(path, userState);
  }
  getState(): any {
    return JSON.parse(this.storageService.get('userCredentials'));
  }
}