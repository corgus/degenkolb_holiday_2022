import { Injectable } from '@angular/core'

// import { ActivatedRoute,
//          Router,
//          UrlTree,
//          UrlSegment,
//          UrlSegmentGroup } from '@angular/router'

// import { SpotsagaStatic } from './spotsaga-static'
import { Overview } from '../_models/overview.model'


// overviewHelper.fragmentFromName(component['name'])

@Injectable()
export class OverviewHelper {

  private prefix:string = 'mat-'

  private static overviewsData: any = [

    { name: 'animation',
      urls: [ 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API' ]
    },

    { name: 'autocomplete',
      material: true },

    { name: 'badge',
      material: true },

    { name: 'book',
      urls: ['https://medium.com/undefined-methods/flipping-pages-with-css-ea7f8160745a',
             'https://3dbookcovergenerator.netlify.app/'] },

    { name: 'bottom-sheet',
      material: true },

    { name: 'button',
      material: true },

    { name: 'button-toggle',
      material: true },

    { name: 'card',
      material: true },

    { name: 'checkbox',
      material: true },

    { name: 'chip',
      material: true },

    { name: 'datepicker',
      material: true },

    { name: 'dialog',
      material: true },

    { name: 'divider',
      material: true },

    { name: 'drag-drop',
      urls: [ 'https://material.angular.io/cdk/drag-drop/' ] },

    { name: 'expansion-panel',
      material: true,
      material_link: 'expansion' },

    { name: 'form-field',
      material: true },

    { name: 'icon',
      material: true,
      urls: ['https://fonts.google.com/icons?icon.set=Material+Icons',
             'https://fonts.google.com/icons?icon.set=Material+Symbols'] },

    { name: 'input',
      material: true },

    { name: 'list',
      material: true },

    { name: 'menu',
      material: true },

    { name: 'paginator',
      material: true },

    { name: 'parallax',
      urls: [ 'https://alvarotrigo.com/blog/how-to-create-a-parallax-effect-with-css-only/',
              'https://codepen.io/yagoestevez/pen/EdgRMX',
              'https://www.youtube.com/watch?v=mxHoPYFsTuk&ab_channel=WebDevSimplified' ] },

    { name: 'progress-bar',
      material: true },

    { name: 'progress-spinner',
      material: true },

    { name: 'radio-button',
      material: true },

    { name: 'ripples',
      material: true,
      material_link: 'ripple' },

    { name: 'select',
      material: true },

    { name: 'sidenav',
      material: true },

    { name: 'slide-toggle',
      material: true },

    { name: 'slider',
      material: true },

    { name: 'sticky',
      urls: [ 'https://developer.mozilla.org/en-US/docs/Web/CSS/position' ] },

    { name: 'snackbar',
      material: true,
      material_link: 'snack-bar' },

    { name: 'stepper',
      material: true },

    { name: 'table',
      material: true,
      material_link: 'sort' },

    { name: 'tabs',
      material: true },

    { name: 'table-of-contents',
      urls: [ 'https://github.com/angular/angular/tree/main/aio/src/app/custom-elements/toc' ] },

    { name: 'toolbar',
      material: true },

  ]

  public overviews() {
    return OverviewHelper.overviewsData.map( (data: any) => {
      return new Overview(data)
    })
  }

  public fragmentFromName(name: string) {
    return this.prefix + name
  }

  // public snakeCaseFromString(str: string) {
  //   if (!str) return
  //   return str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
  //             .map(x => x.toLowerCase())
  //             .join('_');
  // }

}
