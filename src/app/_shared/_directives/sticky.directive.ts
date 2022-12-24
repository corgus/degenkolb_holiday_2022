// originally from jonasmedeiros/ng-sticky?: https://github.com/jonasmedeiros/ng-sticky/blob/master/src/ng-sticky.directive.ts
// also see ng2-sticky: https://github.com/makseo/ng2-sticky/blob/master/src/lib/src/component/sticky.component.ts



import { ChangeDetectorRef,
         Component,
         Directive,
         AfterViewInit,
         ElementRef,
         EventEmitter,
         Input,
         Renderer2,
         OnInit,
         OnChanges,
         OnDestroy,
         Output,
         ViewChild } from '@angular/core'

import { BoundingRectangle,
         ScrollContainer,
         CorgStatic,
         WindowDimensions,
         WindowService } from 'src/app/_core/index'


@Directive({
  selector: '[ssSticky]'
})
export class StickyDirective implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  debug = false
  // @Input('ssDebug') debug: boolean
  @Input('ssParentElement') parentElement: ElementRef // this.el.nativeElement.parentNode
  @Input() stickyClass = 'sticky-stuck'

  @Input() stickyOffset = -1
  @Input() stickyPosition = 'top'
  @Input() stuckOffset: any = {} // { top: number, right: number } px offset when stuck
  @Input() triggerOffsetTop = 0 // px offset before sticking (parent top edge : window edge)
  @Input() triggerOffsetBottom = 0 // px offset before unsticking (parent bottom edge : window edge)
  @Input() scrollContainerType = 'window'
  @Input() stickyTransitionTime = 300


  private parent: ElementRef
  private windowDimensions$: any
  private scroll$: any
  private currentWindowDimensions: WindowDimensions = new WindowDimensions()

  private isStuck = false
  private updatedStuck = false
  private br: BoundingRectangle = new BoundingRectangle()

  private afterViewInit: boolean
  private containerOffset: any

  private topPositive = false
  private bottomPositive = false
  private pingLoop: any
  private pingInterval = 2000
  private pingTimeout = 10000


  // NOTE: very similar to sticky-controls-v... TODO: combine, use this directive with sticky-controls
  constructor(
    private cdr: ChangeDetectorRef,
    private el: ElementRef,
    private renderer: Renderer2,
    private windowService: WindowService
  ) {}

  ngOnInit() {
    if (!this.parent) this.parent = this.el.nativeElement.parentNode
    this.scroll$ = this.scrollStream()
    this.windowDimensions$ = this.windowDimensionsStream()
  }

  ngOnChanges(changes: any) {
    this.updateNow(false, { note: { chg: changes }})
  }

  ngAfterViewInit() {
    this.afterViewInit = true
    this.windowService.findBoundingRectangle(this.br, this.parent, this.findBoundingParams()).then( br => {
      this.br.fromJSON(br)
      this.updateOffsets()
      this.updateNow(false, { note: 'avi' })
    })
  }

  ngOnDestroy() {
    if (this.windowDimensions$) this.windowDimensions$.unsubscribe()
    if (this.scroll$) this.scroll$.unsubscribe()
  }


  updateOffsets() {
    if (!this.afterViewInit) return
    this.containerOffset = this.windowService.getContainerOffset(this.scrollContainerType)
    // this.leftOffsetType = this.getLeftOffsetType()
  }

  scrollStream() {
    return this.windowService.scrollContainer(this.scrollContainerType).subscribe((data) => {
      this.onScrollUpdate(data)
    })
  }

  windowDimensionsStream() {
    return this.windowService.windowDimensions.subscribe((data) => {
      this.onWindowDimensionsUpdate(data)
    })
  }

  findBoundingParams() {
    return { scrollContainerType: this.scrollContainerType }
  }

  onScrollUpdate(data: any) {
    this.windowService.findBoundingRectangle(this.br, this.parent, this.findBoundingParams()).then( br1 => {
      this.windowService.updateBoundingRectFromScroll(br1, data).then( br2 => {
        this.br.fromJSON(br2)
        this.updateNow(false, { note: 'scroll' })
      })
    })
  }

  onWindowDimensionsUpdate(data: any) {
    this.currentWindowDimensions.fromJSON(data)
    this.updateOffsets()
    this.windowService.getBoundingRectangleOf(this.parent).then( br => {
      this.br.fromJSON(br)
      this.updateNow(true, { note: 'wdim' })
    })
  }

  updateNow(windowDimensionsUpdated = false, params={}) {
    if (!this.afterViewInit || !this.containerOffset || !this.br) return
    this.updateSticky(windowDimensionsUpdated, params)
    // this.setDisplayedControls()
  }

  updateSticky(windowDimensionsUpdated = false, params={}) {
    // if (!this.afterViewInit || !this.containerOffset || !this.br) return
    // if (this.debug) console.log('updateSticky')
    let conTop = this.containerOffset['top']
    let conBottom = this.currentWindowDimensions.innerHeight - this.containerOffset['bottom']

    let topAfterTopEdge = this.br.top < conTop
    // let bottomGradientBuffer = 0 // -43
    let topAfterBottomEdge =  this.br.top < conBottom

    // let topBeforeBottomEdge =  this.br.top < conBottom
    let bottomAfterTopEdge = this.br.bottom < conTop // + bottomGradientBuffer
    let bottomBeforeBottomEdge = this.br.bottom < conBottom // + bottomGradientBuffer

    // let afterBottomEdg = (conTop - this.br.bottom) < bottomGradientBuffer

    // if (this.debug && this.stickyPosition === 'bottom') {
    //   console.log('us', topAfterBottomEdge, bottomBeforeBottomEdge, conBottom, this.br, params['note'])
    // }//  topAfterTopEdge, topBeforeBottomEdge, this.br.top)

    // console.log('ttodo: triggerOffsetTop - replace with containerOffset', this.triggerOffsetTop, this.containerOffset)
    let topStuck = topAfterTopEdge && !bottomAfterTopEdge
    let bottomStuck = topAfterBottomEdge && !bottomBeforeBottomEdge

    if (this.isStuck === false) {
      if (this.stickyPosition === 'top' && topStuck) this.addSticky()
      if (this.stickyPosition === 'bottom' && bottomStuck) this.addSticky()
    } else {
      if (this.stickyPosition === 'top' && !topStuck) this.removeSticky()
      if (this.stickyPosition === 'bottom' && !bottomStuck)  this.removeSticky()
      // if (windowDimensionsUpdated) this.updateStickyWindowDimensions()
    }

    if (windowDimensionsUpdated) this.updateStickyWindowDimensions()

  }

  updateStickyWindowDimensions() {
    if (!this.afterViewInit) return
    // this.el.nativeElement.style.top = this.containerOffset['top'] + 'px'

    let topOffset = this.stuckOffset ? this.stuckOffset['top'] : this.stickyOffset
    let bottomOffset = this.stuckOffset ? this.stuckOffset['bottom'] : this.stickyOffset
    // console.log('to,bo', this.el.nativeElement.style.top, this.stuckOffset, this.stickyOffset, topOffset, bottomOffset)
  }


  addSticky() {
    if (this.isStuck) return
    this.isStuck = true
    this.updateStickyWindowDimensions()
    if (this.debug) console.log('add-sticky', this.el.nativeElement, this.stuckOffset)

    this.renderer.addClass(this.el.nativeElement, 'opacity-0')
    CorgStatic.delay(this.stickyTransitionTime).then(res => {
      this.addStickyNow()
    })
  }

  addStickyNow() {
    this.renderer.removeClass(this.el.nativeElement, 'opacity-0')
    if (!this.isStuck || this.updatedStuck) return
    if (this.debug) console.log('sticky-add', this.el.nativeElement, this.stuckOffset)

    this.updatedStuck = this.isStuck
    this.renderer.addClass(this.el.nativeElement, this.stickyClass)
    let topOffset = this.stuckOffset ? this.stuckOffset['top'] : this.stickyOffset
    let bottomOffset = this.stuckOffset ? this.stuckOffset['bottom'] : this.stickyOffset

    if (this.stickyPosition === 'top') {
      this.el.nativeElement.style.top = topOffset + 'px'
    } else if (this.stickyPosition === 'bottom') {
      this.el.nativeElement.style.bottom = bottomOffset + 'px'
    }

    if (!this.stuckOffset) return

    let rightOffset = this.stuckOffset['right']
    if (rightOffset) this.el.nativeElement.style.right = rightOffset + 'px'

    let leftOffset = this.stuckOffset['left']
    if (leftOffset) this.el.nativeElement.style.right = leftOffset + 'px'

    // this.fadeIn()
    // this.renderer.removeClass(this.el.nativeElement, 'opacity-0')
  }

  removeSticky() {
    if (this.isStuck) this.renderer.addClass(this.el.nativeElement, 'opacity-0')
    this.isStuck = false
    // if (this.debug) console.log('rm-sticky', this.el.nativeElement, this.stuckOffset)

    // this.renderer.addClass(this.el.nativeElement, 'opacity-0')
    CorgStatic.delay(this.stickyTransitionTime).then(res => {
      this.removeStickyNow()
    })
  }

  removeStickyNow() {
    this.renderer.removeClass(this.el.nativeElement, 'opacity-0')
    if (this.isStuck || !this.updatedStuck) return
    if (this.debug) console.log('sticky-rm', this.el.nativeElement)
    this.updatedStuck = this.isStuck
    // this.isStuck = false
    // window.setTimeout(this.removeStickyNow.bind(this), 10)

    if (this.stickyPosition === 'top') {
      this.el.nativeElement.style.top = null
    } else if (this.stickyPosition === 'bottom') {
      this.el.nativeElement.style.bottom = null
    }

    this.renderer.removeClass(this.el.nativeElement, this.stickyClass)
  }


  detectChanges() {
    if (!this.cdr['destroyed']) this.cdr.detectChanges()
  }
}
