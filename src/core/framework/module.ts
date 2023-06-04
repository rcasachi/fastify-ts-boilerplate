/* eslint-disable new-cap */
import { Container } from './containers'
import { Controller } from './controller'

export class Module {
  private _controllers: Controller[] = []
  providers?: any[]
  resolvedProviders?: any
  cronjobs?: any[]

  set controllers(controllers: any[]) {
    this._controllers = controllers
  }

  get controllers() {
    return this._controllers
  }

  private toCamelCase(str: string): string {
    let modifiedStr = str.replace(/^I([A-Z])/, '$1')
    modifiedStr = modifiedStr.replace(/[_\s]+(.)/g, (_, c) => c.toUpperCase())
    return modifiedStr.charAt(0).toLowerCase() + modifiedStr.slice(1)
  }

  private registerProviders() {
    this.providers?.forEach((provider) => {
      const identifier = provider?.provider ?? provider
      const instance =
        typeof identifier === 'string' ? new provider.useClass() : undefined
      Container.register(identifier, instance)
    })
  }

  private resolveProviders() {
    return this.providers
      ?.map((provider) => {
        const identifier = provider?.provider ?? provider
        const providerName =
          typeof identifier === 'string' ? identifier : identifier.name

        return {
          [this.toCamelCase(providerName)]: Container.resolve(identifier),
        }
      })
      .reduce((result, obj) => {
        return { ...result, ...obj }
      }, {})
  }

  private registerControllers() {
    const resolvedProviders = this.resolveProviders()
    this.resolvedProviders = resolvedProviders
    this.controllers.forEach((controller) => {
      const instance = new controller()
      Object.assign(instance, {
        providers: this.resolvedProviders,
      })
    })
  }

  private registerCronjobs() {}

  register() {
    this.registerProviders()
    this.registerControllers()
  }
}
