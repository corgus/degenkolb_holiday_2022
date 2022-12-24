// import { AppConstants } from '../_constants/app-constants'
import { CorgStatic } from '../_helpers/corg-static'
// import { PageHelper } from '../_helpers/page-helper'

export class BaseClass {
  id: number
  // readonly klass: string
  klass: string
  klass_details: any
  created_at: string
  updated_at: string

  constructor(inputJSON?: any) {
    if (inputJSON) return this.fromJSON(inputJSON)
  }

  public fromJSON(data: any, clearKeys = true): any {
    if (!data) return this
    let klass = this.klass
    if (clearKeys) this.clearAllKeys()
    if (klass) this['klass'] = klass

    let jsonObj = this.jsonFromData(data)
    let key = Object.keys(jsonObj)[0]
    // console.log('jsonObj', jsonObj, key, jsonObj[key])
    for (const propName of Object.keys(jsonObj)) {
      this[propName] = jsonObj[propName]
    }
    return this
  }


  public isEmpty() {
    for (let key in this) {
      if (this.hasOwnProperty(key)) return false
    }
    return true
  }

  public hasID() {
    return 'id' in (this || {})
  }

  public clearAllKeys() {
    for (let key in this) {
      if (this.hasOwnProperty(key)) {
        delete this[key]
      }
    }
  }

  public hasAttribute(attribute: string) {
    if (!(attribute in this)) {
      return false
    } else {
      let hasAttribute = this[attribute] ? true : false
      return hasAttribute
    }
  }

  public urlParams() {
    return CorgStatic.urlParamsFrom(this)
  }

  jsonFromData(data: any) {
    if (data === null) return {}
    if (typeof data === 'undefined') return {}
    if (typeof data === 'object') return data
    if (typeof data !== 'string') return {}
    // allow quoteless keys in input
    let fixedJSON = data.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ')
    return JSON.parse(fixedJSON)
  }

  public isKlass(klass: string) {
    return this.klass === klass
  }

  public itemCode(): string|void {
    if (!this.hasAttribute('klass')) return console.log('itemCode: no klass', this)
    if (!this.hasAttribute('obfuscated_id')) return console.log('itemCode: no obId', this)
    let klassDetails = CorgStatic.klassDetails(this['klass'])
    if (!klassDetails) return console.log('itemCode: bad klass', this)
    return klassDetails['prefix'] + this['obfuscated_id']
  }
}
