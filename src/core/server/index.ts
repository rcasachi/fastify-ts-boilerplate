import {
  FastifyError,
  FastifyPluginCallback,
  FastifyReply,
  FastifyRequest,
  ValidationResult,
} from 'fastify'
import { SchemaErrorDataVar } from 'fastify/types/schema'

export { Server } from './fastify/fastify.service'

export interface Request extends FastifyRequest {}
export interface Reply extends FastifyReply {}
export interface Plugin extends FastifyPluginCallback {}
export interface Error extends FastifyError {}

export class ServerError implements FastifyError {
  code: string
  name: string
  statusCode?: number | undefined
  validation?: ValidationResult[] | undefined
  validationContext?: SchemaErrorDataVar | undefined
  message: string
  stack?: string | undefined

  constructor({ name, message, statusCode }: any) {
    this.name = name
    this.statusCode = statusCode
    this.code = statusCode
    this.message = message
  }
}
