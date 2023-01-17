import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent {
  @Output() hideMe = new EventEmitter<boolean>();
  message = '';
  showMessage: boolean = false;
  loginSuccessful: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService) {}

  triedToSubmit: boolean = false;

  logInData = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })


  onSubmit() {
    this.triedToSubmit = true;
    if (this.logInData.invalid) {
      return;
    }
    this.authService.logInUser(this.logInData.value.email!, this.logInData.value.password!);
    setTimeout(() => {this.authService.userState.subscribe((userCredentials) => {
        if (userCredentials) {
          this.message = 'Login successful!';
          this.loginSuccessful = true;
          this.showMessage = true;
          setTimeout(() => {
            this.router.navigate(['/menu']);
          }, 2000);
        }
        else {
          this.message = 'Failed to log in. Please try again.';
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        }
      });
    }, 100);
  }

  hide() {
    this.hideMe.emit(true);
  }

  get email() { return this.logInData.get('email'); }
  get password() { return this.logInData.get('password'); }
}
