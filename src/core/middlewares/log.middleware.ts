import { Reply, Request, ServerError } from '../server'

export class LogMiddleware {
  static throwError(message: string, code: number) {
    throw new ServerError({
      name: 'Log Error',
      message,
      code,
    })
  }

  static async execute(request: Request, reply: Reply) {
    try {
      const { routerMethod, routerPath } = request

      console.log(`[LOG INFO]: User accessed ${routerMethod} ${routerPath}`)
    } catch (err) {
      if (err instanceof ServerError)
        return reply.code(err.statusCode ?? 500).send(err)

      return reply.code(500).send(err)
    }
  }
}
