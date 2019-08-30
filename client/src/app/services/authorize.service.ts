import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { AuthenticateService } from './authenticate.service';

import { SessionVM } from '../view-models/session/session-vm';
import { RoleVM } from '../view-models/roles/role-vm';

@Injectable()
export class AuthorizeService implements CanActivate {
  private session: SessionVM;

  constructor(private authService: AuthenticateService,
              private router: Router,
              private toastr: ToastrService,
              private translate: TranslateService) {
    this.authService.session$.subscribe(data => { this.session = data; });
  }

  canActivate(activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles: Array<string> = activatedRoute.data.roles;

    if (this.session && this.session.token) {
      if (expectedRoles == null || expectedRoles.includes(this.session.role.code)) {
        return true;
      }
    }
    this.updateRedirectRoute(state);
    return false;
  }

  updateRedirectRoute(state: RouterStateSnapshot) {
    if (this.session) {
      this.toastr.error(this.translate.instant('AUTHORIZE.FAILED'));
      if (this.session.role.code === RoleVM.ROLES.ADMIN) {
        this.router.navigate(['/users']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    } else {
      // Store the attempted URL for redirecting & navigate to login page
      this.authService.redirectUrl = state.url;
      this.router.navigate(['/login']);
    }
  }
}
