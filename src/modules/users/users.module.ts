import { Module } from '../../core/framework/module'
import { PrismaUserRepository } from '../../core/repositories/prisma/users.repository'
import { UserController } from './users.controller'
import {
  CreateUser,
  DeleteUser,
  ListUser,
  RetrieveUser,
  UpdateUser,
} from './users.usercase'

export async function UserModule() {
  const module = new Module()
  module.controllers = [UserController]
  module.providers = [
    { provider: 'IUserRepository', useClass: PrismaUserRepository },
    CreateUser,
    ListUser,
    RetrieveUser,
    UpdateUser,
    DeleteUser,
  ]
  module.register()
}
