import { Directive,
         ElementRef,
         EventEmitter,
         HostListener,
         Input,
         Output } from '@angular/core'

import { FadeContainerComponent } from '../fade-container/fade-container.component'


@Directive({
  selector: '[ssOnSelect]'
})

export class OnSelectDirective { // implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  mouseDownTarget: any
  @Output() ssOnSelect = new EventEmitter<any>()

  @HostListener('document:mousedown', ["$event"])
  onMousedownDocument(e: any) {
    // console.log('mouseDown', e)
    this.mouseDownTarget = e.target
  }

  @HostListener('document:mouseup', ["$event"])
  onMouseupDocument(e: any) {
    // console.log('mouseUp', e)
    if (this.mouseDownTarget !== e.target) return
    if (!this.eventOnTarget(e)) return // this.mouseDownTarget = null
    this.ssOnSelect.emit(e)
  }

  shouldShow: boolean
  fadeParams: any

  private afterViewInit: boolean


  constructor(
    private el: ElementRef
  ) { }

  eventOnTarget(event: any): boolean {
    // console.log('eot', this.el.nativeElement.contains(event.target), event)
    if (this.el.nativeElement.contains(event.target)) return true
    return false
  }
}
