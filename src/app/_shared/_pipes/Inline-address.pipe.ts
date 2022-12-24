import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'inlineAddress'
})

export class InlineAddressPipe {
  transform(value: string) : string {
    if (!value) return

    return value.replace(/(\n)+/g, '; ')
  }
}
