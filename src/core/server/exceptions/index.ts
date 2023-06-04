import { Error, Reply, Request } from '..'

export function exceptionHandler(error: Error, request: Request, reply: Reply) {
  const errorName =
    error?.name && error?.name !== 'Error'
      ? error.name
      : 'Internal Server Error'

  const errorObject = {
    error: errorName,
    message: error?.validation ?? error.message,
    statusCode: error.statusCode ?? 500,
  }

  if (errorObject.statusCode >= 500) {
    request.log.warn(error)
    console.error({ ...errorObject, timestamp: new Date(), stack: error.stack })
  }

  return reply.status(error?.statusCode ?? 500).send(errorObject)
}
