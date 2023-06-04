import { IProfile } from './profiles.interface'

export class Profile implements IProfile {
  id?: string
  name: string
  createdAt?: Date | null
  updatedAt?: Date | null
  deletedAt?: Date | null

  constructor(props: IProfile) {
    this.id = props?.id
    this.name = props.name
    this.createdAt = props?.createdAt ?? null
    this.updatedAt = props?.updatedAt ?? null
    this.deletedAt = props?.deletedAt ?? null
  }

  toHTTP(): Partial<Profile> {
    return {
      id: this.id,
      name: this.name,
    }
  }
}
