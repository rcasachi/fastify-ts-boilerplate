import dotenv from 'dotenv'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'

import { AppModule } from './app.module'
import { Server } from './core/server'
import { Middleware } from './core/framework/middleware'
import { exceptionHandler } from './core/server/exceptions'
import { SERVER_PORT } from './core/config/env'
import { Validation } from './core/framework/validation'

dotenv.config()
Server.initialize()

Validation.setUniqueValidation()

Server.setErrorHandler(exceptionHandler)

Middleware.register(cors, { origin: true })
Server.register(swagger)
Server.register(swaggerUI, { routePrefix: '/docs' })

Server.register(AppModule)

Server.listen({ port: SERVER_PORT })
  .then(() =>
    console.log(`[HTTP] Server running at http://localhost:${SERVER_PORT}`),
  )
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
