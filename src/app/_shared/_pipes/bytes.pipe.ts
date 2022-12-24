import { Pipe,
         PipeTransform } from '@angular/core'

@Pipe({
  name: 'bytes'
})

// from https://gist.github.com/JonCatmull/ecdf9441aaa37336d9ae2c7f9cb7289a
export class BytesPipe {

  private abbr = [ 'bytes', 'KB', 'MB', 'GB', 'TB', 'PB' ]

  transform(bytes: number = 0, precision: number = 2 ) : string {
    if ( isNaN( parseFloat( String(bytes) )) || ! isFinite( bytes ) ) return '?'
    let unit = 0

    while ( bytes >= 1024 ) {
      bytes /= 1024
      unit ++
    }

    return bytes.toFixed( + precision ) + ' ' + this.abbr[ unit ]
  }
}
