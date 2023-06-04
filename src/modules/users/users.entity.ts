import { Profile } from '../profiles/profiles.entity'
import { IUser } from './users.interface'

export class User implements IUser {
  id?: string
  email: string
  password: string
  profileId: string
  profile?: Profile | null
  createdAt?: Date | null
  updatedAt?: Date | null
  deletedAt?: Date | null

  constructor(props: IUser) {
    this.id = props.id
    this.email = props.email
    this.password = props.password
    this.profileId = props.profileId
    this.profile = props.profile ?? null
    this.createdAt = props.createdAt ?? null
    this.updatedAt = props.updatedAt ?? null
    this.deletedAt = props.deletedAt ?? null
  }

  validate() {
    if (!this.email) {
      throw new Error('User email is required.')
    }

    if (!this.password) {
      throw new Error('User password is required.')
    }
  }

  isPasswordSafe(): boolean {
    return this.password.length >= 8
  }

  toHTTP(): Partial<Profile> {
    return {
      id: this.id,
      name: this.email,
    }
  }
}
