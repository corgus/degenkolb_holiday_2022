// originally from:
// https://github.com/drozhzhin-n-e/ng2-tooltip-directive

import { Component,
         ElementRef,
         HostListener,
         HostBinding,
         Input,
         OnInit,
         EventEmitter } from '@angular/core'

@Component({
  moduleId: module.id,
  selector: 'tooltip',
  templateUrl: 'tooltip.component.html',
  styleUrls: ['tooltip.component.scss'],
  host: {'class': 'tooltip'},
})

export class TooltipComponent implements OnInit {

  _show = false

  /* tslint:disable:no-input-rename */
  @Input() data: any
  /* tslint:enable */

  events = new EventEmitter()

  @HostBinding('style.top') hostStyleTop: string
  @HostBinding('style.left') hostStyleLeft: string
  @HostBinding('style.z-index') hostStyleZIndex: number
  @HostBinding('style.transition') hostStyleTransition: string
  @HostBinding('class.tooltip-show') hostClassShow: boolean
  @HostBinding('class.tooltip-shadow') hostClassShadow: boolean
  @HostBinding('class.tooltip-light') hostClassLight: boolean

  @HostListener('transitionend', ['$event'])
  transitionEnd(event:any) {
    if (this.show) this.events.emit('shown')
  }

  @Input() set show (value:boolean) {
    if (value) this.setPosition()
    this._show = this.hostClassShow = value
  }
  get show ():boolean {
    return this._show
  }

  get placement() {
    return this.data.options.placement
  }

  get elemetn() {
    return this.data.element
  }

  get elementPosition() {
    return this.data.elementPosition
  }

  get options() {
    return this.data.options
  }

  get value() {
    return this.data.value
  }

  get tooltipOffset():number {
    return Number(this.data.options.offset)
  }

  get isThemeLight() {
    return this.options['theme'] === 'light'
  }

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.setPlacementClass()
    this.setZIndex()
    this.setCustomClass()
    this.setAnimationDuration()
    this.setStyles()
  }

  setPosition():void {
    const elemetnHeight = this.elemetn.offsetHeight
    const elemetnWidth = this.elemetn.offsetWidth
    const tooltipHeight = this.elementRef.nativeElement.clientHeight
    const tooltipWidth = this.elementRef.nativeElement.offsetWidth
    const scrollY = window.pageYOffset
    const tooltip = this.elementRef.nativeElement

    if (this.placement === 'top') {
      this.hostStyleTop = (this.elementPosition.top + scrollY) - (tooltipHeight + this.tooltipOffset) + 'px'
    }

    if (this.placement === 'bottom') {
      this.hostStyleTop = (this.elementPosition.top + scrollY) + elemetnHeight + this.tooltipOffset + 'px'
    }

    if (this.placement === 'top' || this.placement === 'bottom') {
      this.hostStyleLeft = (this.elementPosition.left + elemetnWidth / 2) - tooltipWidth / 2 + 'px'
    }

    if (this.placement === 'left') {
      this.hostStyleLeft = this.elementPosition.left - tooltipWidth - this.tooltipOffset + 'px'
    }

    if (this.placement === 'right') {
      this.hostStyleLeft = this.elementPosition.left + elemetnWidth + this.tooltipOffset + 'px'
    }

    if (this.placement === 'left' || this.placement === 'right') {
      this.hostStyleTop = (this.elementPosition.top + scrollY) + elemetnHeight / 2 - tooltip.clientHeight / 2 + 'px'
    }

    // if (this.placement === 'bottom-right') {
    //   this.hostStyleTop = (this.elementPosition.top + scrollY) + elemetnHeight + this.tooltipOffset + 'px'
    //   this.hostStyleLeft = this.elementPosition.left + elemetnWidth + this.tooltipOffset + 'px'
    // }
  }

  setPlacementClass():void {
    this.elementRef.nativeElement.classList.add('tooltip-'+this.placement)
  }

  setZIndex():void {
    if (this.options['z-index'] !== 0) {
      this.hostStyleZIndex = this.options['z-index']
    }
  }

  setCustomClass() {
    if (this.options['tooltip-class']) {
      this.elementRef.nativeElement.classList.add(this.options['tooltip-class'])
    }
  }

  setAnimationDuration() {
    if (Number(this.options['animation-duration']) != this.options['animation-duration-default']) {
      this.hostStyleTransition = 'opacity '+this.options['animation-duration']+'ms'
    }
  }

  setStyles() {
    this.hostClassShadow = this.options['shadow']
    this.hostClassLight = this.isThemeLight
  }
}
