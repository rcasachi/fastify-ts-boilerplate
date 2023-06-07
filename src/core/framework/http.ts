import { Server } from '../server/fastify/fastify.service'

export function Get(route: string, handler: any, middlewares?: any[]) {
  return Server.getInstanceApp().get(
    route,
    { preHandler: middlewares },
    handler,
  )
}

export function Post(route: string, handler: any, middlewares?: any[]) {
  return Server.getInstanceApp().post(
    route,
    { preHandler: middlewares },
    handler,
  )
}

export function Put(route: string, handler: any, middlewares?: any[]) {
  return Server.getInstanceApp().put(
    route,
    { preHandler: middlewares },
    handler,
  )
}

export function Patch(route: string, handler: any, middlewares?: any[]) {
  return Server.getInstanceApp().patch(
    route,
    { preHandler: middlewares },
    handler,
  )
}

export function Delete(route: string, handler: any, middlewares?: any[]) {
  return Server.getInstanceApp().delete(
    route,
    { preHandler: middlewares },
    handler,
  )
}
