import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BsModalRef } from '../../../../../node_modules/ngx-bootstrap/modal';

@Component({
  templateUrl: './confirm.component.html'
})
export class ConfirmComponent implements OnInit {
  title: string;
  content: string;

  onClose: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  submit() {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }
}
