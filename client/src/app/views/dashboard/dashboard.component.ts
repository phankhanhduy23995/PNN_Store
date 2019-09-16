import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  constructor(
    private titleService: Title,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.translate.instant('PAGE_TITLE.DASHBOARD'));
  }
}
