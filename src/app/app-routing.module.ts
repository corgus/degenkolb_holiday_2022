import { NgModule } from '@angular/core'

import { RouterModule,
         Routes,
         UrlSegment } from '@angular/router'

// import { PathNotFoundComponent } from 'src/app/shared/index'

// import { ContainerSeoComponent } from 'src/app/main/index'

import { environment } from 'src/app/_core/index'


const ROUTES: Routes = [

  // TODO: why doesn't this work? currently just redirecting from shared-listener...
  // { path: '',
  //   redirectTo: 'home',3/1
  //   pathMatch: 'full'
  // },

  // { path: 'admin',
  //   loadChildren: () => import(`./admin/admin.module`).then(m => m.AdminModule) },

  // { matcher: (url) => {
  //     let primaryMatch = new RegExp(AppConstants.PRIMARY_ROUTE_MATCHER_REGEX, 'g')
  //     let matches = url && url[0].path.match(primaryMatch)
  //     // console.log('matcher:', matches, primaryMatch, url)
  //     if (!matches) return null

  //     let title = url.length > 1 ? url[1].path : null
  //     let posParams = { first: new UrlSegment(url[0].path, {}) }

  //     if (url.length > 1) {
  //       let secondParam = { second: new UrlSegment(url[1].path, {}) }
  //       posParams = Object.assign(posParams, secondParam)
  //     }

  //     if (url.length > 2) {
  //       let thirdParam = { third: new UrlSegment(url[2].path, {}) }
  //       posParams = Object.assign(posParams, thirdParam)
  //     }

  //     if (url.length > 3) {
  //       let fourthParam = { fourth: new UrlSegment(url[3].path, {}) }
  //       posParams = Object.assign(posParams, fourthParam)
  //     }

  //     // console.log('matched!', url[0].path, posParams)
  //     return { consumed: url,
  //              posParams: posParams }
  //   },
  //   component: ContainerSeoComponent,
  // },

  // { path: '**',
  //   component: PathNotFoundComponent,
  //   data: { title: 'Path Not Found' } }

]

@NgModule({
  // imports: [ RouterModule.forRoot(ROUTES, { enableTracing: !environment.production }) ],
  imports: [ RouterModule.forRoot(ROUTES) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
