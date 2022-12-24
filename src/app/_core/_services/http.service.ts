import { throwError as observableThrowError,  Observable } from 'rxjs'
import { catchError, map, filter } from 'rxjs/operators'

import { Injectable } from '@angular/core'

import { HttpClient,
         HttpErrorResponse,
         HttpEvent,
         HttpEventType,
         HttpHeaders,
         HttpParams,
         HttpRequest } from '@angular/common/http'

// import { retryWithBackoff } from '../_operators/retry-with-backoff'


@Injectable()
export class HttpService {

  constructor(
    private httpClient: HttpClient
  ) {}

  // get(path: string, responseType = 'blob', params: HttpParams = new HttpParams()): Observable<any> {
  //   let options = {
  //     params: params,
  //     headers: this.setHeaders(),
  //     responseType: responseType
  //   }

  //   let req = new HttpRequest('GET', `${path}`, options)
  //   return this.httpClient.request(req).pipe(
  //     retryWithBackoff(),
  //     filter(event => this.checkEventType(event.type, HttpEventType.Response)),
  //     map((event: HttpEvent<any>) => {
  //       switch (event.type) {
  //         case HttpEventType.Response:
  //           return this.extractData(event)
  //         default:
  //           console.warn("HttpService get - INVALID RESPONSE", event)
  //           break
  //       }
  //     }),
  //     catchError((e: HttpErrorResponse) => {
  //       return this.handleHttpError(e)
  //     })
  //   )

  // }

  // // checks event is one of enumerated types
  // checkEventType(eventType:number, types: number|number[]) {
  //   // console.log('checkEventType', eventType, types)
  //   if (Array.isArray(types)) {
  //     return types.indexOf(eventType) >= 0
  //   } else {
  //     return eventType === types
  //   }
  // }

  // // from: https://gist.github.com/dusanmarsa/2ca9f1df36e14864328a2bb0b353332e
  // // referenced: https://github.com/quilljs/quill/issues/137
  // // also in quill-clipboard
  // loadImageThen(file: File|Blob, callback: any) {
  //   let reader = new FileReader()
  //   reader.onload = function(e) {
  //     let img = document.createElement('img')
  //     let target = <FileReader>e.target
  //     callback(target.result)
  //   }
  //   reader.readAsDataURL(file)
  // }

  // setHeaders(headerType:string = 'default'): HttpHeaders {
  //   let httpHeaders = new HttpHeaders()
  //     // .set('Access-Control-Allow-Origin', 'https://www.google.com')
  //   return httpHeaders
  // }

  // extractData(res: any) {
  //   return res.body
  // }

  // handleHttpError(httpError: HttpErrorResponse) {
  //   console.warn("HttpService ERROR:", httpError)
  //   return this.returnHttpError(httpError)
  // }

  // returnHttpError(e: HttpErrorResponse) {
  //   // console.log('returnHttpError:', e, 'e.error:', e.error)
  //   return observableThrowError(e.error)
  // }
}
