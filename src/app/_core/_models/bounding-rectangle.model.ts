import { BaseClass } from './_base.model'

export class BoundingRectangle extends BaseClass {
  height: number
  width: number
  x: number
  y: number

  bottom: number
  left: number
  right: number
  top: number

  bottomMeasured: number
  leftMeasured: number
  rightMeasured: number
  topMeasured: number // note: topMeasured is used for existence check

}
