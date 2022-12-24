import { Directive,
         Input,
         OnChanges,
         AfterViewInit,
         ElementRef } from '@angular/core'

@Directive({
  selector: '[ssAutofocus]'
})
export class AutofocusDirective implements OnChanges, AfterViewInit {

  @Input('ssAutofocus') shouldAutofocus: any

  constructor(
    private elementRef: ElementRef
  ) { }

  ngAfterViewInit(): void {
    // console.log('shouldAutofocus', typeof this.shouldAutofocus == 'string')
    this.updateAutofocus()
  }

  ngOnChanges() {
    this.updateAutofocus()
  }

  updateAutofocus() {
    // note: ssAutofocus without input gives shouldAutofocus as empty string; make true by default
    if (typeof this.shouldAutofocus === 'string') this.shouldAutofocus = true
    if (this.shouldAutofocus) this.focus()
  }

  focus() {
    // console.log('focusing', this.shouldAutofocus, typeof this.shouldAutofocus, this.elementRef.nativeElement)
    this.elementRef.nativeElement.focus()
  }
}
