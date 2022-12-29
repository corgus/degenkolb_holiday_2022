// https://www.mokkapps.de/blog/manually-lazy-load-modules-and-components-in-angular/
// https://stackblitz.com/github/mokkapps/angular-manual-lazy-load-demo

import { Compiler,
         Component,
         ComponentRef,
         // ComponentFactoryResolver,
         Injector,
         Injectable } from '@angular/core'

import { delay,
         tap } from 'rxjs/operators'

import { Observable,
         of as observableOf } from 'rxjs'

// import { SpotsagaStatic } from '../_helpers/spotsaga-static'

@Injectable({
  providedIn: 'root'
})
export class LazyLoaderService {
  private lazyMap: Map<string, Promise<any>> = new Map()

  constructor(
    private compiler: Compiler,
    private injector: Injector
  ) {}

  getModule(key: string): Promise<any> {
    // console.log('getModule', key, this.lazyMap, this.lazyMap.get(key))
    if (this.lazyMap.has(key)) return this.lazyMap.get(key)
    return this.loadModule(key).toPromise().then(() =>  this.lazyMap.get(key))
  }

  callbackFromModuleKey(moduleKey: string) {
    switch (moduleKey) {
    case 'book': return this.lazyMap.set('book', import('../../book/book.module').then(m => m.BookModule))
    //   case 'auth': return this.lazyMap.set('auth', import('../../auth/auth.module').then(m => m.AuthModule))
    //   case 'collection': return this.lazyMap.set('collection', import('../../item-collection/item-collection.module').then(m => m.ItemCollectionModule))
    //   case 'dashboard': return this.lazyMap.set('dashboard', import('../../dashboard/dashboard.module').then(m => m.DashboardModule))
    //   case 'home': return this.lazyMap.set('home', import('../../home/home.module').then(m => m.HomeModule))
    //   case 'contact': return this.lazyMap.set('contact', import('../../contact/contact.module').then(m => m.ContactModule))
    //   case 'main': return this.lazyMap.set('main', import('../../main/main.module').then(m => m.MainModule))
    //   case 'policy': return this.lazyMap.set('policy', import('../../policy/policy.module').then(m => m.PolicyModule))
    //   case 'profile': return this.lazyMap.set('profile', import('../../profile/profile.module').then(m => m.ProfileModule))
    //   case 'post': return this.lazyMap.set('post', import('../../entry/entry.module').then(m => m.EntryModule))
    //   case 'search': return this.lazyMap.set('search', import('../../search/search.module').then(m => m.SearchModule))
    //   case 'sidebar': return this.lazyMap.set('sidebar', import('../../sidebar/sidebar.module').then(m => m.SidebarModule))
    //   default: { console.warn('!!! CALLBACK???', moduleKey);  return observableOf() }
    }
  }

  resolveComponent(moduleKey: string, componentKey?: string): Promise<any[]> { //, ComponentFactoryResolver]> {
    return this.getModule(moduleKey).then(mod => {
      // console.log('module???', mod, moduleKey)
      return this.compiler.compileModuleAsync(mod).then(moduleFactory => {
        // Create a moduleRef, resolve an entry component, create the component
        const moduleRef = moduleFactory.create(this.injector) as any
        const componentFactory = moduleRef.instance.resolveComponent(componentKey)
        return [moduleRef, componentFactory]
      })
    })
  }

  compileModule(container: any, mod: any, componentKey?: string): Promise<any> {
    if (!container) return Promise.resolve()
    // return Promise.resolve()
    // console.log('compileModule', mod, container)
    return this.compiler.compileModuleAsync(mod).then(moduleFactory => {
    //   // Create a moduleRef, resolve an entry component, create the component
      const moduleRef = moduleFactory.create(this.injector) as any
      const componentFactory = moduleRef.instance.resolveComponent(componentKey)

      if (!container) { console.warn('!external'); return }

      container.clear()
      const componentRef = container.createComponent(componentFactory, 0, moduleRef.injector) as any
    })
  }

  // loadLazyModule(key: string): Promise<Map<string, Promise<any>>> {
  loadModule(key: string): Observable<any> {
    // console.log('loadModule:', key)
    return observableOf(1).pipe(delay(1), tap(() => this.callbackFromModuleKey(key) ))
  }
}
