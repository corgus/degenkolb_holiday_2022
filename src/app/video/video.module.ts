import { NgModule,
         ComponentFactory,
         ComponentFactoryResolver  } from '@angular/core'

// import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// import { FormsModule,
//          ReactiveFormsModule } from '@angular/forms'

// import { SharedModule } from 'src/app/_shared/shared.module'
// import { SharedMaterialModule } from 'src/app/_shared/shared-material.module'
import { VideoComponent } from './video.component'


@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
  ],
  declarations: [
    VideoComponent,
  ],
  providers: [
    // VideoService
  ],
  exports: [
    VideoComponent
  ]
})

export class VideoModule {

  constructor(
    private cfr: ComponentFactoryResolver
  ) { }


  public resolveComponent(component?: string): ComponentFactory<any> {
    switch (component) {
      // case 'deg': return this.cfr.resolveComponentFactory(VideoDegComponent)
      default: return this.cfr.resolveComponentFactory(VideoComponent)
    }
  }
}
