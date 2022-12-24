import { Component,
         ChangeDetectorRef,
         OnInit,
         OnDestroy,
         ViewChild,
         ViewContainerRef } from '@angular/core';

// import { LazyLoaderService } from '../_core';

import { LazyLoaderService } from 'src/app/_core/index'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy  {
  // title = 'deg-holiday-card-2022';

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef

  constructor(
    private cdr: ChangeDetectorRef,
    private lazyLoaderService: LazyLoaderService
    // private pageService: PageService
  ) {}

  ngOnInit() {
    this.loadComponent('book')
    // this.update()
    // this.mapOpen$ = this.mapOpenStream()
  }

  ngOnDestroy() {

  }

  loadComponent(moduleKey: string) {
    return this.lazyLoaderService.getModule(moduleKey).then((mod) => {
      return this.lazyLoaderService.compileModule(this.container, mod).then(component => {
        // console.log('loaded?', component)
        this.detectChanges()
      })
    })
  }

  detectChanges() {
    if (!this.cdr['destroyed']) this.cdr.detectChanges()
  }
}
