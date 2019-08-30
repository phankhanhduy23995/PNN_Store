import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-test-khoapham',
  templateUrl: './test-khoapham.component.html',
  styles: []
})
export class TestKhoaphamComponent implements OnInit {
  an = true;
  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line:only-arrow-functions
    $(function() {
      $('#slider').slider();
    });
  }

  validateEmail(email) {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  XuLy(f) {
    if (!this.validateEmail(f.form.value.username)) {
      this.an = false;
      console.log(this.an);
    } else {
      this.an = false;
      console.log(this.an);
    }
  }
}
