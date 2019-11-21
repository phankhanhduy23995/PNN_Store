import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users.routing.module';
import { UsersComponent } from './users.component';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [UsersComponent, IndexComponent],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
