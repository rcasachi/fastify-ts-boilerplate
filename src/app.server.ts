import dotenv from 'dotenv'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'

import { AppModule } from './app.module'
import { Server } from './core/server/fastify/fastify.service'
import { Middleware } from './core/framework/middleware'
import { exceptionHandler } from './core/server/exceptions'

dotenv.config()
Server.initialize()

// unique validation
// middlewares
Server.setErrorHandler(exceptionHandler)
Middleware.register(cors, { origin: true })
Server.register(swagger)
Server.register(swaggerUI, { routePrefix: '/docs' })
Server.register(AppModule)

Server.listen({ port: 3333 })
  .then(() => console.log('[HTTP] Server running at http://localhost:3333'))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
