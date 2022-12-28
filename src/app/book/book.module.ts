import { NgModule,
         ComponentFactory,
         ComponentFactoryResolver  } from '@angular/core'

// import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { FormsModule,
         ReactiveFormsModule } from '@angular/forms'

import { RouterModule } from '@angular/router'

// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from 'src/app/_shared/shared.module'
// import { SharedMaterialModule } from 'src/app/_shared/shared-material.module'

import { BookComponent } from './book.component'
// import { BookService } from './book.service'
import { BookCarouselComponent } from './book-carousel/book-carousel.component'
import { BookPageComponent } from './book-page/book-page.component'
import { BookPageContentComponent } from './book-page-content/book-page-content.component'
// import { BookRoutingModule } from './blank-routing.module'

import { BookDegComponent } from './book-deg/book-deg.component'

import { AudioModule } from '../audio/audio.module'
import { VideoModule } from '../video/video.module'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // SharedMaterialModule,
    AudioModule,
    VideoModule,
    // RouterModule,
    SharedModule,
    // BrowserModule,
    // BrowserAnimationsModule
    // BookRoutingModule
  ],
  declarations: [
    BookComponent,
    BookCarouselComponent,
    BookPageComponent,
    BookPageContentComponent,
    BookDegComponent
  ],
  providers: [
    // BookService
  ]
})

export class BookModule {

  constructor(
    private cfr: ComponentFactoryResolver
  ) { }

  // getModule(key: string): Promise<any> {
  //   // console.log('getModule', key, this.lazyMap, this.lazyMap.get(key))
  //   if (this.lazyMap.has(key)) return this.lazyMap.get(key)
  //   return this.loadModule(key).toPromise().then(() =>  this.lazyMap.get(key))
  // }

  public resolveComponent(component?: string): ComponentFactory<any> {
    switch (component) {
      // case 'deg': return this.cfr.resolveComponentFactory(BookDegComponent)
      default: return this.cfr.resolveComponentFactory(BookComponent)
    }
  }
}
