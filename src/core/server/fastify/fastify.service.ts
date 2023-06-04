import fastify, {
  FastifyInstance,
  FastifyListenOptions,
  FastifyPluginCallback,
} from 'fastify'

export class Server {
  private static app: FastifyInstance

  private constructor() {}

  static initialize() {
    this.app = fastify()
  }

  static getInstanceApp(): FastifyInstance {
    return this.app
  }

  static listen(config: FastifyListenOptions | undefined) {
    return this.app.listen(config)
  }

  static register(plugin: FastifyPluginCallback, opts?: any) {
    this.app.register(plugin, opts)
  }

  static setErrorHandler(handler: any) {
    this.app.setErrorHandler(handler)
  }
}
