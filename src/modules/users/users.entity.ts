import { Profile } from '../profiles/profiles.entity'
import { IUser } from './users.interface'

export class User implements IUser {
  id?: string
  email: string
  private _password: string
  profileId: string
  profile?: Profile | null
  createdAt?: Date | null
  updatedAt?: Date | null
  deletedAt?: Date | null

  constructor(props: IUser) {
    this.id = props.id
    this.email = props.email
    this._password = props.password
    this.profileId = props.profileId
    this.profile = props.profile ?? null
    this.createdAt = props.createdAt ?? null
    this.updatedAt = props.updatedAt ?? null
    this.deletedAt = props.deletedAt ?? null
  }

  set password(password: string) {
    this._password = password
  }

  get password() {
    return this._password
  }

  async setHashPassword() {
    this.password = await utilsGenerateHashPassword(this.password)
  }

  toHTTP(): Partial<Profile> {
    return {
      id: this.id,
      name: this.email,
    }
  }
}

function utilsGenerateHashPassword(password: string) {
  // This function is a placeholder for a password hash crypt
  // It is merely illustrative
  return password
}
