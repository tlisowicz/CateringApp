import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-or-log-in',
  templateUrl: './sign-or-log-in.component.html',
  styleUrls: ['./sign-or-log-in.component.css']
})
export class SignOrLogInComponent {

  constructor() { }

  hideLogIn: boolean = false;
  hideSignUp: boolean = true;

  showLogHideSingn() {
    this.hideLogIn = false;
    this.hideSignUp = true;
  }

  showSignHideLog() {
    this.hideLogIn = true;
    this.hideSignUp = false;
  }

}
