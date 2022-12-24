import { Directive,
         Input,
         Output,
         EventEmitter,
         ElementRef,
         HostListener,
         OnInit } from '@angular/core'

@Directive({
  selector: '[ssLoaded]'
})
export class LoadedDirective {
  // @Input('ssLoaded') loadedKey: any
  @Output() ssLoaded = new EventEmitter<any>()

  @HostListener('load') onLoad() {
    this.handleLoaded()
  }

  @HostListener('error') onError(e: any) {
    console.log('loaded: error', e)
  }

  constructor(private elRef: ElementRef<HTMLImageElement>) {
    if (this.elRef.nativeElement.complete) this.handleLoaded()
  }

  handleLoaded() {
    this.ssLoaded.emit()
  }
}
