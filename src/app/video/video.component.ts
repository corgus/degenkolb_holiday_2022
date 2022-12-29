
import { AfterViewInit,
         ChangeDetectorRef,
         Component,
         ElementRef,
         // EventEmitter
         Input,
         OnChanges,
         // Output,
         OnInit,
         // OnChanges,
         OnDestroy,
         ViewChild } from '@angular/core'


// Importing video.js
// import videojs from 'video.js'

// import { PageService } from 'src/app/_core/index'

@Component({
  moduleId: module.id,
  selector: 'ss-video',
  templateUrl: 'video.component.html',
  styleUrls: ['video.component.scss']
})

export class VideoComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  // name = "Angular"

  @Input('ssSrc') src: any

  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  // @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;


  isPlaying: boolean = false
  width = "640px"
  height = "267px"

  srcWEBM: string
  srcMP4: string

  video: any


  constructor(
    private cdr: ChangeDetectorRef,
    // private pageService: PageService
  ) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    // console.log('videoplayer', this.videoplayer)
    if (this.videoplayer) this.video = this.videoplayer.nativeElement
  }

  ngOnChanges() {
    this.update()
    // console.log('videoplayer', this.videoplayer)
  }

  ngOnDestroy() {
  }

  update() {
    this.srcMP4 = this.src['mp4']
    this.srcWEBM = this.src['webm']
    this.detectChanges()
  }

  public play(evt?: any) {
    // console.log('PLAYING?', this.video)
    this.video.play()
  }

  public pause(evt?: any) {
    this.video.pause()
  }

  public restart() {
    this.video.currentTime = 0
  }

  playPause() {
    if (this.video.paused) this.video.play()
    else this.video.pause()
  }

  makeBig() {
    this.video.width = 560
  }

  makeSmall() {
    this.video.width = 320
  }

  makeNormal() {
    this.video.width = 420
  }

  skip(value) {
    this.video.currentTime += value
  }


  handleClickVideo(evt: any) {
    // console.log('clicked-video')
    // evt.stopPropagation()
    // console.log('TODO: remove stop Prop')
  }

  detectChanges() {
    if (!this.cdr['destroyed']) this.cdr.detectChanges()
  }
}
