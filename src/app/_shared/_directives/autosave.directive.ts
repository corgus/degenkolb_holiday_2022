import { AfterViewInit,
         Directive,
         Input,
         OnInit,
         OnChanges,
         OnDestroy,
         Output,
         ElementRef,
         EventEmitter } from '@angular/core'

@Directive({
  selector: '[ssAutosave]'
})
export class AutosaveDirective implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input('ssAutosave') formValue: any // autosaveParams: [boolean, any] // note: [autosaveReady, form]
  @Input('autosaveInterval') autosaveInterval = 3000
  @Input('autosaveDelay') autosaveDelay = 1500

  @Output() onAutosave = new EventEmitter<any>()
  @Output() onAutosaveExpire = new EventEmitter<any>()

  previousJsonValue: any
  lastUpdate: any
  pingLoop: any

  autosaveReady = false
  pauseAutosaveStack = []

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.lastUpdate = Date.now()
    // this.pingLoop = window.setInterval(this.pingAutosave.bind(this), this.autosaveInterval)
    // this.previousJsonValue = JSON.stringify(this.autosaveParams[1].value)
    this.update()
  }

  ngAfterViewInit() {
    this.pingLoop = window.setInterval(this.pingAutosave.bind(this), this.autosaveInterval)
  }

  ngOnChanges(changes: any): void {
    this.update()
  }

  ngOnDestroy() {
    if (this.pingLoop) clearInterval(this.pingLoop)
  }

  update() {
    // if (this.autosaveReady && !this.previousJsonValue) this.previousJsonValue = JSON.stringify(this.formValue)
    if (this.formValue && !this.previousJsonValue) this.previousJsonValue = JSON.stringify(this.formValue)
    this.handleAnyUpdate()
  }

  pingAutosave() {
    if (!this.autosaveReady || !this.formValue) return
    let currentJsonValue = JSON.stringify(this.formValue)
    if (currentJsonValue === this.previousJsonValue) return this.handleNoChange()
    this.previousJsonValue = currentJsonValue
    this.lastUpdate = Date.now()
    // console.log('autosaved ' + this.lastUpdate, this.form)
    this.onAutosave.emit(this.formValue)
  }

  handleNoChange() {
    this.onAutosave.emit(false)
  }

  handleAnyUpdate() {
    this.pauseAutosaveStack.push(true)
    this.autosaveReady = false
    window.setTimeout(this.popPauseAutosaveStack.bind(this), this.autosaveDelay)
  }

  popPauseAutosaveStack() {
    this.pauseAutosaveStack.pop()
    // console.log('pop', this.pauseAutosaveStack)
    this.autosaveReady = this.pauseAutosaveStack.length === 0
  }
}
