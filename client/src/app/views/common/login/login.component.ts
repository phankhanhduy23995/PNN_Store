import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

import { AuthenticateService } from 'src/app/services/authenticate.service';
import { UserService } from 'src/app/services/user.service';
import { SessionVM } from 'src/app/view-models/session/session-vm';
import { LoginVM } from 'src/app/view-models/users/login-vm';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  model: LoginVM = new LoginVM();
  session: SessionVM;

  constructor(
    private titleService: Title,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
    private translate: TranslateService,
    private authService: AuthenticateService) { }

  ngOnInit() {
    this.titleService.setTitle('PNN - Login');

    this.authService.session$.subscribe(
      data => {
        this.session = data;
        if (this.session && this.session.token != null) {
          this.router.navigate(['/']);
        }
      }
    );
  }

  doLogin() {
    if (this.model.email && this.model.password) {
      this.userService.login(this.model).subscribe(
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
      this.toastr.error(this.translate.instant('Please complete all information!'));
    }
  }

  goRegisterPage() {
    this.router.navigate(['/register']);
  }
}
