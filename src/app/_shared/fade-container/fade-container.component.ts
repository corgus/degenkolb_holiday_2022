import { ChangeDetectorRef,
         Component,
         Input,
         OnInit,
         OnChanges,
         TemplateRef } from '@angular/core'

import { Router } from '@angular/router'

// import { RouterService } from 'src/app/_core/index'

@Component({
  moduleId: module.id,
  selector: 'ss-fade',
  templateUrl: 'fade-container.component.html',
  styleUrls: ['fade-container.component.scss']
})

export class FadeContainerComponent implements OnInit, OnChanges {

  shouldShow = true
  updatedShouldShow: boolean
  fadeDisplay: boolean
  fadeOpacity: boolean

  defaultFadeParams = { display: 'inline-block', delay: 10, transition: 150 }
  delay: number

  isDisplayBlock: boolean
  isDisplayInline: boolean
  isDisplayInlineBlock: boolean

  transition: number
  isTransition1: boolean
  isTransition2: boolean

  fadeParams: any

  @Input('ssTemplate') template: TemplateRef<any>
  @Input('ssFadeParams') fadeParamsIn: any

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.update()
  }

  ngOnChanges(changes: any) {
    console.log('fc chg', changes)
    this.update()
  }

  update(): Promise<any> {
    // console.log('update - reset')
    this.reset()
    this.updateFadeParams()
    if (!this.fadeParams) return
    return this.shouldShow ? this.show() : this.hide()
  }

  reset() {
    this.fadeOpacity = false
    this.fadeDisplay = false
    this.detectChanges()
  }

  updateFadeParams(fadeParamsIn?: any) {
    let params = Object.assign({}, this.defaultFadeParams, (fadeParamsIn || this.fadeParamsIn))
    // console.log('fadeParams', params, this.fadeParamsIn)
    if (params === this.fadeParams) return
    this.fadeParams = params
    this.delay = params['delay']
    this.updateDisplay(params['display'])
    this.updateTransition(params['transition'])
    this.detectChanges()
  }

  updateDisplay(display: string) {
    this.isDisplayBlock = display === 'block'
    this.isDisplayInlineBlock = display === 'inline-block'
    this.isDisplayInline = display === 'inline'
  }
  updateTransition(transition: number) {
    this.transition = transition
    this.isTransition1 = this.transition === 150
    this.isTransition2 = this.transition === 300
    // console.log('t1 t2', this.isTransition1, this.isTransition2)
    if (!this.isTransition1 && !this.isTransition2) console.warn('bad fade transition:', transition)
    this.detectChanges()
  }

  show(): Promise<any> {
    this.fadeDisplay = true
    this.detectChanges()
    return new Promise(resolve => {
      return window.setTimeout(() => {
        if (!this.shouldShow) return
        this.fadeOpacity = true
        this.detectChanges()
      }, this.delay)
    })
  }

  hide(): Promise<any> {
    this.fadeOpacity = false
    this.detectChanges()
    return new Promise(resolve => {
      return window.setTimeout(() => {
        if (this.shouldShow) return
        this.fadeDisplay = false
        this.detectChanges()
      }, this.transition)
    })
  }

  detectChanges() {
    if (!this.cdr['destroyed']) this.cdr.detectChanges()
  }
}
