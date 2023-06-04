import { Plugin, Server } from '../server'

export class Middleware {
  static register(middleware: Plugin, opts?: any) {
    Server.register(middleware, opts)
  }
}
