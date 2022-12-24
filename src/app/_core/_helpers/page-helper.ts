import { Injectable } from '@angular/core'

import { ActivatedRoute,
         Router,
         UrlTree,
         UrlSegment,
         UrlSegmentGroup } from '@angular/router'

// import { SpotsagaStatic } from './spotsaga-static'
// import { PageKeyLookup } from '../_models/page-key-lookup.model'


@Injectable()
export class PageHelper {

  private static lookupLocal: any = {
    'admin': {
      url: '/admin',
    },

    'users': {
      url: '/admin/users',
    },

    'logout': {
      url: '/logout',
    },

    'overview': {
      url: '/admin/overview',
    },

    'projects': {
      url: '/admin/projects',
    },

    'spotsaga': {
      url: 'https://www.spotsaga.com',
    },

    'spotsaga-github': {
      url: 'https://github.com/corgus/spotsaga',
    },

    'lcp-quickbooks-api': {
      url: 'https://web.postman.co/workspace/71ae781b-1f18-4ce6-87ea-e6eca7bfd8d8/request/23885429-5dc76239-31c6-4919-be83-17f2d2b8a6ce',
    },

    'lcp': {
      url: 'https://www.lowercaseproductions.com/'
    },
  }

  public lookup(val?) {
    return val ? PageHelper.lookupLocal[val] : PageHelper.lookupLocal
  }

  public lookupUrl(val) {
    let lookup = this.lookup(val)
    return lookup && lookup['url']
  }

}
