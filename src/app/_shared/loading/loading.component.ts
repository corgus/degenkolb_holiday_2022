import { Component,
         OnInit,
         Input } from '@angular/core'

// import { AppConstants } from 'src/app/_core/index'

@Component({
  moduleId: module.id,
  selector: 'corg-loading',
  templateUrl: 'loading.component.html',
  styleUrls: ['loading.component.scss'],
})

export class LoadingComponent implements OnInit {
  public loadingSrc = ''
  // public loadingGifBlack = AppConstants.LOADING_GIF_BLACK
  // public loadingGifWhite = AppConstants.LOADING_GIF_WHITE


  public loadingGifBlack: string = "data:image/gif;base64,R0lGODlhEAAQAPIAAP///2ZmZtra2o2NjWZmZqCgoLOzs729vSH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
  public loadingGifWhite: string = "data:image/gif;base64,R0lGODlhEAAQAPIAAP////////7+/v7+/v////7+/v7+/v7+/iH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="

  @Input() iconColor = 'black'
  @Input() loadingType = 'center'
  @Input() loadingSize = 'sm'
  @Input() disableCSS3 = false

  public canCSS3 = true
  loadingContainerClass: string
  loadingContentCss3Class: string
  loadingCirclesClass: string

  constructor() { }

  ngOnInit() {
    this.canCSS3 = !this.disableCSS3 && this.browserSupportsCSSProperty('animation')
    this.loadingContainerClass = 'loading-container--' + this.loadingSize
    this.loadingContentCss3Class = 'loading-content-css3--' + this.loadingSize
    this.loadingCirclesClass = 'loading-circles--' + this.loadingSize
    if (!this.canCSS3) {
      this.loadingSrc = this.isIconColor('black') ? this.loadingGifBlack : this.loadingGifWhite
    }
  }

  isLoadingType(type: string) {
    return (this.loadingType === type)
  }

  isIconColor(color: string) {
    return this.iconColor === color
  }

  // from https://trello.com/c/LLfcm4kr/290-update-loading-spinner
  browserSupportsCSSProperty(propertyName: string) {
    let elm = document.createElement('div')
    propertyName = propertyName.toLowerCase()

    if (elm.style[propertyName] !== undefined) return true

    let propertyNameCapital = propertyName.charAt(0).toUpperCase() + propertyName.substr(1)
    let domPrefixes = 'Webkit Moz ms O'.split(' ')

    // for (let i = 0; i < domPrefixes.length; i++) {
    //   if (elm.style[domPrefixes[i] + propertyNameCapital] !== undefined) return true
    // }
    for (let prefix of domPrefixes) {
      if (elm.style[prefix + propertyNameCapital] !== undefined) return true
    }

    return false
  }
}
