
import { ChangeDetectorRef,
         Component,
         EventEmitter,
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

// import { PageService } from 'src/app/_core/index'
import { BookPageComponent } from '../book-page/book-page.component'
import { BookPageContentComponent } from '../book-page-content/book-page-content.component'

@Component({
  moduleId: module.id,
  selector: 'ss-book-carousel',
  templateUrl: 'book-carousel.component.html',
  styleUrls: ['book-carousel.component.scss']
})

export class BookCarouselComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {

  @Input('ssOptions') options: any
  // @Input('ssPages') pages: any[]
  @Input('ssResetPages') resetPages: boolean
  // @Output() getMore = new EventEmitter<boolean>()

  @ContentChildren(BookPageContentComponent) pages !: QueryList<BookPageContentComponent>
  @ViewChildren(BookPageComponent) bookPages !: QueryList<BookPageComponent>



  page: number
  // topContent: any
  // pageContents: any
  indexViewed = 0
  isClosedFront = true
  isClosedBack = false

  // bindingWidth: number
  pages$: any
  pageContent: any

  // bookClass: string = ''
  // pages: any[]
  // mapOpen$: any

  constructor(
    private cdr: ChangeDetectorRef,
    // private pageService: PageService
  ) {}

  ngOnInit() {
    // console.log('book-page')
    this.update()
    // this.mapOpen$ = this.mapOpenStream()
  }

  ngAfterContentInit() {
    console.log(`ngAfterContentInit - pages`, this.pages);
    this.pages$ = this.pagesStream()
    this.updatePageContent()
    this.detectChanges()
  }

  ngAfterViewInit() {
    console.log('PAGES', this.pages)
    this.detectChanges()

    console.log('bookPages', this.bookPages)

    this.pages$ = this.pagesStream()
    // console.log('indexViiewed',f this.indexViewed)
    // this.mapOpen$ = this.mapOpenStream()
  }

  ngOnChanges(changes: any) {
    console.log('changes', changes)
    this.update()
    // this.topContent = this.pages[0]
    // this.pageContents = this.pages //.slice(1, this.pages.length - 1)
    this.detectChanges()
    // this.mapOpen$ = this.mapOpenStream()
  }

  // handlePageFlip(index) {
  //   console.log('handlePageFlip', index)
  //   this.advance()
  //   // if (index >= (this.pages.length - 6)) {
  //   //   this.advance()
  //   // }
  // }


  ngOnDestroy() {
    if (this.pages$) this.pages$.unsubscribe()
  }

  updatePageContent() {
    this.pageContent = this.pages.toArray()
  }

  pagesStream() {
    return this.pages.changes.subscribe(data => {
        console.log('pages$:', data)
        this.updatePageContent()
        this.detectChanges()
      }
    )
  }

  // public flip(dir: number) {
  //   if (dir < 0) return this.flipBack()
  //   this.flipForward()
  // }

  // flipForward() {

  // }

  // flipBack() {

  // }

  update() {
    // this.updateFromOptions()
  }

  // updateFromOptions() {
  //   if (!this.options) return
  //   this.bindingWidth = this.options['binding_width']
  //   this.coverSrc = this.options['cover']
  //   this.innerCoverSrc = this.options['cover']
  // }

  handlePageFlipping(index) {
    this.isClosedFront = index === 0;
    this.isClosedBack = index === this.pages.length;
    // this.currentIndex = index
    // console.log('HPF', this.pages.length, index)
    this.detectChanges()
  }

  // topContent() {
  //   return this.pages[0]
  // }

  bottomContent() {
    return this.pages[this.pages.length - 1]
  }

  // pageArticles
  // pageContents() {
  //   let pageContent = this.pages.slice(1, this.pages.length - 1)
  //   return pageContent
  // }

  // getMore(evt?: any) {
  //   this.page++
  //   this.detectChanges()
  //   // let url = this.getURL(this.selected)
  //   // return this.getContents(url, "update")
  // }

  // advance() {
  //   this.getMore()
  // }


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
