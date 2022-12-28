
import { ChangeDetectorRef,
         Component,
         EventEmitter,
         Input,
         Output,
         OnInit,
         OnChanges,
         OnDestroy } from '@angular/core'

// import { PageService } from 'src/app/_core/index'

@Component({
  moduleId: module.id,
  selector: 'ss-book-page',
  templateUrl: 'book-page.component.html',
  styleUrls: ['book-page.component.scss']
})

export class BookPageComponent implements OnInit, OnChanges, OnDestroy {

  @Input('ssOptions') options: any
  @Input('ssResetPages') resetPages: boolean
  @Input('ssIndex') index: any
  // @Input('ssTotalPages') totalPages: any
  // @Input('ssIndexViewed') indexViewed: number
  // @Input('ssPage') page: any
  @Input('ssPages') pages: any
  @Input('ssTotalPages') totalPages: number
  // @Input('ssResetPages') resetPages: boolean

  // @Output() onPageFlip = new EventEmitter<any>()
  @Output() onPageFlipping = new EventEmitter<any>()

  isFlipped: boolean
  front: any
  back: any
  zIndex: number
  isFlipping: boolean

  book_transition_duration = 1300
  pageClass: string = ''
  indexViewing: number

  // bindingWidth: number
  coverSrc: string
  coverUrlFront: string
  coverUrlBack: string
  coverSrcFront: string
  coverSrcBack: string
  coverUrlInner: string
  coverSrcInner: string
  coverPosition: string

  frontCoverSrc: string
  backCoverSrc: string
  innerCoverSrc: string
  isBackCover: boolean
  isFrontCover: boolean
  isLeft: boolean
  isRight: boolean
  isFirst: boolean
  isLast: boolean
  pageBackground: string

  // coverZindexFront: number
  // coverZindexBack: number
  coverOpacityFront: number = 0
  coverOpacityBack: number
  // coverWhiteOpacityFront: number = 1
  // coverWhiteOpacityBack: number = 0

  // innerCoverSrcSrc: string
  // mapOpen$: any

  constructor(
    private cdr: ChangeDetectorRef,
    // private pageService: PageService
  ) {}

  ngOnInit() {
    console.log('book-page')
    this.zIndex = 999 - this.index
    this.update()
    // this.mapOpen$ = this.mapOpenStream()
  }

  ngOnChanges(changes) {
    console.log('BookPageComponent changes', changes)
    console.log('chg: pageContent', this.pages)
    this.update()
    this.detectChanges()
    // this.mapOpen$ = this.mapOpenStream()
  }

  ngOnDestroy() {
    // if (this.mapOpen$) this.mapOpen$.unsubscribe()
  }

  update() {
    if (typeof this.index === 'undefined') return console.warn('ERR - book-page INDEX')
    // if (typeof this.pages === 'undefined') return console.warn('ERR - book-page PAGES')
    // this.front = this.pages[this.index]
    // this.back = this.pages[this.index + 1]
    // console.log('front, back', this.front, this.back)
    this.isFirst = this.index === 0 || this.index === 1
    this.isLast = this.index === (this.totalPages - 1) || this.index === (this.totalPages - 2)
    this.pageBackground = (this.isFirst || this.isLast) ? 'white' : 'transparent'
    // this.updateCoverShown()
    // this.isFrontCover = this.index === 0 && !this.isFlipped
    // this.isBackCover = this.index === this.totalPages - 1 && this.isFlipped

    // this.updateCover()
    // this.updateIsLeft()
    this.updateCoverShown()
    // this.zIndex = 999 - this.index
    this.pageClass = 'page-' + this.index

    // console.log('index, viewed', this.index, this.pages)

    this.updateFromOptions()
    this.updateCover()
    // this.updateIsLeft()

    this.detectChanges()
  }

  updateCover() {
    this.isFrontCover = this.index === 0 && !this.isFlipped
    this.isBackCover = this.index === (this.totalPages - 2) && this.isFlipped
    this.coverSrcFront = this.getCoverSrc()
    this.coverSrcBack = this.getCoverSrc(true)
    this.coverPosition = this.getCoverPosition()
    this.coverUrlFront = `url(${this.frontCoverSrc})`
    this.coverUrlBack = `url(${this.backCoverSrc})`
    this.coverUrlInner = `url(${this.innerCoverSrc})`

    this.updateCoverShown()
    // console.log('cover', this.coverSrc)
    this.detectChanges()
  }

  // updateIsLeft() {
  //   // this.isLeft = (this.index + 1) % 2 === 0 && !
  //   this.isLeft = this.isFlipped
  // }


  getCoverSrc(back?: boolean) {
    // console.log('gsc', back, this.isFrontCover, this.isBackCover)
    if (this.isFrontCover && !back) return this.frontCoverSrc
    if (this.isBackCover && back) return this.backCoverSrc
    return this.innerCoverSrc
  }

  getCoverPosition() {
    return this.isFlipped ? 'right' : 'left'
  }

  updateFromOptions() {
    if (!this.options) return
    // this.bindingWidth = this.options['binding_width']
    // this.coverSrc = this.options['cover']
    this.frontCoverSrc = this.options['front_cover']
    this.backCoverSrc = this.options['back_cover']
    this.innerCoverSrc = this.options['inner_cover']
    // console.log('opts', this.options)
    this.detectChanges()
  }

  updateCoverShown() {
    // this.coverOpacityFront = this.isFlipped ? this.zIndex - 1 : this.zIndex - 2
    this.coverOpacityBack = this.isFlipped ? 1 : 0
    this.coverOpacityFront = this.isFlipped ? 0 : 1
    // console.log('OCS', this.coverOpacityBack)
    // console.log('zinds f b', this.coverZindexFront, this.coverZindexBack)
    this.detectChanges()
  }

  flipPage($event?) {
    // console.log('flipPage', $event)
    if ($event && $event.defaultPrevented) return console.log('flipPage prevented!', $event)

    // console.log('flipPage', $event)

    if (this.isFlipping) return
    this.isFlipping = true
    this.isFlipped = !this.isFlipped

    this.indexViewing = this.isFlipped ? this.index + 2 : this.index
    this.onPageFlipping.emit(this.indexViewing)
    this.detectChanges()
    // this.onPageFlip.emit(this.index)
    // this.updateCover()
    if (this.isFlipped) {

      window.setTimeout(() => {
        this.zIndex = this.index + 1
        // console.log('isFlippped', this.zIndex)
        // this.indexViewed = this.index + 2
        // this.onPageFlip.emit(this.indexViewing)
        this.isFlipping = false
        this.update()
      }, this.book_transition_duration * 0.5)

      window.setTimeout(() => {
        this.updateCover()
      }, this.book_transition_duration * 0.4)

    } else {
      // this.zIndex = 999 - this.index
      // this.indexViewing = this.index
      // this.onPageFlip.emit(this.index)
      this.zIndex = 999 - this.index

      window.setTimeout(() => {
        this.update()
      }, this.book_transition_duration)


      window.setTimeout(() => {
        this.isFlipping = false
        this.detectChanges()
      }, this.book_transition_duration * 0.5)

      window.setTimeout(() => {
        this.updateCover()
      }, this.book_transition_duration * 0.4)

      // this.detectChanges()
    }
  }

  // afterTransition()

  // mapOpenStream() {
  //   return this.pageService.mapOpen.subscribe( (open:boolean) => {
  //     console.log('*TODO*', open)
  //     this.detectChanges()
  //   })
  // }

  detectChanges() {
    if (!this.cdr['destroyed']) this.cdr.detectChanges()
  }
}
