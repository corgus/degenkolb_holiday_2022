import { BaseClass } from './_base.model'
import { CorgStatic } from '../_helpers/corg-static'

export class WindowDimensions extends BaseClass {
  innerHeight: number
  innerWidth: number
  visualViewport: any // height, width are attributes
  // scrollX: number
  // scrollY: number

  leftBar1Offset: number
  leftBar2Offset: number
  leftBoundBar1Offset: number
  leftBoundBar2Offset: number
  close1Offset: number
  close2Offset: number

  isSm(): boolean {
    return this.innerWidth < 570
  }

  isSmMain(): boolean {
    return this.innerWidth < 900
  }

  isSimilarTo(windowDimensions: WindowDimensions) {
    return CorgStatic.objectsAreSimilar(this, windowDimensions)
  }
}
