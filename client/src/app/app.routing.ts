import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthorizeService } from './services/authorize.service';
import { RoleVM } from './view-models/roles/role-vm';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: '404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: '500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthorizeService],
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthorizeService],
        data: { roles: [RoleVM.ROLES.EMPLOYEE, RoleVM.ROLES.USER, RoleVM.ROLES.MANAGER, RoleVM.ROLES.ADMIN] },
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
