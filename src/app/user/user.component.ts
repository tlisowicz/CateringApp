import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

 @Input() user: User = {} as User;
  possibleRoles: string[] = [];
  username: string = "";
 constructor(
  private userService: UserService,
  private auth: AuthService  ) { }

 ngOnInit() {
  this.auth.userState.subscribe(userState => {
    if (userState) {
      this.username = userState.username;
    }
  });

  this.possibleRoles = this.userService.getRoles();
 }

 banOrUnban() {
  const baned = this.user.isBaned;
  if (baned) {
    this.userService.unbanUser(this.user.username).subscribe({
      next: () => {
        this.user.isBaned = false,
        alert("User unBaned")
      },
      error: (err) => alert("Error unbaning user try again.")
    });
  }
  else {
    this.userService.banUser(this.user.username).subscribe({
      next: () => {
        this.user.isBaned = true,
        alert("User baned")
      },
      error: (err) => alert("Error baning user try again.")
    });
  }
 }

 changeRoles(role: string, del: boolean) {
   
  const roles = this.user.roles;
  if (del) {
    roles.splice(roles.indexOf(role), 1);
  }
  else {
    roles.push(role);
  }
  this.userService.changeRoles(this.user.username, roles).subscribe({
    next: () => this.user.roles = roles,
    error: (err) => alert("Error changing roles try again.")
  });
 }
}
