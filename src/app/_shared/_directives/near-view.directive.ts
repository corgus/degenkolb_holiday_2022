import { ChangeDetectorRef,
         Directive,
         EventEmitter,
         Component,
         Input,
         Output,
         OnChanges,
         ElementRef,
         ViewContainerRef,
         AfterViewInit } from '@angular/core'

import { ScrollContainer,
         WindowService } from 'src/app/_core/index'
// import { WindowService } from '../_core/window.service'

@Directive({
  selector: '[ssNearView]'
})

export class NearViewDirective implements AfterViewInit, OnChanges {


  // @Input('ssScrollContainerType') scrollContainerType = 'window'

  @Input('ssOptions') options: any // = 'window'

  @Output() ssNearView = new EventEmitter<any>()

  alreadyRendered: boolean // cheking if visible already
  isIntersecting: boolean

  scrollContainerTypes: string[]

  constructor(
    private cdr: ChangeDetectorRef,
    private el: ElementRef,
    private vcRef: ViewContainerRef,
    private windowService: WindowService,
  ) {}

  // ngAfterViewInit() {
  //   // this.updateScrollContainerTypesFromOptions()
  //   console.log('AVI')
  //   this.update()
  // }

  ngOnChanges(changes: any) {
    // this.updateScrollContainerTypesFromOptions()
    // console.log('CHG', changes)
    this.update()
  }

  update() {
    let newScrollContainers = this.updateScrollContainerTypesFromOptions()
    if (!newScrollContainers) return

    for (let type of newScrollContainers) {
      // console.log('nsc', type)
      this.observeScrollContainerType(type)
    }
    // const nativeEl = this.vcRef.element.nativeElement // template
    // const elToObserve = nativeEl.parentElement

    // let refs:[ElementRef, ScrollContainer] = this.windowService.scrollReferencesFromType(this.scrollContainerType)
    // const rootElement = refs[0]

    // const intersectionParams = {
    //   root: rootElement && rootElement.nativeElement,
    //   rootMargin: "1500px 0px 1500px 0px"
    // }
    // // const intersectionParams = { threshold: [0, .1, .9, 1] }
    // const observer = new IntersectionObserver(e => this.handleIntersectionEntries(e), intersectionParams)
    // observer.observe(elToObserve)
  }

  observeScrollContainerType(scrollContainerType) {
    const nativeEl = this.vcRef.element.nativeElement // template
    const elToObserve = nativeEl.parentElement

    let refs:[ElementRef, ScrollContainer] = this.windowService.scrollReferencesFromType(scrollContainerType)
    const rootElement = refs[0]

    const intersectionParams = {
      root: rootElement && rootElement.nativeElement,
      rootMargin: "1500px 0px 1500px 0px"
    }
    // const intersectionParams = { threshold: [0, .1, .9, 1] }
    const observer = new IntersectionObserver(e => this.handleIntersectionEntries(e), intersectionParams)
    observer.observe(elToObserve)
  }

  updateScrollContainerTypesFromOptions() {
    if (!this.options) return // console.warn('!iptions', this.options)
    if (this.options['sidebar']) this.options['scrollContainerTypes'] = ['window', 'sidebar']
    let types = this.options['scrollContainerTypes']
    if (!types) return ['window']
    if (types === this.scrollContainerTypes) return
    this.scrollContainerTypes = types
    this.detectChanges()
    return types
  }

  ngAfterViewInit() {
    if (this.isNearViewport()) this.ssNearView.emit(true)

    // const nativeEl = this.vcRef.element.nativeElement // template
    // const elToObserve = nativeEl.parentElement
    // console.log('nearviewing', elToObserve)
    // this.setMinWidthHeight(elToObserve)
    this.update()
    // let refs:[ElementRef, ScrollContainer] = this.windowService.scrollReferencesFromType(this.scrollContainerType)
    // const rootElement = refs[0]

    // const intersectionParams = {
    //   root: rootElement && rootElement.nativeElement,
    //   rootMargin: "1500px 0px 1500px 0px"
    // }
    // // const intersectionParams = { threshold: [0, .1, .9, 1] }
    // const observer = new IntersectionObserver(e => this.handleIntersectionEntries(e), intersectionParams)
    // observer.observe(elToObserve)
  }

  // ngOnDestroy() {
  //   // if (this.observer$) this.observer$.unsubscribe()
  // }

  isNearViewport(): boolean {
    // console.log('iiv', this.vcRef, this.el.nativeElement)
    let bounding = this.el.nativeElement.getBoundingClientRect()
    // var bounding = elem.getBoundingClientRect()
    let topMargin = 500
    let bottomMargin = 800
    let sideMargin = 0

    // indicators that edges are within acceptable boundaries (viewport plus margins:
    let bottomish = (window.innerHeight || document.documentElement.clientHeight) + bottomMargin
    let rightish = (window.innerWidth || document.documentElement.clientWidth) + sideMargin
    let topEdge = this.edgeIsWithin(bounding.top, -topMargin, bottomish)
    let bottomEdge = this.edgeIsWithin(bounding.bottom, -topMargin, bottomish)
    let leftEdge = this.edgeIsWithin(bounding.left, -sideMargin, rightish)
    let rightEdge = this.edgeIsWithin(bounding.right, -sideMargin, rightish)
    let nearViewport = (topEdge || bottomEdge) && (rightEdge || leftEdge)
    // if (nearViewport) console.log('near-vp', nearViewport, this.el.nativeElement)
    return nearViewport
  }

  edgeIsWithin(edge, min, max) {
    return edge > min && edge < max
  }


  handleIntersectionEntries(entries: any) {
    // console.log('hie', entries)
    return entries.forEach(e => this.handleIsIntersecting(e.isIntersecting))
  }

  // emit true at first true isIntersecting
  handleIsIntersecting(isIntersecting:boolean) {
    // if (isIntersecting === this.isIntersecting) return
    if (!isIntersecting) return
    // console.log('handleIsIntersecting', isIntersecting)
    this.isIntersecting = isIntersecting
    this.ssNearView.emit(isIntersecting)
  }

  setMinWidthHeight(el) { // prevent issue being visible all together
    const style = window.getComputedStyle(el)
    const width = this.parseInt(style.width)
    const height = this.parseInt(style.height)
    // const [width, height] = [CorgStatic.parseInt(style.width), CorgStatic.parseInt(style.height)]
    if (!width) el.style.minWidth = '40px'
    if (!height) el.style.minHeight = '40px'
  }

  parseInt(int: any) {
    return Number.parseInt(int, 10)
  }

  detectChanges() {
    if (!this.cdr['destroyed']) this.cdr.detectChanges()
  }
}
