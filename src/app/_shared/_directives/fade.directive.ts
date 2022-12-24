import { AfterViewInit,
         ChangeDetectorRef,
         Component,
         ComponentFactoryResolver,
         ComponentRef,
         Directive,
         ElementRef,
         Input,
         OnInit,
         OnChanges,
         OnDestroy,
         TemplateRef,
         ViewContainerRef } from '@angular/core'

import { FadeContainerComponent } from '../fade-container/fade-container.component'

// @Component({
//   selector: 'ss-fade',
//   template: `
//     <div class="whatever">
//       <ng-container *ngTemplateOutlet="template"></ng-container>
//     </div>
//   `
// })
// export class WrapperContainerComponent {
//   @Input() template: TemplateRef<any>
// }



@Directive({
  selector: '[ssFade]'
})

export class FadeDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  // @Input('ssFade') shouldShow: boolean
  // @Input('ssFadeParams') fadeParams: any

  @Input('ssFade') fadeInput: any[] // [ shouldShow: boolean, fadeParams?: any ]
  // @Input('ssFadeParams') fadeParams: any

  shouldShow: boolean
  fadeParams: any

  private afterViewInit: boolean
  private fadeContainer: ComponentRef<FadeContainerComponent>


  constructor(
    private cdr: ChangeDetectorRef,
    private templateRef: TemplateRef<any>,
    private vcr: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    // this.update()
  }

  ngOnChanges(changes: any) {
    this.update()
  }

  ngAfterViewInit() {
    this.afterViewInit = true
    this.update()
  }

  ngOnDestroy() {
    this.clearViewNow()
  }

  update() {
    // if (!this.afterViewInit) return
    let isArray = Array.isArray(this.fadeInput)
    this.shouldShow = isArray ? this.fadeInput[0] : this.fadeInput
    this.fadeParams = isArray ? this.fadeInput[1] : {}

    if (!this.shouldShow || !this.vcr) return this.clearViewNow() // this.clearView()

    const containerFactory = this.componentFactoryResolver.resolveComponentFactory(FadeContainerComponent)
    this.fadeContainer = this.vcr.createComponent(containerFactory)

    this.fadeContainer.instance.shouldShow = this.shouldShow
    this.fadeContainer.instance.template = this.templateRef
    this.fadeContainer.instance.fadeParamsIn = this.fadeParams
    this.fadeContainer.instance.detectChanges()
    this.detectChanges()
  }

  clearView() {
    // console.log('cv')
    if (!this.fadeContainer) return
    this.fadeContainer.instance.hide().then(res => {
      // console.log('hidden...')
      this.clearViewNow()
    })
    // let delay = this.fadeParams && this.fadeParams['transition'] || 150
    // window.setTimeout(this.clearViewNow.bind(this), delay)
  }

  clearViewNow() {
    // console.log('cvn', this.fadeParams, this.fadeInput)
    if (!this.vcr) return
    this.vcr.clear()
  }

  detectChanges() {
    if (!this.cdr['destroyed']) this.cdr.detectChanges()
  }
}
