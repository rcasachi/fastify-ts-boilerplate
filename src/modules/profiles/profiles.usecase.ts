import { IProfileRepository } from './profiles.interface'
import { Profile } from './profiles.entity'
import { Inject } from '../../core/framework/inject'
import { Validation } from '../../core/framework/validation'
import { createProfileSchema, updateProfileSchema } from './profiles.schema'

export class CreateProfile {
  private repository = Inject<IProfileRepository>('IProfileRepository')

  async execute(profile: Profile): Promise<Partial<Profile>> {
    await Validation.handle(profile, createProfileSchema)

    const createdProfile = await this.repository.create(profile)
    return createdProfile.toHTTP()
  }
}

export class ListProfile {
  private repository = Inject<IProfileRepository>('IProfileRepository')

  async execute(): Promise<Partial<Profile>[]> {
    const listProfiles = await this.repository.findAll()
    const serializedList = listProfiles.map((profile) => profile.toHTTP())
    return serializedList
  }
}

export class RetrieveProfile {
  private repository = Inject<IProfileRepository>('IProfileRepository')

  async execute(id: string): Promise<Partial<Profile> | null> {
    const profile = await this.repository.findById(id)
    return profile ? profile.toHTTP() : null
  }
}

export class UpdateProfile {
  private repository = Inject<IProfileRepository>('IProfileRepository')

  async execute(profile: Profile, id: string): Promise<Partial<Profile>> {
    await Validation.handle(profile, updateProfileSchema)

    const updatedProfile = await this.repository.update(profile, id)
    return updatedProfile.toHTTP()
  }
}

export class DeleteProfile {
  private repository = Inject<IProfileRepository>('IProfileRepository')

  async execute(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
