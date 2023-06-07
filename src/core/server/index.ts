import {
  FastifyError,
  FastifyPluginCallback,
  FastifyReply,
  FastifyRequest,
  ValidationResult,
} from 'fastify'
import { SchemaErrorDataVar } from 'fastify/types/schema'

export class ServerError implements FastifyError {
  code: string
  name: string
  statusCode?: number | undefined
  validation?: ValidationResult[] | undefined
  validationContext?: SchemaErrorDataVar | undefined
  message: string
  stack?: string | undefined

  constructor({ name, message, code }: any) {
    this.name = name
    this.statusCode = code
    this.code = code
    this.message = message
  }
}

export { Server } from './fastify/fastify.service'
export interface Plugin extends FastifyPluginCallback {}
export interface Error extends FastifyError {}
export interface Request extends FastifyRequest {}

export interface Reply extends FastifyReply {
  locals?: any
}
