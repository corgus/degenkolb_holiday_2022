
export class CorgStatic {


  public static get EMAIL_REGEX(): string { return ".+\@.+\..+" }
  // public static URL_REGEX = RegExp('[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?')
  //                                                     [-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?
  public static get URL_REGEX(): RegExp { return new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&/=]*)?/) }
  // public static get URL_REGEX(): string { return "[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?' }

  public static get DATA_URL_REGEX(): string { return "^data:.*" }

  // returns a comma-separated string of input array, with conditional conjunction
  // (['a'], 'or') => 'a'
  // (['a', 'b'], 'and') => 'a and b'
  // (['a', 'b', 'c'], 'nay') => 'a, b, nay c'
  public static listStringFromArray(arr:string[], conjunction:string): string {
    let l = arr.length
    if (!l) return
    if (l < 2) return arr[0]
    if (l < 3) return arr.join(` ${conjunction} `)
    arr = arr.slice()
    arr[l - 1] = `${conjunction} ${arr[l - 1]}`
    return arr.join(", ")
  }

  public static klassDetails(klass: string) {
    if (!klass) return null
    switch(klass) {
      case 'Attachment':     return this.kdfp(null, 'attachment', 'fas fa-images')
      case 'Entry':          return this.kdfp('p',  'post', 'fas fa-file-alt')
      case 'Exploration':    return this.kdfp('e',  'exploration', 'fas fa-search')
      case 'ItemCollection': return this.kdfp('c',  'collection', 'fas fa-layer-group')
      case 'Location':       return this.kdfp('l',  'location', 'fas fa-map-marker-alt')
      case 'LocationIqPlace': return this.kdfp(null,  'location-iq-place', 'fas fa-map-marker')
      case 'Map':            return this.kdfp('m',  'map', 'fas fa-map')
      case 'Item':           return this.kdfp(null, 'item', null)
      case 'User':           return this.kdfp('u',  'profile', 'fas fa-user')
      case 'Root':           return null
      default: return // console.log('klassDetails: bad klass', klass)
    }
  }

  public static IsJsonString(str: string): boolean {
    try { JSON.parse(str) } catch (e) { return false }
    return true
  }

  public static iconClassFromKlass (klass: string, mod = 'fas') {
    if (!mod) { console.log('iconClassFromKlass !mod', klass, mod); return null }

    let klassLookup = {
      'ItemCollection': 'fa-layer-group',
      'Entry': 'fa-file-alt',
      'Exploration': 'fa-earth-americas',
      'LocationIqPlace': 'fa-map-marker', // 'fa-map-marker-alt',
      'Location': 'fa-map-marker-alt',
      'User': 'fa-user',
      'ItemLink': 'fa-external-link-alt',
    }
    let klassClass = klassLookup[klass]
    if (!klassClass) return // { console.warn('ERR: iconClassFromKlass key', klass); return }
    return [mod, klassClass].join(' ')
  }

  // klassDetailsFromParams
  private static kdfp(prefix: string, lowerClass: string, iconClass: string) {
    return { prefix: prefix, lower_class: lowerClass, icon_class: iconClass }
  }


  public static itemCodeFromKlassId( klass: string, obId: string) {
    let prefix = this.klassDetails(klass)['prefix']
    return prefix + obId
  }

  public static klassDisplayFromThing(thing: any) {
    return CorgStatic.classDisplayFromKlass(this.klassFromThing(thing))
  }

  public static klassFromThing(thing: any) {
    return thing['resource_klass'] || thing['klass'] || 'Item'
    // if (thing['resource_klass']) klass = thing['resource_klass']
    // return klass
  }

  public static classDisplayFromKlass(klass: string) {
    if (!klass) return null
    switch(klass) {
      case 'Entry': return 'Post'
      case 'ItemCollection': return 'Collection'
      case 'Exploration': return 'Explore'
      case 'LocationIqPlace': return 'New Location' //New Location'
      default: return klass
    }
  }

  public static stringIsEmpty(str: string) {
    return (!str || 0 === str.length)
  }

  public static objectIsEmpty(object: any) {
    for (let i in object) return false
    return true
  }

  public static bothAreObjects(obj1, obj2) {
    let tx = typeof obj1
    let ty = typeof obj2
    let areObjects =  obj1 && obj2 && tx === 'object' && ty === tx
    // if (!areObjects) console.log('!obj', typeof obj1, typeof obj2, obj1, obj2, )
    return areObjects
    // return (!obj1 || !obj2 || typeof obj1 !== 'object' || typeof obj2 !== 'object')
  }

  public static similarTypes(a, b) {
    return typeof a === typeof b
  }

  public static objectsHaveSameKeyLength(obj1, obj2) {
    return Object.keys(obj1).length === Object.keys(obj2).length
  }

  // https://stackoverflow.com/questions/201183/how-to-determine-equality-for-two-javascript-objects
  public static objectsAreIdentical(obj1, obj2) {
    if (!this.bothAreObjects(obj1, obj2)) {
      let eq = obj1 === obj2
      // if (!eq) console.log('!eq-id', obj1, obj2)
      return eq
    }
    if (!this.objectsHaveSameKeyLength(obj1, obj2)) return false
    let pass = Object.keys(obj1).every(key => {
      let identical = CorgStatic.objectsAreIdentical(obj1[key], obj2[key])
      // console.log('ident', identical, key, obj1[key])
      return identical
    })
    // console.log('identical:', pass, obj1, obj2)
    return pass
  }

  public static objectsAreSimilar(obj1, obj2, depth = 0) {
    if (depth > 3) return true // exit after compared third-depth attributes
    if (!this.bothAreObjects(obj1, obj2)) {
      let eq = obj1 === obj2
      // if (!eq) console.log('!eq-sim', obj1, obj2)
      return eq
    }
    // console.log('similar?', obj1, obj2, typeof obj1)
    if (!this.objectsHaveSameKeyLength(obj1, obj2)) return false
    let similar = Object.keys(obj1).every(key => {
      let sim = CorgStatic.objectsAreSimilar(obj1[key], obj2[key], depth + 1)
      // if (!sim) console.log('!sim', key, obj1[key], obj2[key])
      return sim
    })
    // if (!similar) console.log('not similar:', obj1, obj2)
    return similar
  }

  public static valuesAreIdentical(obj1: any, obj2: any, values: string[]) {
    for (let val of values) {
      if (obj1[val] !== obj2[val]) return false
    }
    return true
  }

  public static normalizedCoord(coords: string|number, precision = 6): number {
    if (!coords) return
    if (typeof coords === 'string') coords = Number(coords)
    // coords = parseInt(coords) // ensure coords is number
    return parseFloat(coords.toFixed(precision))
  }

  public static boundsFromBoundingBox(bb: number[]) {
    if (!bb) return
    let nw = { latitude: this.numberFromUnknown(bb[0]), longitude: this.numberFromUnknown(bb[2]) }
    let se = { latitude: this.numberFromUnknown(bb[1]), longitude: this.numberFromUnknown(bb[3]) }
    let out = { nw: nw, se: se }
    return out
  }

  public static numberFromUnknown(thing: any) {
    switch (typeof thing) {
      case 'number': return thing
      case 'string': return parseFloat(thing)
      default: console.warn('ERR: numberFromUnknown typeof', typeof thing, thing)
    }
  }

  // returns name if returned result matches type...
  // i.e. nameIfType('state') is 'Florida', for LocationIqPlace with type 'state'
  public static locIqNameIfType(liq: any, types: (string|string[])): any {
    if (typeof types == 'string' ) types = [types]
    for (let type of types) {
      if (liq['type'] === type) return liq['display_place']
      // console.log('NOT TYPE', type, liq)
    }
  }

public static loqIqNameIfTypeIn

  public static locationFromResource(resource: any) {
    if (!resource || !resource['klass']) return
    // if (!resource['klass']) console.log('locationFromResource - klass needed!', resource)
    let loc = (resource['klass'] === 'Location') ? resource : resource.location
    return loc
  }

  public static coordinateString(latitude: any, longitude: any) {
    let lat = this.normalizedCoord(latitude)
    let lng = this.normalizedCoord(longitude)
    return lat + ', ' + lng
  }

  public static delayPromise(delay = 100, v?) {
    return new Promise((resolve) => {
      return window.setTimeout(resolve.bind(null, v), delay)
    })
  }


  // returns street number, assuming it's before street name
  //   123 3rd avenue       => 123
  //   12/13/14 56th st     => 12/13/14
  //   55;58 west 2nd ave   => 55;58
  //   33 1/2 7th street    => 33 1/2
  //   123A N. first st     => 123A
  //   123-A North 1st ave  => 123-A
  //   7th street           => null
  //   122nd ave            => null
  //   23rd avenue          => null
  // prev: ^((\d+(\/|\\|-|;| )*)+\w(?!(nd|th|st|rd))*\b)*
  // ^(((\d|\/|\\|-|;|\s)+)\w\s*(?!(nd|th|st|rd))\b)*
  // ^(((\d|\/|\\|-|;|\s)+)\w(?!(nd|th|st|rd))\b)*
  public static numberFromStreetOne(str: string) {
    let match = str.match(/^(((\d|\/|\\|-|;|\s)+)\w(?!(nd|rd|st|th))\b)*/gi)
    return match && match[0]
  }

  public static slugFromString(str: string, includePlaceholder=true) {
    let defaultSlug = includePlaceholder && '-'
    if (!str) return defaultSlug

    str = str.replace(/^\s+|\s+$/g, '') // trim
    str = str.toLowerCase()

    // remove accents, swap ñ for n, etc
    let from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:"
    let to   = "aaaaeeeeiiiioooouuuunc------"
    for (let i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-') // collapse dashes

    return str || defaultSlug
  }

  public static slugFromResource(thing: any, includePlaceholder=true) {
    if (!thing) return CorgStatic.slugFromString(null, includePlaceholder)
    // let item = new Item()
    // item.fromThing(resourceIn)
    let resource = thing['resource'] || thing
    let resourceSlug = resource['slug'] || resource['resource_slug']
    return CorgStatic.slugFromString(resourceSlug, includePlaceholder)
  }

  public static itemCodeSlug(itemCode, slug) {
    if (!itemCode) { console.warn('ics !itemCode', this); return }
    if (!slug) return itemCode // { console.warn('ics !slug', this); return itemCode }
    return itemCode + '/' + slug
  }

  // NOTE: keep UTD with AppConstants.NAMED_ROUTES_REGEX
  public static staticRootPages() {
    return ['dashboard', 'home', 'contact']
  }

  public static resourceFromThing(thing: any) {
    if (!thing) return
    return thing['resource'] || thing
  }

  public static urlParamsFrom(thing: any): string {
    return Object.keys(thing)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(thing[k]))
        .join('&')
  }

  public static paramsWithResourceAndThumbnail(params: any, resource: any) {
    if (!resource) return params
    let thingParams = CorgStatic.thingParams(resource)
    if (!thingParams) return params

    Object.assign(params, {
      resource_klass: thingParams['klass'],
      resource_id: thingParams['id'],
      resource_obfuscated_id: thingParams['obfuscated_id'],
      resource_slug: thingParams['slug'],
      resource_display: thingParams['display'],
      resource: resource,
      thumbnail: resource['thumbnail']
    })
    // if (thingParams['slug']) params['resource_slug'] = thingParams['slug']
    return params
  }

  public static paramsWithReference(params: any, reference: any) {
    if (!reference) return params
    let thingParams = CorgStatic.thingParams(reference)
    if (!thingParams) return console.log('paramsWithReference !thingParams', params, reference)

    Object.assign(params, {
      reference_klass: thingParams['klass'],
      reference_id: thingParams['id'],
      reference_obfuscated_id: thingParams['obfuscated_id'],
      reference_slug: thingParams['slug'],
      reference_display: thingParams['display'],
      reference: reference,
    })
    return params
  }

  public static paramsWithTimestamps(params: any, timestamps: any) {
    if (!timestamps) return params
    let newParams = {}
    if (timestamps['created_at']) newParams['created_at'] = timestamps['created_at']
    if (timestamps['updated_at']) newParams['updated_at'] = timestamps['updated_at']

    Object.assign(params, newParams)
    return params
  }

  public static paramsWithLocation(params: any, location: any) {
    if (!location) return params
    Object.assign(params, {
      latitude: location['latitude'],
      longitude: location['longitude'],
      boundingbox: location['boundingbox']
    })
    return params
  }

  // returns [klass, obId, title] from <Item|any>
  public static thingParams(thing: any) {
    // gets fields from thing; or item-thing (if thing is Item)
    if (!thing) return null
    // console.log('thingParams', thing)
    let isItem = thing['klass'] === 'Item'
    let params = {
      klass: isItem ? thing['resource_klass'] : thing['klass'],
      id: isItem ? thing['resource_id'] : thing['id'],
      obfuscated_id: isItem ? thing['resource_obfuscated_id'] : thing['obfuscated_id'],
      slug: this.slugFromThing(thing),
      display: this.displayFromThing(thing),
      thing: thing,
    }
    // console.log('thingParams', params)

    return params
  }

  public static slugFromThing(thing: any) {
    if (thing['klass'] === 'Item') return thing['slug']
    let display = this.displayFromThing(thing)
    return display && CorgStatic.slugFromString(display)
  }

  public static displayFromThing(thing: any) {
    if (thing['klass'] === 'Item') return thing['display']
    if (!thing || !thing.klass) return
    switch (thing.klass) {
      case 'Attachment':
      case 'Location':
      case 'Exploration':
      case 'User': return thing['name']
      case 'Entry':
      case 'ItemCollection': return thing['title']
      case 'Item': return thing['display']
      case 'ItemLocation': return (thing['resource'] || {})['name']
      case 'Policy': return thing['policy_type']
      default: console.warn('ERR: displayFromThing bad klass', thing.klass)
    }
    // isItem ? thing['display'] : CorgStatic.displayFromThing(thing)
  }

  public static parseInt(int: any) {
    return Number.parseInt(int, 10)
  }

  public static isJson(str: any) {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  }

  public static jsonFromString(str: string) {
    try {
      return JSON.parse(str)
    } catch (e) {
      return null
    }
  }

  // Note: keep UTD with TitleHelper.rb method
  public static untitledTitle(title: string): boolean {
    // untitled titles start with "untitled"
    let regex = /^(untitled)+( *){1}([^\s]*){1}( *)$/i
    return !!(title.match(regex))
  }

  public static dbPointFromLatLng(lat: any, lng: any) {
    return "(" + String(lng) + "," + String(lat) + ")"
  }

  // similar to QuillHelper.setAttributeMaybe, but different results
  public static objectWithMaybe(obj, params={}) {
    for (let [key, val] of Object.entries(params)) {
      // remove key if value is nil
      if (typeof val === 'undefined' || val === null ) { delete obj[key]; continue }
      // otherwise set object key to value
      obj[key] = val
    }
    return obj
  }

  public static colorClassFromKlass(klass: string): string {
    if (!klass) return ''
    switch (klass) {
      case 'ItemCollection': return 'color-klass-collection'
      case 'LocationIqPlace':
      case 'Location': return 'color-klass-location'
      case 'Entry': return 'color-klass-post'
      case 'User': return 'color-klass-user'
      case 'ItemLink': return 'color-klass-link'
      default: return '' // { console.log('bad resource_klass', klass); return '' }
    }
  }

  public static updatePositions(list: any[], prevPosition: number, newPosition: number) {
    // console.log('TODO: updateLinkPositions', this.itemLinks, prevPosition, newPosition)
    // let itemLinks = []
    // let itemLinks = CorgStatic.sortedByPosition(this.itemLinks)

    for (let item of list) {
      let pos = item.position
      let beforePrev = pos < prevPosition
      let beforeNew = pos < newPosition
      let isNew = pos === newPosition

      // console.log('upos', item, beforePrev, beforeNew, isNew)
      // update position of primary item
      if (pos == prevPosition) { item.position = newPosition; continue }
      // if before newPosition or after prevPosition and newPosition: do nothing
      if ((beforePrev && beforeNew) || (!beforePrev && !beforeNew && !isNew)) continue
      // is drop destination: add if previously before; subtract if previously after
      if (isNew) { beforePrev ? item.position++ : item.position--; continue }
      // if before prevPosition and after newPosition: add 1
      if (beforePrev && !beforeNew) { item.position++; continue }
      // if at or after prevPosition and before newPosition: subtract 1
      if (!beforePrev && !beforeNew) { item.position--; continue }
      console.warn('err: updatePositions', item, beforePrev, beforeNew, isNew)
    }

    // console.log('sorted', list.map(l => { return l.position }), list)
    return CorgStatic.sortedByPosition(list)
  }


  public static sortedBy(list: any[], key: string) {
    if (!list) return list
    return list.sort((a,b) => CorgStatic.sortBy(key, a,b))
  }

  public static sortBy( key: string, a: any, b: any ) {
    if (!a[key] && !b[key]) return 0
    if ( a[key] < b[key] ) return -1
    if ( a[key] > b[key] ) return 1
    return 0
  }

  public static objectsMatchAll(obj1: any, obj2: any, keys: any[]) {
    if (!obj1 && !obj2) return true
    if (!obj1 || !obj2) return false
    for (let [i, key] of keys.entries()) {
      let match = obj1[key] === obj2[key]
      if (!match) return false
    }
    return true
  }

  public static sortedByPosition(list) {
    if (!list) return list
    return list.sort((a,b) => CorgStatic.sortByPosition(a,b))
  }

  public static sortByPosition( a: any, b: any ) {
    if ( a.position < b.position ) return -1
    if ( a.position > b.position ) return 1
    return 0
  }

  public static  snakeCaseFromString(str: string) {
    if (!str) return
    return str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
              .map(x => x.toLowerCase())
              .join('_');
  }

  public static humanizeFromSnakeCase(snake: string) {
     let reg = /_/gi
     let out = snake.replace(reg, ' ')
     return out
  }

  public static titleCaseFromKebabCase(kebab: string) {
    return kebab.split('-')
                .filter(Boolean)
                .map(w => w[0].toUpperCase() + w.substring(1)).join(' ')
  }

  public static titleCase(str?: string): string {
    if (!str) return
    return str.toLowerCase().split(' ').map((word) => {
      return word.replace(word[0], word[0].toUpperCase())
    }).join(' ')
  }

  // https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
  public static escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  // https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
  public static replaceEscapedRegExp(string) {
    return string.replace(/\$/g, '$$$$');
  }

  public static delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
