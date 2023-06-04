import { User } from '../../../modules/users/users.entity'
import { IUserRepository } from '../../../modules/users/users.interface'
import client from '../../database/prisma/prisma.service'

export class PrismaUserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const userSaved = await client.user.create({
      data: {
        email: user.email,
        password: user.password,
        profileId: user.profileId,
      },
    })

    return new User(userSaved)
  }

  async findById(id: string): Promise<User | null> {
    const userFound = await client.user.findUnique({ where: { id } })
    const user = userFound ? new User(userFound) : null
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const userFound = await client.user.findMany({ where: { email } })
    const user = userFound.length > 0 ? new User(userFound[0]) : null
    return user
  }

  async findAll(): Promise<User[]> {
    const listUsers = await client.user.findMany()
    const users = listUsers.map((user) => new User(user))
    return users
  }

  async update(user: User, id: string): Promise<User> {
    const userUpdated = await client.user.update({
      where: { id },
      data: {
        email: user.email,
        password: user.password,
        profileId: user.profileId,
      },
    })
    return new User(userUpdated)
  }

  async delete(id: string): Promise<void> {
    await client.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
  }
}
