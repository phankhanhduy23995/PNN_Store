import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { PaginationComponent } from './pagination/pagination.component';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    TranslateModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    PaginationComponent,
    ConfirmComponent
  ],
  entryComponents: [
    ConfirmComponent,
  ],
  declarations: [
    PaginationComponent,
    ConfirmComponent
  ]
})
export class SharedModule { }
