import { Component,
         ChangeDetectorRef,
         HostListener,
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


// export class WindowDimensions {
//   innerHeight: number
//   innerWidth: number
//   visualViewport: any // height, width are attributes
//   // scrollX: number
//   // scrollY: number

//   leftBar1Offset: number
//   leftBar2Offset: number
//   leftBoundBar1Offset: number
//   leftBoundBar2Offset: number
//   close1Offset: number
//   close2Offset: number

//   isSm(): boolean {
//     return this.innerWidth < 570
//   }

//   isSmMain(): boolean {
//     return this.innerWidth < 900
//   }
// }



export class AppComponent implements OnInit, OnDestroy  {
  // title = 'deg-holiday-card-2022';

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef


  private visibleViewportValues: any

  windowDimensionsLocal: any
  windowDimensionsSubject: any


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


  // updateWindowDimensions(params={}) {
  //   let force = params['force']
  //   let updatedViewport = this.updateVisualViewport() // note: update VP before getNextWindowDimensions
  //   let dims = this.getNextWindowDimensions()

  //   this.windowDimensionsSubject.next(this.windowDimensionsLocal)
  // }

  // getNextWindowDimensions(): WindowDimensions {
  //   let nextWindowDimensions = new WindowDimensions()
  //   // console.log('IH vs VV', window.innerHeight, vv)
  //   nextWindowDimensions.visualViewport = Object.assign({}, this.visibleViewportValues)
  //   nextWindowDimensions.innerHeight =  window.innerHeight
  //   nextWindowDimensions.innerWidth = window.innerWidth

  //   // console.log('NWD', nextWindowDimensions)
  //   return nextWindowDimensions
  // }

  // viewportKeys() {
  //   return ['height', 'offsetLeft', 'offsetTop',
  //           'pageLeft', 'pageTop', 'scale', 'width']
  // }
  // viewportsAreSimilar(vp1, vp2) {
  //   if (!vp1 && !vp2) return true
  //   if (!vp1 || !vp2) return false
  //   let vpKeys = this.viewportKeys()
  //   for (let key of vpKeys) {
  //     if (vp1[key] !== vp2[key]) return false
  //   }
  //   return true
  // }
  // viewportFromParams(vpIn: any) {
  //   let vpOut = {}
  //   if (!vpIn) return vpOut
  //   for (let key of this.viewportKeys()) {
  //     vpOut[key] = vpIn[key]
  //   }
  //   return vpOut
  // }

  // updateVisualViewport(): boolean {
  //   let wvv = window['visualViewport']
  //   let sim = this.viewportsAreSimilar(this.visibleViewportValues, wvv)
  //   if (sim) return false
  //   this.visibleViewportValues = this.viewportFromParams(window['visualViewport'])// Object.assign({}, wvv)

  //   // console.log('vp', Date.now(), wvv, this.visibleViewportValues)
  //   return true // this.detectChanges()
  // }

  detectChanges() {
    if (!this.cdr['destroyed']) this.cdr.detectChanges()
  }
}
