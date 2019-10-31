import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { UserService } from 'src/app/services/user.service';
import { RegisterVM } from 'src/app/view-models/users/register-vm';
import { SessionVM } from 'src/app/view-models/session/session-vm';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { LoginVM } from 'src/app/view-models/users/login-vm';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  registerData: RegisterVM = new RegisterVM();
  loginData: LoginVM = new LoginVM();
  tilte: any;

  validUsername = { valid: true, message: '' };
  validEmail = { valid: true, message: '' };
  validPassword = { valid: true, message: '' };
  // validConfirmPassword = { valid: true, message: '' };

  constructor(
    private titleService: Title,
    private translate: TranslateService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthenticateService,
    private userService: UserService) { }

  ngOnInit() {
    this.titleService.setTitle(this.translate.instant('PAGE_TITLE.REGISTER'));
  }

  goLoginPage() {
    this.router.navigate(['/login']);
  }

  doRegister() {
    if (this.registerData.name && this.registerData.email && this.registerData.password) {
      this.userService.register(this.registerData).subscribe(
        resData => {
          if (resData.success) {
            this.toastr.success(this.translate.instant('REGISTER.REGISTER_SUCCESS'));
            this.loginData.email = this.registerData.email;
            this.loginData.password = this.registerData.password;
            this.userService.login(this.loginData).subscribe(
              res => {
                if (res.data && res.data.token) {
                  const newSession = new SessionVM(res.data.token, res.data.role, res.data.name, res.data.email);
                  this.authService.setSession(newSession);
                  this.toastr.success(this.translate.instant('LOGIN.LOGIN_SUCCESS'));
                  // if (newSession.role.code === RoleVM.ROLES.ADMIN) {
                  //   this.router.navigate(['/users']);
                  // } else {
                  //   this.router.navigate(['/dashboard']);
                  // }
                  this.router.navigate(['/dashboard']);
                } else {
                  this.toastr.error(res.message);
                }
              },
              error => {
                this.toastr.error(this.translate.instant('LOGIN.LOGIN_FAILED'));
              });
          } else {
            this.toastr.error(resData.message);
          }
        },
        error => {
          this.toastr.error(this.translate.instant('REGISTER.REGISTER_FAILED'));
        });
    } else {
      this.toastr.warning('Please fill out the form.', 'Warning');
    }
  }

  validateInput(event) {
    const value = event.target.value;
    switch (event.target.id) {
      case 'username':
        if (value === '') {
          this.validUsername.valid = false;
          this.validUsername.message = 'Please fill out this field.';
        } else {
          this.validUsername.valid = true;
        }
        break;
      case 'email':
        // tslint:disable-next-line:max-line-length
        const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (value === '') {
          this.validEmail.valid = false;
          this.validEmail.message = 'Please fill out this field.';
        } else {
          this.validEmail.valid = true;
          if (!validEmailRegEx.test(value)) {
            this.validEmail.valid = false;
            this.validEmail.message = 'Invalid email.';
          }
        }
        break;
      case 'password':
        const validPasswordRegEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        if (value === '') {
          this.validPassword.valid = false;
          this.validPassword.message = 'Please fill out this field.';
        } else {
          this.validPassword.valid = true;
          if (!validPasswordRegEx.test(value)) {
            this.validPassword.valid = false;
            // tslint:disable-next-line:max-line-length
            this.validPassword.message = 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.';
          }
        }
        break;
      /* case 'confirmPassword':
        if (value === '') {
          this.validConfirmPassword.valid = false;
          this.validConfirmPassword.message = 'Please fill out this field.';
        } else {
          this.validConfirmPassword.valid = true;
          if (value !== this.registerData.password) {
            this.validConfirmPassword.valid = false;
            this.validConfirmPassword.message = 'Password and confirm password do not match.';
          }
        }
        break; */
    }
  }

}
