import { Component, Input, OnInit } from '@angular/core';
import { adminNavItems } from '../nav/admin';
import { hrNavItems } from '../nav/manager';
import { employeeNavItems } from '../nav/employee';
import { userNavItems } from '../nav/user';
import { AuthenticateService } from '../../services/authenticate.service';
import { SessionVM } from '../../view-models/session/session-vm';
import { RoleVM } from '../../view-models/roles/role-vm';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public navItems = [];
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  public session: SessionVM;
  currentYear: number;
  constructor(
    private authService: AuthenticateService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService) {
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(this.element as Element, {
      attributes: true
    });
  }

  ngOnInit() {
    this.currentYear = (new Date()).getFullYear();

    this.authService.session$.subscribe(
      data => {
        this.session = data;
        if (this.session && this.session.token != null && this.session.role != null) {
          switch (this.session.role.code) {
            case RoleVM.ROLES.ADMIN: {
              this.navItems = adminNavItems;
              break;
            }
            case RoleVM.ROLES.MANAGER: {
              this.navItems = hrNavItems;
              break;
            }
            case RoleVM.ROLES.EMPLOYEE: {
              this.navItems = employeeNavItems;
              break;
            }
            default: {
              this.navItems = userNavItems;
              break;
            }
          }
        } else {
          this.navItems = [];
        }
      }
    );
  }

  logout() {
    this.authService.clearSession();
    this.toastr.success(this.translate.instant('LOGOUT.SUCCESS'));
    this.router.navigate(['/login']);
  }
}
