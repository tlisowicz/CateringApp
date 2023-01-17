import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  users: User[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit() {
    this.authService.userState.subscribe(userState => {
      if (userState) {
        this.userService.getUsers().subscribe(users => {
          this.users = users.filter(user => user.username !== userState.username)         
        });
      }
    });    
  }
}
