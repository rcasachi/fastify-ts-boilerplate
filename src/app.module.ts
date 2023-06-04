import { UserModule } from './modules/users/users.module'
import { ProfileModule } from './modules/profiles/profiles.module'
import { Server } from './core/server/fastify/fastify.service'

export async function AppModule() {
  Server.getInstanceApp().get('/', (_, reply) => {
    reply.send({ status: 'active' })
  })

  Server.register(UserModule)
  Server.register(ProfileModule)
}
