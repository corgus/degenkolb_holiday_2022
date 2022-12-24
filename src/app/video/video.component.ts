
import { ChangeDetectorRef,
         Component,
         ElementRef,
         // EventEmitter
         Input,
         // Output,
         OnInit,
         // OnChanges,
         OnDestroy,
         ViewChild } from '@angular/core'

// import { PageService } from 'src/app/_core/index'

@Component({
  moduleId: module.id,
  selector: 'ss-video',
  templateUrl: 'video.component.html',
  // styleUrls: ['book.component.scss']
})

export class VideoComponent implements OnInit, OnDestroy {

  // name = "Angular";

  @Input('ssSrc') src: string

  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;

  isPlay: boolean = false
  width = "640px"
  height = "267px"


  constructor(
    private cdr: ChangeDetectorRef,
    // private pageService: PageService
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  play(event: any) {
    this.videoplayer.nativeElement.play();
  }

  playPause() {
    var myVideo: any = document.getElementById("my_video_1");
    if (myVideo.paused) myVideo.play();
    else myVideo.pause();
  }

  makeBig() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 560;
  }

  makeSmall() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 320;
  }

  makeNormal() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 420;
  }

  skip(value) {
    let video: any = document.getElementById("my_video_1");
    video.currentTime += value;
  }

  restart() {
    let video: any = document.getElementById("my_video_1");
    video.currentTime = 0;
  }


  detectChanges() {
    if (!this.cdr['destroyed']) this.cdr.detectChanges()
  }
}
