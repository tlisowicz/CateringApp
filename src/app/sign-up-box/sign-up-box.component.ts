import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { PasswordValidators } from '../shared/FormFieldsValidators';
import { User } from '../shared/user';

@Component({
  selector: 'app-sign-up-box',
  templateUrl: './sign-up-box.component.html',
  styleUrls: ['./sign-up-box.component.css']
})
export class SignUpBoxComponent {
  @Output() hideMe = new EventEmitter<boolean>();
  response: boolean = false;
  created: boolean = false;
  message: string = "";
  constructor(
    private fb: FormBuilder,
    private authService: AuthService) {}

  signInData = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', 
    Validators.compose([
      Validators.required,
      Validators.minLength(8),
      PasswordValidators.patternValidator(new RegExp("(?=.*[0-9])"), {
        requiresDigit: true
      }),
      PasswordValidators.patternValidator(new RegExp("(?=.*[A-Z])"), {
        requiresUppercase: true
      }),
      PasswordValidators.patternValidator(new RegExp("(?=.*[a-z])"), {
        requiresLowercase: true
      }),
      PasswordValidators.patternValidator(new RegExp("(?=.*[$@^!%*?&])"), {
        requiresSpecialChars: true
      }),
      PasswordValidators.matchValidator("confirmPassword", true)
    ])
    ],
    confirmPassword: ['', [Validators.required, PasswordValidators.matchValidator("password")]],
  });

  get email() { return this.signInData.get('email'); }
  get username() { return this.signInData.get('username'); }
  get password() { return this.signInData.get('password'); }
  get confirmPassword() { return this.signInData.get('confirmPassword'); }

  get passwordValid() {
    return this.signInData.controls.password.errors === null;
  }

  get requiredValid() {
    return !this.signInData.controls.password.hasError("required");
  }

  get minLengthValid() {
    return !this.signInData.controls.password.hasError("minlength");
  }

  get requiresDigitValid() {
    return !this.signInData.controls.password.hasError("requiresDigit");
  }

  get requiresUppercaseValid() {
    return !this.signInData.controls.password.hasError("requiresUppercase");
  }

  get requiresLowercaseValid() {
    return !this.signInData.controls.password.hasError("requiresLowercase");
  }

  get requiresSpecialCharsValid() {
    return !this.signInData.controls.password.hasError("requiresSpecialChars");
  }

  get passwordMatch() {
    return this.signInData.controls.confirmPassword.hasError("matching");
  }

  hide() {
    this.hideMe.emit(true);
  }

  onSubmit() {
    if (this.signInData.invalid) {
      alert("Some fields are invalid");
      return;
    }
    this.authService.registerUser(this.makeUser()).subscribe(
      (data) => {
        if (data) {
          this.response = true;
          this.created = true;
          this.message = "Account created!";
          setTimeout(() => {
            this.hide();
          }, 3000);
          
        } else {
          this.message = "Email or username already exists in the database";
          this.response = true;
          setTimeout(() => {
            this.response = false;
          }, 3000);

        }
      }
    );
  }

  makeUser(): User {
    return {
      email: this.signInData.value.email,
      username: this.signInData.value.username,
      password: this.signInData.value.password,
      roles: ["user"],
      isBaned: false,
    } as User;
  }
}
