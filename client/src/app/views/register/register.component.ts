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
  constructor(
    private titleService: Title,
    private translate: TranslateService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthenticateService,
    private userService: UserService) { }

  ngOnInit() {
    this.titleService.setTitle(this.translate.instant('REGISTER.PAGE_TITLE'));
  }

  goLoginPage() {
    this.router.navigate(['/login']);
  }

  doRegister() {
    this.userService.register(this.registerData).subscribe(
      resData => {
        if (resData.success) {
          this.toastr.success(this.translate.instant('COMMON.SUBMIT.SUCCESS'));
          this.loginData.email = this.registerData.email;
          this.loginData.password = this.registerData.password;
          this.userService.login(this.loginData).subscribe(
            res => {
              if (res.data && res.data.token) {
                const newSession = new SessionVM(res.data.token, res.data.role, res.data.name, res.data.email);
                this.authService.setSession(newSession);
                this.toastr.success(this.translate.instant('LOGIN.LOGIN_SUCESS'));
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
        this.toastr.error(this.translate.instant('COMMON.SUBMIT.FAILED'));
      });
  }
}
