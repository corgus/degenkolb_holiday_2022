// modified from http://stackoverflow.com/questions/40285637/performing-cross-field-validation-on-angular-2-reactive-forms

import { FormGroup } from '@angular/forms'

export class SpotsagaValidators {

  public validatePasswordConfirmation(group: FormGroup): void {
    let pw = group.controls['password']
    let pw2 = group.controls['password_confirmation']

    // reset previous error
    if (pw2.errors) { pw2.errors['validatePasswordConfirmation'] = null }

    // set error if necessary
    if (pw.value !== pw2.value) {
      pw2.setErrors({ validatePasswordConfirmation: true })
    }

    // even though there was an error, we still return null
    // since the new error state was set on the individual field
    return null
  }
}
