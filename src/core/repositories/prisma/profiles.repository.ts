import { Profile } from '../../../modules/profiles/profiles.entity'
import { IProfileRepository } from '../../../modules/profiles/profiles.interface'
import client from '../../database/prisma/prisma.service'

export class PrismaProfileRepository implements IProfileRepository {
  async create(profile: Profile): Promise<Profile> {
    const profileSaved = await client.profile.create({
      data: {
        name: profile.name,
      },
    })

    return new Profile(profileSaved)
  }

  async findById(id: string): Promise<Profile | null> {
    const profileFound = await client.profile.findUnique({ where: { id } })
    const profile = profileFound ? new Profile(profileFound) : null
    return profile
  }

  async findAll(): Promise<Profile[]> {
    const listProfiles = await client.profile.findMany()
    const profiles = listProfiles.map((profile) => new Profile(profile))
    return profiles
  }

  async update(profile: Profile, id: string): Promise<Profile> {
    const profileUpdated = await client.profile.update({
      where: { id },
      data: {
        name: profile.name,
      },
    })
    return new Profile(profileUpdated)
  }

  async delete(id: string): Promise<void> {
    await client.profile.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
  }
}
