import { Directive,
         Input,
         OnInit,
         OnDestroy,
         TemplateRef,
         ViewContainerRef } from '@angular/core'

import { AuthService,
         User } from 'src/app/_core/index'

@Directive({
  selector: '[showIf]'
})
export class ShowIfDirective implements OnInit, OnDestroy {

  // showIf input: Array of params, satisfied if ANY check passes
  // options: 'loggedOut', 'loggedIn', 'admin' and all user roles
  @Input('showIf') showIf: string[]

  currentUser$: any

  constructor(
    private templateRef: TemplateRef<any>,
    private authService: AuthService,
    private vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    this.currentUser$ = this.currentUserStream()
  }

  ngOnDestroy() {
    if (this.currentUser$) this.currentUser$.unsubscribe()
  }

  currentUserStream() {
    return this.authService.currentUser.subscribe((user: User) => {
      let isAllowed = false

      if (this.showIf.indexOf('loggedOut') > -1) {
        isAllowed = !this.isLoggedIn(user)
      } else if (this.showIf.indexOf('loggedIn') > -1) {
        isAllowed = this.isLoggedIn(user)
      } else {
        isAllowed = this.passesRoleCheck(user)
      }

      if (this.vcr) this.vcr.clear()
      // if ( !isAllowed ) return null
      return isAllowed && this.vcr.createEmbeddedView(this.templateRef)
    })
  }

  isLoggedIn(user: User): boolean {
    return user && user.hasID()
  }

  // returns true if user is one of provided roles
  passesRoleCheck(user: User): boolean {
    if (!user || !user.roles) return false

    for (let role of user.roles) {
      if (this.showIf.indexOf(role) > -1) return true
    }
    return false
  }
}
