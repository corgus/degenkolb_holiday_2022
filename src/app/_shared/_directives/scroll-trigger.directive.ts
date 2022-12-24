// originally from jonasmedeiros/ng-sticky?: https://github.com/jonasmedeiros/ng-sticky/blob/master/src/ng-sticky.directive.ts
// also see ng2-sticky: https://github.com/makseo/ng2-sticky/blob/master/src/lib/src/component/sticky.component.ts

import { Directive,
         ElementRef,
         EventEmitter,
         Input,
         Renderer2,
         OnInit,
         AfterViewInit,
         OnDestroy,
         Output } from '@angular/core'

import { BoundingRectangle,
         ScrollContainer,
         WindowDimensions,
         WindowService } from 'src/app/_core/index'

@Directive({
  selector: '[ssScrollTrigger]',
  exportAs: 'scrollTriggerDirective'
})
export class ScrollTriggerDirective implements OnInit, AfterViewInit, OnDestroy {

  // @Input() stickyClass = 'sticky-stuck'
  @Input('ssScrollTriggerOffsetTop') scrollTriggerOffsetTop = 0 // px btw top window edge and element bottom
  @Input('ssScrollTriggerOffsetBottom') scrollTriggerOffsetBottom = 300 // px btw bottom window edge and element top
  @Input('ssScrollContainerType') scrollContainerType = 'window'

  @Output() onTrigger = new EventEmitter<boolean>()

  private windowDimensions$: any
  private scroll$: any
  private currentWindowDimensions: WindowDimensions = new WindowDimensions()
  private containerOffset: any

  private element: any
  private scrollTrigger = false
  private br: BoundingRectangle = new BoundingRectangle()

  private topPositive = false
  private bottomPositive = false

  private scrollData: any
  private scrollTs: any

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private windowService: WindowService
  ) {}

  ngOnInit() {
    this.element = this.el.nativeElement

    this.scroll$ = this.windowService.scrollContainer(this.scrollContainerType).subscribe((data) => {
      this.onScrollUpdate(data)
    })

    this.windowDimensions$ = this.windowService.windowDimensions.subscribe((data) => {
      // console.log('WDU', data)
      this.onWindowDimensionsUpdate(data)
    })
  }

  ngAfterViewInit() {
    this.windowService.findBoundingRectangle(this.br, this.element, this.findBoundingParams()).then( br => {
      // console.log('br-awi')
      this.br.fromJSON(br)
    })
  }

  ngOnDestroy() {
    if (this.windowDimensions$) this.windowDimensions$.unsubscribe()
    if (this.scroll$) this.scroll$.unsubscribe()
  }

  findBoundingParams() {
    return { scrollContainerType: this.scrollContainerType }
  }
  onScrollUpdate(data: any) {
    this.scrollData = data
    this.scrollTs = Date.now()
    window.setTimeout(this.locScrollUpdateOnce.bind(this, this.scrollTs), 100)
    // console.log('osu', data)
    this.windowService.findBoundingRectangle(this.br, this.element, this.findBoundingParams()).then( br1 => {
      this.windowService.updateBoundingRectFromScroll(br1, data).then(br2 => {
        // console.log('br-2', br2, data)
        this.br.fromJSON(br2)
        // this.updateNow()
        window.setTimeout(this.updateNow.bind(this), 10)
      })
    })
  }

  locScrollUpdateOnce(ts) {
    if (this.scrollTs !== ts) return
    // console.log('SCROLL:', this.scrollData)
  }

  onWindowDimensionsUpdate(data: any) {
    this.currentWindowDimensions.fromJSON(data)
    this.updateBoundingRectangleFromElement()
    // this.windowService.getBoundingRectangleOf(this.element).then( br => {
    //   console.log('br-wdu', br)
    //   this.br.fromJSON(br)
    //   this.updateNow()
    // })
  }

  public updateBoundingRectangleFromElement() {
    this.windowService.getBoundingRectangleOf(this.element).then( br => {
      // console.log('br-wdu', br)
      this.br.fromJSON(br)
      this.updateNow()
    })
  }

  updateNow() {
    this.containerOffset = this.windowService.getContainerOffset(this.scrollContainerType)

    // scrollElement
    let conTop = this.containerOffset['top']
    let conBottom = this.currentWindowDimensions.innerHeight - this.containerOffset['bottom']

    let vpHeight = this.windowService.getVisibleViewport('height')

    let afterTop = this.br.top > conTop
    // let bottomGradientBuffer = 0 // -43
    // let beforeBottom =  this.br.top < conBottom
    let beforeBottom = this.br.top < vpHeight + this.scrollTriggerOffsetBottom + this.containerOffset['bottom']
    // console.log('container', conTop, conBottom, afterTop, beforeBottom)


    // let afterTop = (this.br.bottom + this.scrollTriggerOffsetTop) > this.containerOffset['top']
    // console.log('AT', afterTop, this.br.bottom, this.scrollTriggerOffsetTop, this.containerOffset['top'])

    // let vpHeight = this.windowService.getVisibleViewport('height')
    // let beforeBottom = (vpHeight + this.scrollTriggerOffsetBottom) > (this.br.top - this.containerOffset['bottom'])
    // console.log('updateNow', this.currentWindowDimensions.innerHeight, this.scrollTriggerOffsetBottom, this.br.top, this.containerOffset['bottom'])
    // console.log('upNow', vpHeight, this.br.top, this.br, afterTop, beforeBottom)
    // this.onTrigger.emit(afterTop && beforeBottom)
    let trigger = afterTop && beforeBottom
    // console.log('trigger:', this.br, trigger, this.scrollContainerType,  afterTop, beforeBottom, this.br.bottom, this.scrollTriggerOffsetTop, this.containerOffset['top'])
    // if (!trigger) console.log('TRIGGER?', trigger, afterTop, beforeBottom)
    if (trigger) this.onTrigger.emit(trigger)
  }
}
