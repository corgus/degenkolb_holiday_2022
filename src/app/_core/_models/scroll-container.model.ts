import { BaseClass } from './_base.model'

export class ScrollContainer extends BaseClass {
  // the current scroll position:
  scrollX: number
  scrollY: number

  // updated when window dimensions updated:
  scrollXMeasured: number
  scrollYMeasured: number

  // updated at scroll, relative to scroll'Dimensions
  scrollXDiff: number
  scrollYDiff: number
}
