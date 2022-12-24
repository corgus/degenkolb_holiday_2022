
import { ChangeDetectorRef,
         Component,
         EventEmitter,
         Input,
         Output,
         OnInit,
         OnChanges,
         OnDestroy,
         ViewChild,
         ViewContainerRef } from '@angular/core'

// import { BookService } from '../book.service'

@Component({
  moduleId: module.id,
  selector: 'ss-book-page-content',
  templateUrl: 'book-page-content.component.html',
  styleUrls: ['book-page-content.component.scss']
})

export class BookPageContentComponent implements OnInit, OnChanges, OnDestroy {

  @Input('ssOptions') options: any
  @Input('ssResetPages') resetPages: boolean
  @Input('ssIndexViewed') indexViewed: number
  // @Input('ssIndexViewed') indexViewed: number
  @Input('ssPageContent') pageContent: any

  // @Input('ssIsTemplate') isTemplate: boolean = false
  // @Input('ssResetPages') resetPages: boolean

  @Output() onPageFlip = new EventEmitter<any>()

  // @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef

  index: number
  page: any
  pages: any

  constructor(
    private cdr: ChangeDetectorRef,
    // private bookService: BookService
  ) {}

  ngOnInit() {
    this.update()
  }

  ngOnChanges(changes) {
    this.update()
    console.log('BookPageComponent changes', changes)
  }

  ngOnDestroy() {
  }

  update() {
    if (!this.options) return
    this.index = this.options['index']
    // this.pages = this.options['page']
    this.page = this.pageContent
    // this.page = this.pages ? this.pages[this.index] : null
    console.log('PAGE', this.options, this.pages, this.index, this.page)
    this.detectChanges()
  }

  detectChanges() {
    if (!this.cdr['destroyed']) this.cdr.detectChanges()
  }
}
