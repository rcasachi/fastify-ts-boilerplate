import { CreateProfileDTO, UpdateProfileDTO } from './profiles.dto'
import { Profile } from './profiles.entity'
import { Controller } from '../../core/framework/controller'
import { Delete, Get, Post, Put } from '../../core/framework/http'
import { Reply, Request, ServerError } from '../../core/server'
import { LogMiddleware } from '../../core/middlewares/log.middleware'

const DELETE_SUCCESSFULLY = 'Profile deleted successfully'
const NOT_FOUND = 'Not Found'
const MSG_404 = 'Profile not found'

export class ProfileController extends Controller {
  constructor() {
    super()
    Post('/profiles', this.store.bind(this), [LogMiddleware.execute])
    Get('/profiles/:id', this.retrieve.bind(this), [LogMiddleware.execute])
    Get('/profiles', this.list.bind(this), [LogMiddleware.execute])
    Put('/profiles/:id', this.update.bind(this), [LogMiddleware.execute])
    Delete('/profiles/:id', this.destroy.bind(this), [LogMiddleware.execute])
  }

  async store(request: Request, reply: Reply): Promise<void> {
    const { name } = request.body as CreateProfileDTO

    const profile = new Profile({ name })
    const profileCreated = await this.providers.createProfile.execute(profile)

    reply.status(201).send({ profile: profileCreated })
  }

  async list(request: Request, reply: Reply) {
    const profiles = await this.providers.listProfile.execute()
    reply.send({ profiles })
  }

  async retrieve(request: Request, reply: Reply) {
    const { id } = request?.params as { id: string }
    const profile = await this.providers.retrieveProfile.execute(id)

    if (!profile)
      throw new ServerError({ name: NOT_FOUND, message: MSG_404, code: 404 })

    reply.send({ profile })
  }

  async update(request: Request, reply: Reply) {
    const { id } = request?.params as { id: string }
    const { name } = request.body as UpdateProfileDTO

    const profile = new Profile({ name })
    const profileUpdated = await this.providers.updateProfile.execute(
      profile,
      id,
    )
    reply.send({ profile: profileUpdated })
  }

  async destroy(request: Request, reply: Reply) {
    const { id } = request?.params as { id: string }

    await this.providers.deleteProfile.execute(id)
    reply.send({ message: DELETE_SUCCESSFULLY })
  }
}
