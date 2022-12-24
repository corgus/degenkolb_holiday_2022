import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'ellipsis'
})

export class EllipsisPipe {
  transform(value: string, limit: number = 10) : string {
    if (!value) return

    // let limit = args.length > 0 ? parseInt(args[0], 10) : 10
    // let trail = args.length > 1 ? args[1] : '...'
    const trail = '...'

    return value.length > limit ? value.substring(0, limit) + trail : value
  }
}
