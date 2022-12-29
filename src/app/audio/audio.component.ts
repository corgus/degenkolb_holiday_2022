
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

@Component({
  moduleId: module.id,
  selector: 'ss-audio',
  templateUrl: 'audio.component.html',
  styleUrls: ['audio.component.scss']
})

export class AudioComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input('ssOptions') options: any
  @ViewChild("audioplayer", { static: false }) audioplayer: ElementRef;

  isPlaying: boolean = false
  audio: any
  src: any
  srcWAV: any
  srcMP3: any

  noTimeline: boolean = true
  noTimestamp: boolean = true

  muteToggled: boolean = false

  showControls = true

  controls = ['mute-toggle']
  silenceDone = true
  shouldPlay: boolean
  autoplay: boolean

  constructor(
    private cdr: ChangeDetectorRef,
    // private pageService: PageService
  ) {}

  ngOnInit() {
    this.update()
  }

  ngAfterViewInit() {
    window.setTimeout( this.handleSilenceDone.bind(this), 1000)
  }

  ngOnChanges() {
    this.update()
    // console.log('audioplayer', this.audioplayer)
  }

  ngOnDestroy() {
  }

  handleSilenceDone() {
    this.silenceDone = true
    this.detectChanges()


    if (!this.audioplayer) return this.findAudioAfterDelay() // { console.warn('no audioplayer?'); return }
    this.audio = this.audioplayer.nativeElement

    if (this.autoplay) this.audio.play()

    // console.log('audio', this.audio, this.audio.controlsList)

    this.update()
  }

  findAudioAfterDelay() {
    return window.setTimeout(this.findAudioNow.bind(this), 1000)
  }

  findAudioNow() {
    this.audio = document.getElementById("audioplayer")
    // console.log('found', this.audio)
    if (!this.audio) return this.findAudioAfterDelay()
    if (this.autoplay) this.audio.play()
    this.update()
  }

  controlIs(control, test) {
    // console.log('control?', control, test, control === test)
    return control === test
  }

  update() {
    if (!this.options) return this.detectChanges()
    this.src = this.options['src']
    this.srcWAV = this.options['srcWAV']
    this.srcMP3 = this.options['srcMP3']
    this.noTimeline = this.options['timeline'] !== true
    this.noTimestamp = this.options['timestamp'] !== true
    this.autoplay = !!this.options['autoplay']
    // this.srcWEBM = this.src['webm']
    this.detectChanges()
  }

  handleMuteToggle(evt?) {
    if (!this.audio) console.log('no audio...')
    this.muteToggled = !this.muteToggled
    // console.log('hmt', this.muteToggled, this.shouldPlay, this.muteToggled)
    if (this.shouldPlay) this.play()
    if (this.muteToggled) {
      this.pause()
    }
    // this.muteToggled ? this.pause() : this.play()

    // play/pause
    // let isPlaying = this.audio && !this.audio.paused
    // isPlaying ? this.pause() : this.play()

    // this.muteToggled = !isPlaying

    this.detectChanges()
  }

  // handleSelectMute() {

  // }

  // handleSelectMuted() {

  // }

  pause() {
    if (!this.audio) return
    this.audio.pause()
  }

  play() {
    this.shouldPlay = true
    if (this.muteToggled) return
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
