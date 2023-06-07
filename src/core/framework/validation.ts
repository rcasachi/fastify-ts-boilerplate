import { extend, validate } from 'indicative/validator'
import { getValue } from 'indicative-utils'

import { ServerError } from '../server'
import client from '../database/prisma/prisma.service'

const UNIQUE_EXCEPTION = 'Unique rule needs the table and column name'

export class Validation {
  static async handle(data: any, validationRules: any) {
    const { rules, messages } = validationRules

    try {
      await validate(data, rules, messages)
    } catch (validationErrors) {
      throw new ServerError({
        name: 'Bad Request',
        message: validationErrors,
        code: 400,
      })
    }
  }

  static setUniqueValidation() {
    extend('unique', {
      async: true,

      compile(args) {
        if (args.length !== 2) {
          throw new Error(UNIQUE_EXCEPTION)
        }
        return args
      },

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async validate(data, field, args, _config) {
        const fieldValue = getValue(data, field)
        const [tableName, fieldName] = args

        const record =
          await client.$queryRaw`SELECT * FROM ${tableName} WHERE ${fieldName} = ${fieldValue};`

        if (record) {
          return false
        }

        return true
      },
    })
  }
}
