// https://stackblitz.com/edit/angular-parallax-effect?file=src%2Fapp%2Fapp.component.css,src%2Fapp%2Fparallax.directive.ts

import { Directive,
         Input,
         ElementRef,
         HostListener } from '@angular/core';

@Directive({
  selector: '[ssParallax]'
})
export class ParallaxDirective {

  @Input('ratio') parallaxRatio: number = 1
  // @Input('scrollContainer') scrollContainer: string

  initialTop: number = 0

  constructor(private eleRef: ElementRef) {
    this.initialTop = this.eleRef.nativeElement.getBoundingClientRect().top
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(event) {
    this.eleRef.nativeElement.style.top = (this.initialTop - (window.scrollY * this.parallaxRatio)) + 'px'
  }

}
