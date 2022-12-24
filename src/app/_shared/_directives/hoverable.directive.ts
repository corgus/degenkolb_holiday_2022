import { Directive,
         ElementRef,
         HostListener } from '@angular/core'

@Directive({
    selector: '[ssHoverable]'
})

export class HoverableDirective {
    constructor(el: ElementRef) {}

    @HostListener('mouseenter') onMouseEnter() {
      // console.log(event.currentTarget)
      // event.currentTarget.classList.add("is-hovered")
    }

    @HostListener('mouseleave') onMouseLeave() {
      // event.currentTarget.classList.remove("is-hovered")
    }
}
