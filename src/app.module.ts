import { UserModule } from './modules/users/users.module'
import { ProfileModule } from './modules/profiles/profiles.module'
import { Server } from './core/server/fastify/fastify.service'
import { Get } from './core/framework/http'
import { Reply, Request } from './core/server'

const STATUS_ACTIVE = 'active'

export async function AppModule() {
  Get('/', (_: Request, reply: Reply) => {
    reply.send({ status: STATUS_ACTIVE })
  })

  Server.register(UserModule)
  Server.register(ProfileModule)
}
