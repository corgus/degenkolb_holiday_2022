import { Directive,
         EventEmitter,
         ElementRef,
         HostListener,
         Input,
         Output } from '@angular/core'

import { FadeContainerComponent } from '../fade-container/fade-container.component'


@Directive({
  selector: '[ssOnSelectOther]'
})

export class OnSelectOtherDirective { // implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  mouseDownTarget: any
  @Output() ssOnSelectOther = new EventEmitter<any>()

  @HostListener('document:mousedown', ["$event"]) onMouseDown(e: any) {
    // console.log('mouseDown-other', e)
    if (!e) return
    this.mouseDownTarget = e.target
  }

  @HostListener('document:mouseup', ["$event"]) onMouseUp(e: any) {
    // console.log('mouseUp-other', e)
    if (!e) return
    if (this.mouseDownTarget !== e.target) return
    if (this.eventOnTarget(event)) return // handle select not-other: do nothing
    this.ssOnSelectOther.emit(e) // handle select other: emit event
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
