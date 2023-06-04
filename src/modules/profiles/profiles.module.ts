import { PrismaProfileRepository } from '../../core/repositories/prisma/profiles.repository'
import {
  CreateProfile,
  DeleteProfile,
  ListProfile,
  RetrieveProfile,
  UpdateProfile,
} from './profiles.usecase'
import { ProfileController } from './profiles.controller'
import { Module } from '../../core/framework/module'

export async function ProfileModule() {
  const module = new Module()
  module.controllers = [ProfileController]
  module.providers = [
    { provider: 'IProfileRepository', useClass: PrismaProfileRepository },
    CreateProfile,
    ListProfile,
    RetrieveProfile,
    UpdateProfile,
    DeleteProfile,
  ]
  module.register()
}
