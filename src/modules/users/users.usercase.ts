import { Inject } from '../../core/framework/inject'
import { User } from './users.entity'
import { IUserRepository } from './users.interface'

export class CreateUser {
  private repository = Inject<IUserRepository>('IUserRepository')

  async execute(user: User): Promise<Partial<User>> {
    user.validate()

    if (!user.isPasswordSafe()) {
      throw new Error('User password is week.')
    }

    const createdUser = await this.repository.create(user)
    return createdUser.toHTTP()
  }
}

export class ListUser {
  private repository = Inject<IUserRepository>('IUserRepository')

  async execute(): Promise<Partial<User>[]> {
    const listUsers = await this.repository.findAll()
    const serializedList = listUsers.map((user) => user.toHTTP())
    return serializedList
  }
}

export class RetrieveUser {
  private repository = Inject<IUserRepository>('IUserRepository')

  async execute(value: string, type?: string): Promise<Partial<User> | null> {
    const retrieveFn = type === 'email' ? 'findByEmail' : 'findById'
    const user = await this.repository[retrieveFn](value)
    return user ? user.toHTTP() : null
  }
}

export class UpdateUser {
  private repository = Inject<IUserRepository>('IUserRepository')

  async execute(user: User, id: string): Promise<Partial<User>> {
    const updatedUser = await this.repository.update(user, id)
    return updatedUser.toHTTP()
  }
}

export class DeleteUser {
  private repository = Inject<IUserRepository>('IUserRepository')

  async execute(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
