import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DragDebugService {
  debugInfo = new BehaviorSubject<any[]>(null)
  enabled = true

  constructor() {}

  log(info: any[]) {
    this.debugInfo.next(info)
  }

  reset() {
    this.debugInfo.next(null)
  }
}
