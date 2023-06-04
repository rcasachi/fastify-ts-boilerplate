import { Profile } from '../profiles/profiles.entity'
import { User } from './users.entity'

export interface IUser {
  id?: string
  email: string
  password: string
  profileId: string
  profile?: Profile | null
  createdAt?: Date | null
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export interface IUserRepository {
  create(user: User): Promise<User>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findAll(): Promise<User[]>
  update(user: User, id: string): Promise<User>
  delete(id: string): Promise<void>
}
