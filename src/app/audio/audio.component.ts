
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


// Importing audio.js
// import audiojs from 'audio.js'

// import { PageService } from 'src/app/_core/index'

@Component({
  moduleId: module.id,
  selector: 'ss-audio',
  templateUrl: 'audio.component.html',
  styleUrls: ['audio.component.scss']
})

export class AudioComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  // name = "Angular"

  // @Input('ssSrc') src: any

  @Input('ssOptions') options: any

  @ViewChild("audioPlayer", { static: false }) audioplayer: ElementRef;
  // @ViewChild("audioPlayer", { static: false }) audioplayer: ElementRef;


  isPlaying: boolean = false
  // width = "640px"
  // height = "267px"
  // srcWEBM: string
  // srcMP4: string

  audio: any
  src: any
  srcWAV: any
  srcMP3: any

  noTimeline: boolean = true
  noTimestamp: boolean = true

  muteToggled: boolean = false

  showControls = true

  controls = ['mute-toggle']

  constructor(
    private cdr: ChangeDetectorRef,
    // private pageService: PageService
  ) {}

  ngOnInit() {
    this.update()
  }

  ngAfterViewInit() {
    if (!this.audioplayer) return
    this.audio = this.audioplayer.nativeElement
    this.audio.play()
    console.log('audio', this.audio, this.audio.controlsList)
  }

  ngOnChanges() {
    this.update()
    // console.log('audioplayer', this.audioplayer)
  }

  ngOnDestroy() {
  }

  controlIs(control, test) {
    // console.log('control?', control, test, control === test)
    return control === test
  }

  update() {
    if (!this.options) return
    this.src = this.options['src']
    this.srcWAV = this.options['srcWAV']
    this.srcMP3 = this.options['srcMP3']
    this.noTimeline = this.options['timeline'] !== true
    this.noTimestamp = this.options['timestamp'] !== true
    // this.srcWEBM = this.src['webm']
    this.detectChanges()
  }

  handleMuteToggle(evt?) {
    this.muteToggled = !this.muteToggled
    this.muteToggled ? this.pause() : this.play()
    this.detectChanges()
  }

  // handleSelectMute() {

  // }

  // handleSelectMuted() {

  // }

  pause() {
    this.audio.pause()
  }

  play() {
    this.audio.play()
  }

  // public play(evt?: any) {
  //   // console.log('PLAYING?', this.audio)
  //   this.audio.play()
  // }

  // public pause(evt?: any) {
  //   this.audio.pause()
  // }

  public restart() {
    this.audio.currentTime = 0
  }

  // playPause() {
  //   if (this.audio.paused) this.audio.play()
  //   else this.audio.pause()
  // }


  handleClickAudio(evt: any) {
    console.log('clicked-audio')
    // evt.stopPropagation()
    // console.log('TODO: remove stop Prop')
  }

  detectChanges() {
    if (!this.cdr['destroyed']) this.cdr.detectChanges()
  }
}
