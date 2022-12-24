

// Angular
import { BrowserModule,
         DomSanitizer } from '@angular/platform-browser'

import { NgModule,
         Optional,
         SkipSelf } from '@angular/core'
         // ɵ_sanitizeStyle } from '@angular/core'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'

import { HttpService } from './_services/http.service'

import { LazyLoaderService } from './_services/lazy-loader.service'

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  declarations: [
  ],
  providers: [
    HttpService,

    LazyLoaderService,
    // SpotsagaValidators,

    // { provide: DomSanitizer,
    //   useClass: NgDompurifySanitizer },

    // { provide: DOMPURIFY_CONFIG,
    //   useValue: { FORBID_ATTR: ['id', 'style'] } },

    // { provide: DOMPURIFY_HOOKS,
    //   useValue: [{
    //     name: 'beforeSanitizeAttributes',
    //     hook: (node: Element) => {
    //       node.removeAttribute('id');
    //     },
    //   }] },

    // { provide: SANITIZE_STYLE,
    //   useValue: ɵ_sanitizeStyle },
  ],
  exports: [
  ]
})

export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (!parentModule) return
    throw new Error('CoreModule is already loaded. Import it in the AppModule only')
  }
}
