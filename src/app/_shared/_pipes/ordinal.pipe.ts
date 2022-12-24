// from https://gist.github.com/JonCatmull/da9c8bb7367f1f55a4080bbc525c09ac
import { Pipe,
         PipeTransform } from '@angular/core'

const ordinals: string[] = ['th','st','nd','rd']

/*
 * Append ordinal to number (e.g. "1st" position)
 * Usage:
 *   value | ordinal:keepNumber
 * Example:
 *   {{ 23 |  ordinal}}
 *   formats to: '23rd'
 * Example:
 *   {{ 23 |  ordinal:false}}
 *   formats to: 'rd'
*/
@Pipe({name: 'ordinal'})
export class OrdinalPipe implements PipeTransform {

  transform(n: number, keepNumber = true) {
    let v = n % 100
    return (keepNumber?n:'') + (ordinals[(v-20)%10]||ordinals[v]||ordinals[0])
  }
}
