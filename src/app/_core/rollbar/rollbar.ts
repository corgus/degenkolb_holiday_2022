// import * as Rollbar from 'rollbar'; // When using Typescript < 3.6.0.
import Rollbar from 'rollbar'
// `import Rollbar from 'rollbar';` is the required syntax for Typescript 3.6.x.
// However, it will only work when setting either `allowSyntheticDefaultImports`
// or `esModuleInterop` in your Typescript options.

import { Injectable,
         Inject,
         InjectionToken,
         isDevMode,
         ErrorHandler } from '@angular/core'

import { environment } from '../../../environments/environment'

export const RollbarService = new InjectionToken<Rollbar>('rollbar')

// onSendCallback(isUncaught, args, payload)

@Injectable()
export class RollbarErrorHandler implements ErrorHandler {

  // isDevMode = isDevMode()

  constructor(@Inject(RollbarService)
    private rollbar: Rollbar
  ) {}

  handleError(err:any) : void {
    if (!err) return
    if (isDevMode()) return console.error(err, ">>> ERR FROM RollbarErrorHandler")
    this.rollbar.error(err.originalError || err)
  }
}

export function spotsagaRollbarIgnoreDev(isUncught, args, payload): boolean {
  const titleCap = payload.body.trace.exception.class
  console.error(titleCap + ":", payload.body.trace.exception.message, payload.body.trace.frames) // payload)
  return true
}

export function spotsagaRollbarIgnore(isUncaught, args, payload): boolean {
  // dont report if in development mode. Comment this out if debugging needed
  if (!environment.production) return spotsagaRollbarIgnoreDev(isUncaught, args, payload)

  // ignore all errors with 5XX in recent telemetry
  const tel = payload.body.telemetry
  const last5 = tel.slice(Math.max(tel.length - 5, 0))
  for (let t of tel) {
    let status_code = t.body['status_code']
    let status_code_5XX = (499 < status_code && status_code < 512)
    // ignore if dev mode and status_code is 500-511
    if (isDevMode() && status_code_5XX ) return true
  }
  // ignore all uncaught errors and all 'debug' items
  if (payload.level === 'debug') return true
  // if uncaught and it got here, report it
  if (isUncaught === true) return false
  // don't ignore rollbar reporting
  return false
}

export function spotsagaRollbarIgnoredMessages() {
  return [
    "Expression has changed after it was checked"
  ]
}

export function rollbarFactory() {

  let envt = environment.production ? 'production' : 'development'
  let rollbarConfig = {
    accessToken: '7b43b380701b4e20bc92af11fa8953a0',
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: envt,
    code_version: environment.version,
    source_map_enabled: true,
    guess_uncaught_frames: true, // https://docs.rollbar.com/docs/source-maps
    itemsPerMinute: 10,
    maxItems: 30,
    // root: '/Users/corey/dev/spotsaga',
    ignoredMessages: spotsagaRollbarIgnoredMessages(),
    checkIgnore(i, a, p) { return spotsagaRollbarIgnore(i, a, p) },
    server: {
      root: "/Users/corey/dev/spotsaga"
    }
  }

  // console.log('rollbarFactory', rollbarConfig)

  return new Rollbar(rollbarConfig)
}
