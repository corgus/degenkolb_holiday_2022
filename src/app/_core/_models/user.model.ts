import { CorgStatic } from '../_helpers/corg-static'

import { BaseClass } from './_base.model'
// import { UserAuthenticationDetail } from './user-authentication-detail.model'
// import { UserRole } from './user-role.model'
// import { Attachment } from './attachment.model'
// import { ItemCollection } from './item-collection.model'

export class User extends BaseClass {
  klass = 'User'

  // obfuscated_id: string

  // email: string
  // unconfirmed_email: string
  // name: string
  roles: string[]
  // is_current: boolean
  // status: string

  // slug: string
  // display: string
  // summary: string

  // boost: number

  // user_authentication_detail: UserAuthenticationDetail
  // user_role: UserRole
  // avatar: Attachment
  // cover: Attachment
  // thumbnail: any

  // all_entries: ItemCollection
  // entries: ItemCollection

  auth_token: string
  test: boolean
  // metadata: any

  // debug: any

  isRole(role: string): boolean {
    return true
    // if (!this.roles) return false
    // return this.roles.indexOf(role) > -1
  }

  // email_confirmed_at(): string {
  //   return 'TEST EMAIL CONFIRMED AT'
  // }

  // isSimilarTo(user: User): boolean {
  //   if (!user) return false
  //   if (user && user['klass'] !== 'User') return false
  //   return CorgStatic.objectsAreSimilar(this, user)
  //   // return user.obfuscated_id === this.obfuscated_id
  // }
}
