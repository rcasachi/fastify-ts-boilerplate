import { Server } from '../server/fastify/fastify.service'

export function Get(route: string, handler: any) {
  return Server.getInstanceApp().get(route, handler)
}

export function Post(route: string, handler: any) {
  return Server.getInstanceApp().post(route, handler)
}

export function Put(route: string, handler: any) {
  return Server.getInstanceApp().put(route, handler)
}

export function Patch(route: string, handler: any) {
  return Server.getInstanceApp().patch(route, handler)
}

export function Delete(route: string, handler: any) {
  return Server.getInstanceApp().delete(route, handler)
}
