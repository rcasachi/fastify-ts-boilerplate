import { CreateProfileDTO, UpdateProfileDTO } from './profiles.dto'
import { Profile } from './profiles.entity'
import { Controller } from '../../core/framework/controller'
import { Delete, Get, Post, Put } from '../../core/framework/http'
import { Reply, Request } from '../../core/server'

export class ProfileController extends Controller {
  constructor() {
    super()
    Post('/profiles', this.store.bind(this))
    Get('/profiles/:id', this.retrieve.bind(this))
    Get('/profiles', this.list.bind(this))
    Put('/profiles/:id', this.update.bind(this))
    Delete('/profiles/:id', this.destroy.bind(this))
  }

  async store(request: Request, reply: Reply): Promise<void> {
    // const valid = request.validateInput(request.body, bodyProfile)
    // if (!valid) {
    //   return reply.code(400).send({ error: 'Not Valid' })
    // }

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
    reply.send({ message: 'Profile deleted successfully' })
  }
}
