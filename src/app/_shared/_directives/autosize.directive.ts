import { AfterViewInit,
         Directive,
         ElementRef,
         HostListener } from '@angular/core'

@Directive({
  selector: 'textarea[ssAutosize]',
  exportAs: 'autosizeDirective',
  host: {
    'rows': '1',
    'style': 'overflow: hidden'
  }
})
export class AutosizeDirective implements AfterViewInit {

  constructor(
    private elem: ElementRef
  ) { }

  public ngAfterViewInit() {
    this.resize()
  }

  @HostListener('input')
  listenToInput() {
    this.resize()
  }

  public resize() {
    const textarea = this.elem.nativeElement as HTMLTextAreaElement
    // Reset textarea height to auto that correctly calculate the new height
    textarea.style.height = 'auto'
    // Set new height
    textarea.style.height = `${textarea.scrollHeight}px`
  }
}
