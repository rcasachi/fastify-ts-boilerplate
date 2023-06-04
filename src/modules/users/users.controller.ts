import { Controller } from '../../core/framework/controller'
import { Delete, Get, Post, Put } from '../../core/framework/http'
import { Reply, Request } from '../../core/server'
import { CreateUserDTO, UpdateUserDTO } from './users.dto'
import { User } from './users.entity'

export class UserController extends Controller {
  constructor() {
    super()
    Post('/users', this.store.bind(this))
    Get('/users/:id', this.retrieve.bind(this))
    Get('/users', this.list.bind(this))
    Put('/users/:id', this.update.bind(this))
    Delete('/users/:id', this.destroy.bind(this))
  }

  async store(request: Request, reply: Reply): Promise<void> {
    const { email, password, profileId } = request.body as CreateUserDTO

    const user = new User({ email, password, profileId })
    const userCreated = await this.providers.createUser.execute(user)

    reply.status(201).send({ user: userCreated })
  }

  async list(request: Request, reply: Reply) {
    const { email } = request?.query as { email: string }

    if (email) {
      const user = await this.providers.retrieveUser.execute(email, 'email')
      return reply.send({ user })
    }

    const users = await this.providers.listUser.execute()
    reply.send({ users })
  }

  async retrieve(request: Request, reply: Reply) {
    const { id } = request?.params as { id: string }

    const user = await this.providers.retrieveUser.execute(id)
    reply.send({ user })
  }

  async update(request: Request, reply: Reply) {
    const { id } = request?.params as { id: string }
    const { email, password, profileId } = request.body as UpdateUserDTO

    const user = new User({ email, password, profileId })
    const userUpdated = await this.providers.updateUser.execute(user, id)
    reply.send({ user: userUpdated })
  }

  async destroy(request: Request, reply: Reply) {
    const { id } = request?.params as { id: string }

    await this.providers.deleteUser.execute(id)
    reply.send({ message: 'User deleted successfully' })
  }
}
