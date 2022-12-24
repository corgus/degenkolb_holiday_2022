// from https://gist.github.com/JonCatmull/998380fbb7fe23517790589652e881e3
import { Pipe, PipeTransform } from '@angular/core'
import { DatePipe } from '@angular/common'

import { RelativeDatePipe } from './relative-date.pipe' // https://gist.github.com/JonCatmull/e00afb1c96298a4e386ea1b5d091702a

const secondsPerDay = 86400

/*
 * Turn Date into realtive date (e.g. "5 days ago") unless date is
 * more than relativeMax days ago.
 * Support any value supported by Date() object constructor
 *
 * Takes an relative max days argument that defaults to 10.
 * Usage:
 *   value | smartDate:relativeMax
 * Example:
 *   {{ 2016-12-09T13:13:43.572Z |  smartDate:15}}
 *   formats to: '12 days ago'
 * Example2:
 *   {{ 2016-12-09T13:13:43.572Z |  smartDate}}
 *   formats to: '11/27/2016'
*/
@Pipe({name: 'smartDate'})
export class SmartDatePipe implements PipeTransform {

  transform(dateStamp: any, maxDaysAgo: number = 10): string {
    let timeAgoInSeconds = Math.floor((new Date().getTime() - new Date(dateStamp).getTime()) / 1000)
    let showRelative = timeAgoInSeconds < maxDaysAgo * secondsPerDay
    if (showRelative) return new RelativeDatePipe().transform(dateStamp)
    let localDate = new Date(dateStamp).toLocaleDateString('en-US')
    // console.log('localDate', localDate)
    return localDate
  }
}
