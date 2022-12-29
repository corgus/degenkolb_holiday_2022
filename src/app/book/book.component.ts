
import { ChangeDetectorRef,
         Component,
         // EventEmitter
         // Input,
         // Output,
         OnInit,
         // OnChanges,
         OnDestroy,
         ViewChildren } from '@angular/core'

// import { PageService } from 'src/app/_core/index'

@Component({
  moduleId: module.id,
  selector: 'ss-book',
  templateUrl: 'book.component.html',
  // styleUrls: ['book.component.scss']
})

export class BookComponent implements OnInit, OnDestroy {

  // @Input('ssUser') user: User
  // @Output() onSubmitting = new EventEmitter<boolean>()
  // @ViewChildren(BookPageContent) pages !: QueryList<BookPageContent>
  // ss-book-page-template

  // @ViewChildren

  mapOpen$: any

  config: any = {
    articleSearch:  "cb266bc27ff645a181127b63ab80cc92",
    endpoint: "https://api.nytimes.com/svc/search/v2/articlesearch.json"
  }

  articles: any
  page: number
  resetPages: boolean = false
  selected: any

  bookOptions: any = {
    // cover: '/assets/img/book-cover-red-leather-full.png',
    // binding_width: 30,
    front_cover: '/assets/img/book-cover--front.png',
    back_cover: '/assets/img/book-cover--back.png',
    inner_cover: '/assets/img/book-cover--inner-half.png'
  }

  apiKey: any = this.config.articleSearch
  pages: any = []
  // resetPages: any = false

  constructor(
    private cdr: ChangeDetectorRef,
    // private pageService: PageService
  ) {}

  ngOnInit() {
    // this.mapOpen$ = this.mapOpenStream()
  }

  ngOnDestroy() {
    // if (this.mapOpen$) this.mapOpen$.unsubscribe()
  }

  getPages(url, callback = null) {
    return fetch(url)
      .then(response => {
        return response.json()
      })
      .then(json => {
        switch (callback) {
          case "start":
            this.resetPages = true
            this.populateStart(json);
            setTimeout(() => {
              this.resetPages = false
            }, 600);
            break;
          case "update":
            this.populatePages(json);
            break;
          default:
            console.log('no callback')
            break;
        }
      })
  }

  populatePages(json) {
    const articles = json.response.docs
    this.articles = this.articles.concat(articles)
  }

  populateStart(json) {
    const articles = json.response.docs
    this.articles = articles
  }

  getMore(evt: any) {
    this.page++
    let url = this.getURL(this.selected)
    return this.getPages(url, "update")
  }

  handleSelect(e: any) {
    let value = e.target.value
    this.selected = value
  }

  getURL(sectionName:any = "") {
    let url = this.config.endpoint
    url += "?"
    url += `&page=${this.page}`
    url += '&fq=source:("The New York Times")'
    if (sectionName.length > 0 && sectionName !== "all") {
      url += ` AND section_name:("${sectionName}")`
    } else {
      url += ' AND section_name:("Multimedia/Photos")'
    }
    return url += `&sort=newest&api-key=${this.apiKey}`
  }

  detectChanges() {
    if (!this.cdr['destroyed']) this.cdr.detectChanges()
  }
}
