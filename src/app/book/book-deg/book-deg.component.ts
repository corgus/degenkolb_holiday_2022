
// import { BaseClass } from './base-class.model'

import { ChangeDetectorRef,
         Component,
         EventEmitter,
         HostBinding,
         Input,
         Output,
         OnInit,
         AfterViewInit,
         AfterContentInit,
         // OnChanges,
         OnDestroy,
         QueryList,
         ContentChildren,
         ViewChildren } from '@angular/core'

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
  @ViewChildren(BookPageComponent) bookPages !: QueryList<BookPageComponent>

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
  isCopied: boolean
          // <!-- <ss-video
          //   [ngClass]="{'is-animated': animateIndex[3] }"
          //   [ssSrc]="images[3]">
          // </ss-video> -->


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

  ngAfterDestroy() {
    if (this.queryParam$) this.queryParam$.unsubscribe()
  }

  queryParamStream() {
    return this.route.queryParams.subscribe(qp => {
      // console.log('QP - TODO: handle if page_qp > total_pages', qp)
      // this.page = qp['page'] || 1
      this.shareLink = window.location.href; // this.router.url;
      console.log('sharelink', this.shareLink)
      this.updateFormFromQueryParams(qp)

      this.detectChanges()
      // this.update()
    })
  }

  updateFormFromQueryParams(qp: any) {
    console.log('todo: ufqp', qp, this.form)
    if (!qp || !this.form) return
    for (let [key, val] of Object.entries(qp)) {
      let ctl = this.form.controls[key]
      console.log('kv', key, val, ctl)
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

  get words() {
    return this.form.controls["w"] as FormArray;
  }

  ngOnChanges(changes: any) {
    // console.log('changes', changes)
    this.update()
  }

  ngOnDestroy() {
    if (this.pages$) this.pages$.unsubscribe()
  }

  public flip(dir?: number) {
    const bookPageFiltered = this.bookPages.filter((element, index) => index === (this.currentIndex / 2));
    if (!bookPageFiltered) return console.warn('ERR: bookPageFiltered')
    const bookPage = bookPageFiltered[0]

    // console.log('FLIP', dir, this.currentIndex, bookPage)
    bookPage.flipPage()
  }

  update() {
    this.resetShouldFloatInputLabel()
    this.detectChanges()
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
    this.isClosedFront = pageIndex === 0;
    this.isClosedBack = pageIndex === this.totalPages;
    this.currentIndex = pageIndex
    let imageIndex = (pageIndex / 2) - 2
    this.updateAnimateIndex(imageIndex)
    // console.log('HPF', this.pages.length, imageIndex)
    this.detectChanges()
  }


  updateAnimateIndex(index?) {
    if (typeof index === 'undefined') {
      this.resetAnimateIndex()
    } else {
      this.animateIndex[index] = true
    }

    this.detectChanges()
    // console.log('UAI-1', index, Object.assign([], this.animateIndex))
    window.setTimeout(this.resetAnimateIndex.bind(this, { except: index }), this.bookTransitionDuration * 0.5)
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
    console.log('input-change', evt, this.form, this.form.value, this.word(1), this.word(2))

    // console.log('qpkey', `${qpKey}`)
    // this.updateQueryParams({`${qpKey}`: `${this.word(index)}`})

    this.updateFormValid()
    // let params = { ["w" + index + 1]: this.word(index + 1) }
    // window.setTimeout(this.updateQueryParams.bind(this, params), 100);
    this.shouldFloatInputLabel[index] = evt
    this.detectChanges()
  }


  updateWord(index, word) {
    this.words[index] = word
    // console.log('updated', index, word, this.words)
  }

  handleSelectRandom() {
    this.shouldFloatInputLabel = new Array()
    this.shouldFloatInputLabel = Array.from(Array(this.madlibPrompts.length), x => 1)
    this.detectChanges()

    window.setTimeout(this.updateWithRandomWordsNow.bind(this), 500)
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
    return console.warn('invalid form...', this.form)
  }

  handleValid() {
    this.isInvalid = false
    // this.updateQueryParamsFromWords()
  }


  updateQueryParamsFromWords() {
    let qp = {}
    console.log('form', this.form)
    for(var i = 0; i < this.totalWords; i++){
      // for (let [i, ctl] of Object.keys(this.form.controls).entries()) {
      // let params = { ["w" + i + 1]: this.word(i + 1) }
      // console.log('i,ctl', i, ctl)
      // let wordNumber = parseInt(i)
      let key = this.controlNameFromIndex(i)
      qp[key] = this.word(i + 1)
    }
    console.log('qp', qp)
    // let params = { ["w" + index + 1]: this.word(index + 1) }
    window.setTimeout(this.updateQueryParams.bind(this, qp), 100);
    this.detectChanges()
  }

  handleSubmit() {
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
    this.form.controls['word_1'].markAsTouched()
    this.form.controls['word_2'].markAsTouched()
    this.form.controls['word_3'].markAsTouched()
    this.form.controls['word_4'].markAsTouched()
    this.form.controls['word_5'].markAsTouched()
    this.form.controls['word_6'].markAsTouched()
    this.form.controls['word_7'].markAsTouched()
    this.form.controls['word_8'].markAsTouched()
    this.detectChanges()
  }


  handleClickForm($event) {
    console.log('handleClickForm')
    // $event.preventDefault()
    $event.stopPropagation()
  }

  formValueFromIndex(i: number) {
    return this.form.controls[this.controlNameFromIndex(i)].value
  }

  handleReplayCredits(evt: any) {
    // evt.preventDefault()
    console.log('TODO: handleReplayCredits')
    evt.stopPropagation()
    this.isResettingCredits = true

    this.updateAnimateIndex(null)
    this.detectChanges()
    window.setTimeout(this.resetCreditReset.bind(this), 100)
  }

  resetCreditReset() {
    this.isResettingCredits = false;
    this.updateAnimateIndex(4)
    this.detectChanges()
    // console.log('reset-reset')
  }

  handleShareLinkSelect(evt: any) {
    evt.stopPropagation()
    // console.log('TODO: copy to clipboard, toast', this.shareLink)

    // var text = "Example text to appear on clipboard";
    navigator.clipboard.writeText(this.shareLink).then(() => {
      console.log('Async: Copying to clipboard was successful!');
      this.showCopied()
    }, function(err) {
      console.error('ERROR: Could not copy text: ', err);
    });
  }

  showCopied() {
    if (this.isCopied) return
    this.isCopied = true
    window.setTimeout(() => {
      this.isCopied = false;
      this.detectChanges()
    }, 3000)
  }

  updateQueryParams(qp = {}): Promise<boolean> {
    // navigate = true, force = false
    // if (SpotsagaStatic.objectsAreIdentical(this.queryParamsLocal, qp)) return

    // let navigate = (typeof params['navigate'] === 'boolean') ? params['navigate'] : true
    // let force = params['force'] || false
    // let qpl = Object.assign({}, this.queryParamsLocal) // to fix 'Cannot assign to read only property'
    // this.queryParamsLocal = force ? qp : Object.assign({}, this.queryParamsLocal, qp)
    // this.queryParamsSubject.next(this.queryParamsLocal)
    // if (!navigate) return
    console.warn('>>> uqp', qp)
    return this.router.navigate([], { queryParams: qp })
                                      // queryParamsHandling: 'merge' })
  }

  detectChanges() {
    if (!this.cdr['destroyed']) this.cdr.detectChanges()
  }
}
