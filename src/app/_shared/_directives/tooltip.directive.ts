import { Directive,
         ElementRef,
         HostListener,
         Input,
         ComponentFactoryResolver,
         EmbeddedViewRef,
         ApplicationRef,
         Injector,
         ComponentRef,
         OnInit,
         Output,
         EventEmitter,
         OnDestroy } from '@angular/core'

// import { TooltipComponent } from 'src/app/shared/index'
import { TooltipComponent } from '../tooltip/tooltip.component'

export interface TooltipInterface {
  data: any
  show: boolean
  close: boolean
  events: any
}

export const defaultOptions = {
  'placement': 'top',
  'delay': 300,
  'show-delay': 300,
  'hide-delay': 0,
  'hide-delay-mobile': 700,
  'z-index': 0,
  'animation-duration': 300,
  'animation-duration-default': 300,
  'trigger': 'hover',
  'tooltip-class': '',
  'display': true,
  'display-mobile': false,
  'shadow': true,
  'theme': 'dark',
  'offset': 8,
  'id': false
}

@Directive({
  selector: '[tooltip]'
})

export class TooltipDirective implements OnInit, OnDestroy {

  hideTimeoutId: number
  destroyTimeoutId: number
  hideAfterClickTimeoutId: number
  createTimeoutId: number
  showTimeoutId: number
  componentRef: any
  elementPosition: any
  _showDelay: any = 0
  _hideDelay: number = 0
  _id: any
  _options: any = {}
  _defaultOptions: any
  component$: any

  /* tslint:disable:no-input-rename */
  @Input('tooltip') tooltipValue: string
  /* tslint:enable */

  @Input('tooltipOptions') set options(value: any) {
    if (value && defaultOptions) {
      this._options = value
    }
  }
  get options() {
    return this._options
  }

  @Input('tooltipPlacement') set placement(value: string) {
    if (value) this._options['placement'] = value
  }

  @Input('tooltipDelay') set delay(value: number) {
    if (value) this._options['delay'] = value
  }

  @Input('tooltipHideDelayMobile') set hideDelayMobile(value: number) {
    if (value) this._options['hide-delay-mobile'] = value
  }

  @Input('tooltipZIndex') set zIndex(value: number) {
    if (value) this._options['z-index'] = value
  }

  @Input('tooltipAnimationDuration') set animationDuration(value: number) {
    if (value) this._options['animation-duration'] = value
  }

  @Input('tooltipTrigger') set trigger(value: string) {
    if (value) this._options['trigger'] = value
  }

  @Input('tooltipClass') set tooltipClass(value: string) {
    if (value) this._options['tooltip-class'] = value
  }

  @Input('tooltipDisplay') set display(value: boolean) {
    if (value) this._options['display'] = value
  }

  @Input('tooltipDisplayMobile') set displayMobile(value: boolean) {
    if (value) this._options['display-mobile'] = value
  }

  @Input('tooltipShadow') set shadow(value: boolean) {
    this._options['shadow'] = value
  }

  @Input('tooltipTheme') set theme(value: boolean) {
    if (value) this._options['theme'] = value
  }

  @Input('tooltipOffset') set offset(value: number) {
    if (value) this._options['offset'] = value
  }

  @Input('tooltipId') set id(value: any) { this._id = value }

  get id() { return this._id }

  @Input('tooltipShowDelay') set showDelay(value: number) {
    if (value) this._showDelay = this._options['show-delay'] = value
  }

  get showDelay() {
    if (this.isMobile) return 0
    return this.options['delay'] || this._showDelay
  }

  @Input('hide-delay') set hideDelay(value: number) {
    if (value) this._hideDelay = this._options['hide-delay'] = value
  }

  get hideDelay() {
    if (!this.isMobile) return this._hideDelay
    return Math.max(this._hideDelay, this.options['hide-delay-mobile'])
    // if (this._hideDelay >= this.options['hide-delay-mobile']) return this._hideDelay
    // return this.options['hide-delay-mobile']
  }

  get isTooltipDestroyed() {
    return this.componentRef && this.componentRef.hostView.destroyed
  }

  get destroyDelay() {
    return Number(this.hideDelay) + Number(this.options['animation-duration'])
  }

  @Output() events: EventEmitter<any> = new EventEmitter<any>()

  constructor(
    // private containerRef: ElementRef,
    private elementRef: ElementRef,
    private cfr: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  @HostListener('focusin')
  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.isDisplayOnHover === false) return
    this.show()
  }

  @HostListener('focusout')
  @HostListener('mouseleave')
  onMouseLeave(evt: any) {

    if (this.options['trigger'] === 'hover') this.destroyTooltip()
  }

  @HostListener('click', ['$event'])
  onClick() {
    if (this.isDisplayOnClick === false) return
    this.show()
    this.hideAfterClickTimeoutId = window.setTimeout(this.destroyTooltip.bind(this), 0)
    // this.hideAfterClickTimeoutId = window.setTimeout(() => {
    //   this.destroyTooltip()
    // }, 0)
  }

  ngOnInit():void {
    this.applyOptionsDefault(defaultOptions, this.options)
  }

  ngOnDestroy():void {
    if (this.component$) this.component$.unsubscribe()
    this.destroyTooltip()
  }

  getElementPosition():void {
    let container = this.elementRef.nativeElement
    // if (this.tooltipParent) container = container.parentElement.nativeElement
    // console.log('tc', typeof this.tooltipContainer, this.tooltipContainer)
    // let ne = container.nativeElement //this.tooltipContainer.nativeElement
    if (!container) return
    this.elementPosition = container.getBoundingClientRect()
  }

  createTooltip():void {
    this.clearTimeouts()
    this.getElementPosition()
    if (!this.elementPosition) return console.log('NO ELEM') // , typeof this.tooltipContainer, this.tooltipContainer, this.tooltipContainer.nativeElement)

    this.createTimeoutId = window.setTimeout(() => {
      this.appendComponentToBody(TooltipComponent)
    }, this.showDelay)

    this.showTimeoutId = window.setTimeout(() => {
      this.showTooltipElem()
    }, this.showDelay)
  }

  destroyTooltip():void {
    this.clearTimeouts()

    if (this.isTooltipDestroyed !== false) return
    this.hideTimeoutId = window.setTimeout(this.hideTooltip.bind(this), this.hideDelay)
    this.destroyTimeoutId = window.setTimeout(this.destroyTooltipNow.bind(this), this.destroyDelay)

    // this.hideTimeoutId = window.setTimeout(() => {
    //   this.hideTooltip()
    // }, this.hideDelay)

    // this.destroyTimeoutId = window.setTimeout(() => {
    //   if (!this.componentRef || this.isTooltipDestroyed) return

    //   this.appRef.detachView(this.componentRef.hostView)
    //   this.componentRef.destroy()
    //   this.events.emit('hidden')
    // }, this.destroyDelay)
  }

  destroyTooltipNow() {
    if (!this.componentRef || this.isTooltipDestroyed) return

    this.appRef.detachView(this.componentRef.hostView)
    this.componentRef.destroy()
    this.events.emit('hidden')
  }

  showTooltipElem():void {
    this.clearTimeouts()
    if (!this.componentRef) return
    (this.componentRef.instance as TooltipInterface).show = true
    this.events.emit('show')
  }

  hideTooltip():void {
    if (!this.componentRef || this.isTooltipDestroyed) {
      return
    }
    (this.componentRef.instance as TooltipInterface).show = false
    this.events.emit('hide')
  }

  appendComponentToBody(component: any, data: any = {}):void {
    if (!this.tooltipValue) return

    this.componentRef = this.cfr
      .resolveComponentFactory(component)
      .create(this.injector);

    (this.componentRef.instance as TooltipInterface).data = {
      value: this.tooltipValue,
      element: this.elementRef.nativeElement,
      elementPosition: this.elementPosition,
      options: this.options
    }
    this.appRef.attachView(this.componentRef.hostView)
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement
    document.body.appendChild(domElem)

    this.component$ = (this.componentRef.instance as TooltipInterface).events.subscribe((event: any) => {
      this.handleEvents(event)
    })
  }

  clearTimeouts():void {
    if (this.createTimeoutId) clearTimeout(this.createTimeoutId)
    if (this.showTimeoutId) clearTimeout(this.showTimeoutId)
    if (this.hideTimeoutId) clearTimeout(this.hideTimeoutId)
    if (this.destroyTimeoutId) clearTimeout(this.destroyTimeoutId)
  }

  get isDisplayOnHover(): boolean {
    if (this.options['trigger'] !== 'hover') return false
    if (this.isMobile) return false
    if (this.options['display'] === false) return false

    return true
  }

  get isDisplayOnClick(): boolean {
    if (this.options['trigger'] !== 'click' && this.isMobile === false) return false
    if (this.options['display'] === false) return false
    if (this.options['display-mobile'] === false && this.isMobile) return false

    return true
  }

  /* tslint:disable:max-line-length */
  get isMobile(): boolean {
    // let check = false
    let a = navigator.userAgent || navigator.vendor
    let regEx1 = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i
    let regEx2 = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
    if (regEx1.test(a) || regEx2.test(a.substr(0,4))) return true
    return false
  }
  /* tslint:enable:max-line-length */

  applyOptionsDefault(defaultOptions:any, options:any):void {
    this._defaultOptions = Object.assign({}, defaultOptions)
    this.options = Object.assign(this._defaultOptions, options)
  }

  handleEvents(event: any) {
    if (event === 'shown') {
      this.events.emit('shown')
    }
  }

  public show() {
    if (!this.componentRef || this.isTooltipDestroyed) return this.createTooltip()
    if (!this.isTooltipDestroyed) this.showTooltipElem()
  }

  public hide() {
    this.destroyTooltip()
  }
}
