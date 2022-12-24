// from https://gist.github.com/JonCatmull/e00afb1c96298a4e386ea1b5d091702a
import { Pipe, PipeTransform } from '@angular/core'

// Epochs
const epochs: any = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1]
]

/*
 * Turn Date into realtive date (e.g. 5 days ago)
 * Usage:
 *   value | relativeDate
 * Example:
 *   {{ 86400 |  relativeDate}}
 *   formats to: '1 day ago'
*/
@Pipe({name: 'relativeDate'})
export class RelativeDatePipe implements PipeTransform {

  // TODO: handle future dates...
  getDuration(timeAgoInSeconds: number) {
    for (let [name, seconds] of epochs) {
      let interval = Math.floor(timeAgoInSeconds / seconds)
      if (interval >= 1) {
        return { interval: interval,
                 epoch: name }
      }
    }
    return { interval: 0,
             epoch: 'second' }
  }

  transform(dateStamp: any): string {
    // console.log('ds', dateStamp, typeof dateStamp)
    let timeNowUtc = new Date().getTime()
    let timeAgoInSeconds  = Math.floor((timeNowUtc - new Date(dateStamp).getTime()) / 1000)

    let {interval, epoch} = this.getDuration(timeAgoInSeconds)
    let suffix            = interval === 1 ? '' : 's'
    let ago               = timeAgoInSeconds >= 0 ? ' ago' : ''
    let _in               = timeAgoInSeconds < 0 ? 'in ' : ''

    let out = `${_in}${interval} ${epoch}${suffix}${ago}`

    // debugging
    // let localUtc = new Date(new Date()).toLocaleString('en-US')
    // let dateStampStr = new Date(dateStamp).toLocaleString('en-US')
    // console.log('when? ' + out + ':', dateStamp, ' >>> ', dateStampStr, localUtc, timeAgoInSeconds)

    return out
  }
}
