import { Component,
         OnInit } from '@angular/core';

import { PageHelper } from 'src/app/_core/index'

@Component({
  selector: 'ss-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    protected pageHelper: PageHelper
  ) { }

  // routerLink="getUrl('logout')"
  lookup: any
  urls: any

  ngOnInit(): void {
    this.lookup = this.pageHelper.lookup()
  }

}
