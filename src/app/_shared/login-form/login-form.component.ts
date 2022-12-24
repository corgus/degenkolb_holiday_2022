import { ChangeDetectorRef,
         Component,
         EventEmitter,
         Input,
         OnInit,
         OnDestroy,
         Output,
         ViewChild } from '@angular/core'

import { FormBuilder,
         FormGroup,
         Validators } from '@angular/forms'

import { ActivatedRoute,
         Router } from '@angular/router'

import { // ActivityService,
         ApiService,
         AuthService,
         // AppConstants,
         CorgStatic,
         CookieService,
         CookieConsent,
         // IpDetail,
         // IpDetailService,
         // PageService,
         RouterService,
         ToastService } from 'src/app/_core/index'

// import { RecaptchaInputComponent } from '../form/recaptcha-input/recaptcha-input.component'


@Component({
  moduleId: module.id,
  selector: 'ss-login-form',
  templateUrl: 'login-form.component.html',
})

export class LoginFormComponent implements OnInit, OnDestroy {

  // @ViewChild(RecaptchaInputComponent) recaptcha: RecaptchaInputComponent

  ipDetail$: any
  loginMessage$: any
  returnUrl$: any
  returnUrl: string
  // ipDetail: IpDetail = new IpDetail()
  // requireRecaptcha = true
  recaptchaResponse: string
  cookie$: any
  cookieConsent: CookieConsent

  backendErrors: any = {}
  form: FormGroup
  isSubmitting = false
  emailRegex: string = CorgStatic.EMAIL_REGEX
  message: string

  constructor(
    private cdr: ChangeDetectorRef,
    private apiService: ApiService,
    private authService: AuthService,
    // private activityService: ActivityService,
    private cookieService: CookieService,
    private fb: FormBuilder,
    // private ipDetailService: IpDetailService,
    // private pageService: PageService,
    private route: ActivatedRoute,
    private router: Router,
    private routerService: RouterService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.apiService.updateLastLoginLoad()

    // this.ipDetail$ = this.ipDetailStream()
    this.loginMessage$ = this.loginMessageStream()
    this.returnUrl$ = this.returnUrlStream()
    this.cookie$ = this.cookieStream()

    this.form = this.fb.group({
      'email': ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      'password': ['', Validators.required],
    })
  }

  ngOnDestroy() {
    if (this.ipDetail$) this.ipDetail$.unsubscribe()
    if (this.loginMessage$) this.loginMessage$.unsubscribe()
    if (this.returnUrl$) this.returnUrl$.unsubscribe()
    if (this.cookie$) this.cookie$.unsubscribe()
  }

  // ipDetailStream() {
  //   return this.ipDetailService.currentIpDetail.subscribe( ipDetail => {
  //     this.ipDetail = ipDetail
  //     this.requireRecaptcha = this.ipDetail.restricted
  //     this.detectChanges()
  //   })
  // }

  loginMessageStream() {
    return this.authService.loginMessage.subscribe( message => {
      this.message = message
      this.detectChanges()
    })
  }

  returnUrlStream() {
    return this.apiService.returnUrl.subscribe( url => {
      this.returnUrl = url
      this.detectChanges()
    })
  }

  cookieStream() {
    return this.cookieService.cookieConsent.subscribe( res => {
      this.cookieConsent = res
      this.detectChanges()
    })
  }


  onSubmit() {
    if (!this.cookieConsentPassCheck()) return

    if (!this.form.valid) {
      this.form.controls['email'].markAsDirty()
      this.form.controls['password'].markAsTouched()
      return
    }

    this.updateSubmitting(true)
    this.backendErrors = {}
    this.form.value['g-recaptcha-response'] = this.recaptchaResponse

    this.authService.login(this.form.value).then(res => {
      // console.log('login res', res)
      // this.navigateToReturnUrl()
      window.setTimeout(this.handleLogin.bind(this), 100)
      // this.handleCloseForm()
    }).catch(err => {
      this.handleBackendErrors(err)
    })
  }

  handleLogin() {
    this.navigateToReturnUrl()
    this.handleCloseForm()
    // this.pageService.updatePersistRootPage(true).then(res => {
    //   this.navigateToReturnUrl()
    //   this.handleCloseForm()
    // })
  }



  onPopupClose(e: any) {
    this.handleCloseForm()
  }

  navigateToReturnUrl() {
    // TODO: save origin, maybe via
    // console.log('navToReturnUrl', this.returnUrl)
    // console.log('TODO: login - replace history?', this.returnUrl)
    let url = this.returnUrl || '/dashboard'
    let routeParams = { queryParamsHandling: 'merge',
                        replaceUrl: true }
    this.routerService.navigateByUrl(url, routeParams)
    // this.router.navigateByUrl(this.returnUrl || '/dashboard')
  }

  closePopup() {
    this.routerService.closeOutlet('p')
    this.handleCloseForm()
  }

  handleCloseForm() {
    this.authService.updateLoginMessage(null, 1000)
    this.authService.updateReturnUrl(null, 1000)
  }

  navigateToRegisterForm() {
    this.routerService.updateOutlets({ 'm': 'register', 'secondary': null })
  }

  navigateToPasswordForgot() {
    this.routerService.updateOutlet('p', 'password-forgot')
  }

  cookieConsentPassCheck(): boolean {
    let cc = this.cookieConsent
    if (!cc) return this.cookieConsentNeeded()
    if (!cc.allCookiesEnabled()) return this.cookieConsentNeeded()
    return true
  }

  cookieConsentNeeded(): boolean {
    this.toast.error('You must enable all cookies to log in', "Cookies needed!")
    let outletParams = { primary: 'auth/cookies', secondary: null }
    this.routerService.updateOutlets(outletParams)
    return false
  }

  handleCorrectCaptcha(event: any) {
    delete this.backendErrors['recaptcha_error']
    this.recaptchaResponse = event
  }

  handleExpiredCaptcha(event: any) {
    this.recaptchaResponse = event
  }

  handleBackendErrors(err: any) {
    this.backendErrors = err || {}
    console.log('handleBackendErrors', err)
    this.updateSubmitting(false)
    this.form.markAsPristine()

    // if (this.recaptcha) {
    //   // TODO: check for recaptcha response; reset if backend error is recaptcha
    //   this.recaptcha.reset()
    // }

    if (this.backendErrors['email_not_confirmed']) {
      this.authService.updatePendingEmail(this.form.value['email'])
      this.routerService.updateOutlet('p', 'verify-email-sent')
    }

    // if (this.backendErrors['recaptcha_error']) {
    //   this.requireRecaptcha = true
    //   this.recaptcha.reset()
    // }

    if (this.backendErrors['user_frozen']) {
      this.authService.updateLoginMessage(
        "This account is frozen. Feel free to contact us with any questions."
      )
    }
  }

  updateSubmitting(submitting: boolean) {
    this.isSubmitting = submitting
  }

  onSelectContactUs() {
    this.router.navigateByUrl("/contact")
  }

  lowercaseInput(evt: any) {
    evt.target.value = evt.target.value.toLowerCase();
  }

  detectChanges() {
    if (!this.cdr['destroyed']) this.cdr.detectChanges()
  }

}
