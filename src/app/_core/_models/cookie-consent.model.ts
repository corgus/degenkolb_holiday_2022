import { BaseClass } from './_base.model'

export class CookieConsent extends BaseClass {
  necessary: boolean
  performance: boolean
  targeting: boolean
  updated_at: any
  ver: number

  fromDefault() {
    let defaultJson = {
      necessary: true,
      performance: true,
      targeting: true,
      updated_at: Date.now(),
      ver: 1
    }
    return this.fromJSON(defaultJson)
  }

  allCookiesEnabled(): boolean {
    return this.necessary && this.performance && this.targeting
  }
}
