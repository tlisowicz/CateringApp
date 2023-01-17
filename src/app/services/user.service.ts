import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ROOT = 'http://localhost:3000/users';
  ROLES = ['user', 'admin', 'dishManager'];
  constructor(
    private auth: AuthService,
    private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    const path = this.ROOT;
    return this.http.get<User[]>(path);
  }

  banUser(username: string): Observable<boolean> {
    const uri = "/ban";
    const path = this.ROOT + uri;
    return this.http.patch<boolean>(
      path, {username: username}, 
      {headers: {'Content-Type': 'application/json'}});
  }

  unbanUser(username: string): Observable<boolean> {
    const uri = "/unban";
    const path = this.ROOT + uri;
    return this.http.patch<boolean>(
      path, {username: username}, 
      {headers: {'Content-Type': 'application/json'}});
  }

  changeRoles(username: string, roles: string[]): Observable<boolean> {
    const uri = "/changeRoles";
    const path = this.ROOT + uri;
    return this.http.patch<boolean>(
      path, {username: username, roles: roles}, 
      {headers: {'Content-Type': 'application/json'}});
  }

  getRoles(): string[] {
    return this.ROLES;
  }
}
