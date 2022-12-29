
// import { BaseClass } from './base-class.model'

import { ChangeDetectorRef,
         Component,
         ElementRef,
         EventEmitter,
         HostBinding,
         HostListener,
         Input,
         Output,
         OnInit,
         AfterViewInit,
         AfterContentInit,
         // OnChanges,
         OnDestroy,
         QueryList,
         ContentChildren,
         ViewChild,
         ViewChildren,
         ViewContainerRef } from '@angular/core'

import { trigger,
         state,
         style,
         animate,
         transition } from '@angular/animations';

import { FormArray,
         FormBuilder,
         FormGroup,
         Validators } from '@angular/forms'

import { Router,
         ActivatedRoute } from '@angular/router'

import { BookPageComponent } from '../book-page/book-page.component'
import { BookPageContentComponent } from '../book-page-content/book-page-content.component'

import { BookDegHelper } from './book-deg-helper'


import { VideoComponent } from '../../video/video.component'
import { AudioComponent } from '../../audio/audio.component'

@Component({
  moduleId: module.id,
  selector: 'ss-book-deg',
  templateUrl: 'book-deg.component.html',
  styleUrls: ['book-deg.component.scss'],
  animations: [
        trigger('simpleFadeAnimation', [
            transition('*=>*', [
                style({ opacity: 0 }),
                animate(600)
            ])
        ])
    ]
})


export class BookDegComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {

  @Input('ssResetPages') resetPages: boolean
  @ContentChildren(BookPageContentComponent) pages !: QueryList<BookPageContentComponent>
  @ViewChild('shareInput') shareInput: ElementRef
  @ViewChild('audioComponent') audioComponent: AudioComponent
  @ViewChildren(BookPageComponent) bookPages !: QueryList<BookPageComponent>
  @ViewChildren(VideoComponent) videoComponents !: QueryList<VideoComponent>
// , { read: ViewContainerRef }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // this.updateWindow()
  }

  page: number
  indexViewed = 0
  isClosedFront = true
  isClosedBack = false

  pages$: any
  pageContent: any
  totalPages: number = 14;

  madlib: any[]
  submitted = false
  isInvalid: boolean

  options = {
    front_cover: '/assets/img/deg/green/book-cover--front.png',
    back_cover: '/assets/img/deg/green/book-cover--back.png',
    inner_cover: '/assets/img/deg/green/book-cover--inner-half.png'
  }

  images = [
    '/assets/img/deg/deg-book-img-1.png',
    '/assets/img/deg/deg-book-img-2.png',
    '/assets/img/deg/deg-book-img-3.png',
    '/assets/img/deg/deg-book-img-4.png',
  ]

  animateIndex = [ false, false, false, false, false ]

  madlibPrompts = [
    'verb, ending in -ing',
    'noun, plural',
    'verb, past tense',
    'verb',
    'verb, ending in -ing',
    'noun, clothing',
    'noun, plural',
    'verb, past tense',
  ]


  randomOptions = [
    [ 'skipping', 'loitering', 'jumping', 'snoozing', 'pondering' ], // stirring
    [ 'beams', 'rafters', 'joists', 'trusses', 'girders' ], // beams
    [ 'flew', 'rolled', 'teleported', 'scampered', 'waltzed' ], // flew
    [ 'trot', 'slide', 'plod', 'march', 'crawl' ], // dash
    [ 'tapping', 'dancing', 'stomping', 'slapping', 'slipping' ], // pawing
    [ 'denim', 'cotton', 'twill', 'leather', 'fleece' ], // denim
    [ 'bolts', 'anchors', 'pins', 'plates', 'bricks' ],
    [ 'tripped', 'scoffed', 'somersaulted', 'laughed', 'froze' ], // laughed
  ]

  form: FormGroup = this.fb.group({
    word_1: this.fb.array([])
  })

  currentIndex: number
  shouldFloatInputLabel: any[]


  // NOTE: keep UTD with css (book_resources.scss)
  bookTransitionDuration = 1300

  // creditsData = BookDegHelper.creditsData
  creditsDataScroll: any[] // = BookDegHelper.creditsDataScroll

  isResettingCredits: boolean
  shareLink: string

  queryParam$: any
  totalWords: number
  isCopying: boolean
  isCopyingShareLink: boolean

  // copyControlTextDefault = "Copy Link"
  copyControlText: string = "Copy Link"

  videoSrc: any[] = [
    { mp4: '/assets/mov/scene 1.mp4' },
    { mp4: '/assets/mov/scene 2.mp4' },
    { mp4: '/assets/mov/scene 3.mp4' },
    { mp4: '/assets/mov/scene 4.mp4' },
  ]

  audioOptions = {
    srcMP3: '/assets/audio/audio_loop.mp3',
    srcWAV: '/assets/audio/audio_loop.wav'
  }

  logoSrc = '/assets/img/degenkolb-logo.png'

  windowDimensions: any
  scale: number
  bookTransform: string
  bookZoom: number

  isSm: boolean
  isXs: boolean
  firstPageFlipped: boolean


  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
    // private pageService: PageService
  ) {}

  ngOnInit() {

    // this.queryParam$ = this.queryParamStream()
    this.initFormGroup()
    this.updateWindow()
    this.update()
    this.creditsDataScroll = BookDegHelper.creditsDataScroll
    this.detectChanges()
    // this.updateQueryParams(null)
    // console.log('cd', this.creditsData)
  }

  ngAfterContentInit() {
    // console.log(`ngAfterContentInit - pages`, this.pages);
    this.pages$ = this.pagesStream()
    this.queryParam$ = this.queryParamStream()

    this.updatePageContent()
    // this.updateFormFromQueryParams()
    this.detectChanges()
  }

  ngAfterViewInit() {
    // this.detectChanges()

    // this.pages$ = this.pagesStream()
  }

  ngOnChanges(changes: any) {
    // console.log('changes', changes)
    this.update()
  }

  ngOnDestroy() {
    if (this.pages$) this.pages$.unsubscribe()
  }

  ngAfterDestroy() {
    if (this.queryParam$) this.queryParam$.unsubscribe()
  }


  get words() {
    return this.form.controls["w"] as FormArray;
  }

  queryParamStream() {
    return this.route.queryParams.subscribe(qp => {
      // console.log('QP - TODO: handle if page_qp > total_pages', qp)
      // this.page = qp['page'] || 1
      this.shareLink = window.location.href; // this.router.url;
      // console.log('sharelink', this.shareLink)
      this.updateFormFromQueryParams(qp)

      this.detectChanges()
      // this.update()
    })
  }


  updateWindow() {
    this.windowDimensions = { height: window.innerHeight, width: window.innerWidth }
    this.updateScale()
    this.detectChanges()
  }

  updateScale() {
    // console.log('updateScale', this.windowDimensions)
    if (!this.windowDimensions || !this.windowDimensions['height']) return
    this.scale = this.getScale()
    let transX = this.getTranslateX()
    this.bookZoom = parseFloat(this.scale.toFixed(6))
    window.setTimeout(() => {
      // this.bookTransform = "translateX(" + transX + ")"
      // console.log('bookTrans', this.bookTransform)
      this.detectChanges()
    }, 1000)
  }

  getScale() {
    let origHeight = 675  * 1.4
    let origWidth = 956  * 1.3
    let containerRatio = origHeight/origWidth
    let winHeight = this.windowDimensions['height']
    let winWidth = this.windowDimensions['width']
    let scaleHeight =  winHeight * containerRatio > winWidth
    let scale = scaleHeight ? winHeight / origHeight : winWidth / origWidth
    // scale = parseFloat(scale.toFixed(6))
    // if (this.windowDimensions['height']
    // console.log('scale', scale, scaleHeight, winHeight, winWidth)

    this.isSm = scale < 1
    this.isXs = scale < 0.8
    this.detectChanges()

    if (scale > 1.2) return 1.2
    // console.log('scale', scale, scaleHeight, winHeight, winWidth)
    return scale
  }

  getTranslateX() {
    if (this.scale > 1) return
    let val = -1 / this.scale * 250 + 250
    // console.log('translateX', val)
    return val + "px"
  }

  update() {
    this.resetShouldFloatInputLabel()
    this.detectChanges()
    // this.updateCopyControlText()
  }


  // updateCopyControlText() {
  //   this.copyControlText = this.isCopyingShareLink ? "Copied" : "Copy Text"
  // }


  updateFormFromQueryParams(qp: any) {
    // console.log('todo: ufqp', qp, this.form)
    if (!qp || !this.form) return
    for (let [key, val] of Object.entries(qp)) {
      let ctl = this.form.controls[key]
      // console.log('kv', key, val, ctl)
      if (ctl) ctl.setValue(val)
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      'w1': ['', [Validators.required]],
      'w2': ['', [Validators.required]],
      'w3': ['', [Validators.required]],
      'w4': ['', [Validators.required]],
      'w5': ['', [Validators.required]],
      'w6': ['', [Validators.required]],
      'w7': ['', [Validators.required]],
      'w8': ['', [Validators.required]]
    })

    this.totalWords = Object.keys(this.form.controls).length
  }


  public flip(dir?: number) {
    const bookPageFiltered = this.bookPages.filter((element, index) => index === (this.currentIndex / 2));
    if (!bookPageFiltered) return console.warn('ERR: bookPageFiltered')
    const bookPage = bookPageFiltered[0]

    // console.log('FLIP', dir, this.currentIndex, bookPage)
    bookPage.flipPage()
  }


  resetShouldFloatInputLabel() {
    this.shouldFloatInputLabel = Array(this.madlibPrompts.length)
  }


  updatePageContent() {
    this.pageContent = this.pages.toArray()
  }

  pagesStream() {
    return this.pages.changes.subscribe(data => {
        // console.log('pages$:', data)
        this.updatePageContent()
        this.detectChanges()
      }
    )
  }

  handlePageFlipping(pageIndex) {
    // console.log('pageFlipping', pageIndex)
    if (pageIndex === 2) this.handleFirstPageFlip()
    this.isClosedFront = pageIndex === 0;
    this.isClosedBack = pageIndex === this.totalPages;
    this.currentIndex = pageIndex
    let imageIndex = (pageIndex / 2) - 2
    this.updateAnimateIndex(imageIndex)
    // console.log('HPF', this.pages.length, imageIndex)
    this.detectChanges()
  }

  handleFirstPageFlip() {
    if (this.firstPageFlipped) return
    this.firstPageFlipped = true
    this.playAudio()
  }


  updateAnimateIndex(index?) {
    if (typeof index === 'undefined') {
      return this.resetAnimateIndex()
    } else {
      this.animateIndex[index] = true
      window.setTimeout(this.playVideo.bind(this,index), 1000)
    }

    this.detectChanges()
    // console.log('UAI-1', index, Object.assign([], this.animateIndex))
    window.setTimeout(this.resetAnimateIndex.bind(this, { except: index }), this.bookTransitionDuration * 0.5)
  }

  playAudio() {
    // this.videos
    let audio = this.audioComponent
    // console.log('playVideo', index, vid)
    // console.log('playAudio', audio)
    if (audio) audio.play()
  }

  playVideo(index: number) {
    // this.videos
    let vid = this.videoComponents.get(index)
    // console.log('playVideo', index, vid)
    if (vid) vid.play()
    // console.log('playVideo', index, vid)
  }

  resetAnimateIndex(params?) {
    let index = params ? params['except'] : null
    for (let [i, entry] of this.animateIndex.entries()) {
      if ((typeof index !== 'undefined') && index === i) continue
      this.animateIndex[i] = false
    }

    // console.log('UAI-2', index, Object.assign([], this.animateIndex))
    this.detectChanges()
  }

  bottomContent() {
    return this.pages[this.pages.length - 1]
  }

  controlNameFromIndex(index: number) {
    return "w" + (index + 1)
  }

  word(count: number) {
    let name = this.controlNameFromIndex(count - 1)
    // console.log('word', count, name, this.form.controls[name])
    return this.form.controls[name].value
  }

  handleInputChange(evt: any, index: number) {
    this.submitted = false
    // console.log('input-change', evt, this.form, this.form.value, this.word(1), this.word(2))

    this.updateFormValid()
    this.shouldFloatInputLabel[index] = evt
    this.detectChanges()
  }


  updateWord(index, word) {
    this.words[index] = word
    // console.log('updated', index, word, this.words)
  }

  handleSelectFormRandom() {
    this.shouldFloatInputLabel = new Array()
    this.shouldFloatInputLabel = Array.from(Array(this.madlibPrompts.length), x => 1)
    this.detectChanges()

    window.setTimeout(this.updateWithRandomWordsNow.bind(this), 500)
  }

  handleSelectFormReset() {
    this.form.reset()
    this.detectChanges()

    this.updateQueryParamsFromWords()
    // window.setTimeout(this.updateWithRandomWordsNow.bind(this), 500)
  }

  updateWithRandomWordsNow() {
    for (const [index, set] of this.randomOptions.entries()) {
      let optionsAvailable = set.length
      let rand = Math.floor(Math.random() * optionsAvailable)
      let val = set[rand]
      // console.log('set, val', rand, val)
      this.form.controls[this.controlNameFromIndex(index)].setValue(val)
    }
    this.updateFormValid()
  }

  updateFormValid() {
    if (!this.form.valid) return this.handleInvalid()
    this.handleValid()
  }

  handleInvalid() {
    if (!this.submitted) return
    this.markAllInputsAsTouched()
    this.isInvalid = true
    this.detectChanges()
    return // console.warn('invalid form...', this.form)
  }

  handleValid() {
    this.isInvalid = false
    // this.updateQueryParamsFromWords()
  }


  updateQueryParamsFromWords() {
    let qp = {}
    // console.log('form', this.form)
    for(var i = 0; i < this.totalWords; i++){
      let key = this.controlNameFromIndex(i)
      qp[key] = this.word(i + 1)
    }
    // console.log('qp', qp)
    // let params = { ["w" + index + 1]: this.word(index + 1) }
    window.setTimeout(this.updateQueryParams.bind(this, qp), 100);
    this.detectChanges()
  }

  handleSubmitForm() {
    // console.log('submit!', this.form, this.form.valid)

    this.isInvalid = false
    this.submitted = true
    this.updateFormValid()
    if (!this.form.valid) return this.handleInvalid()

    this.updateQueryParamsFromWords()
    this.flip(1)
    this.detectChanges()
  }

  markAllInputsAsTouched() {
    this.form.controls['w1'].markAsTouched()
    this.form.controls['w2'].markAsTouched()
    this.form.controls['w3'].markAsTouched()
    this.form.controls['w4'].markAsTouched()
    this.form.controls['w5'].markAsTouched()
    this.form.controls['w6'].markAsTouched()
    this.form.controls['w7'].markAsTouched()
    this.form.controls['w8'].markAsTouched()
    this.detectChanges()
  }


  handleClickForm($event) {
    // console.log('handleClickForm')
    // $event.preventDefault()
    $event.stopPropagation()
  }

  formValueFromIndex(i: number) {
    return this.form.controls[this.controlNameFromIndex(i)].value
  }

  handleReplayCredits(evt: any) {
    // evt.preventDefault()
    // console.log('TODO: handleReplayCredits')
    evt.stopPropagation()
    this.isResettingCredits = true

    // this.updateAnimateIndex(null)
    this.detectChanges()
    window.setTimeout(this.resetCreditReset.bind(this), 10)
  }

  resetCreditReset() {
    this.isResettingCredits = false;
    this.updateAnimateIndex(4)
    this.detectChanges()
    // console.log('reset-reset')
  }

  handleSelectShareLink(evt: any) {
    evt.stopPropagation()
    // console.log('TODO: copy to clipboard, toast', this.shareLink)

    // this.toggleShareLinkCopied(true)
    // console.log('SHARE', this.shareInput)
    if (this.shareInput) {
      let el = this.shareInput.nativeElement
      // let val = el.value
      el.focus()
      el.setSelectionRange(0, el.value.length)
    }

    // var text = "Example text to appear on clipboard";
    navigator.clipboard.writeText(this.shareLink).then(() => {
      // console.log('Async: Copying to clipboard was successful!');
      this.toggleShareLinkCopied()
    }, function(err) {
      console.error('ERROR: Could not copy text: ', err);
    });
  }

  toggleShareLinkCopied(toggle=true) {
    if (toggle && this.isCopyingShareLink) return
    this.isCopyingShareLink = toggle

    this.detectChanges()
    if (!toggle) return
    window.setTimeout(this.toggleShareLinkCopied.bind(this, false), 3000)
  }

  updateQueryParams(qp = {}): Promise<boolean> {
    // console.warn('>>> uqp', qp)
    return this.router.navigate([], { queryParams: qp })
  }

  detectChanges() {
    if (!this.cdr['destroyed']) this.cdr.detectChanges()
  }
}
