import { Profile } from './profiles.entity'

export interface IProfile {
  id?: string
  name: string
  createdAt?: Date | null
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export interface IProfileRepository {
  create(profile: Profile): Promise<Profile>
  findById(id: string): Promise<Profile | null>
  findAll(): Promise<Profile[]>
  update(profile: Profile, id: string): Promise<Profile>
  delete(id: string): Promise<void>
}
