export class Container {
  private static instanceDataMap = new Map<any, { instance: any }>()

  private constructor() {}

  static getInstanceDataMap(): Map<any, { instance: any }> {
    return this.instanceDataMap
  }

  static register(identifier: any, instance: any = undefined): void {
    const identifierName =
      typeof identifier === 'string' ? identifier : identifier.name

    if (this.instanceDataMap.has(identifierName)) {
      throw new Error(`Instance already registered for '${identifierName}'`)
    }

    this.instanceDataMap.set(identifierName, { instance })
  }

  static resolve<T>(identifier: any): T {
    const identifierName =
      typeof identifier === 'string' ? identifier : identifier.name

    const instanceData = this.instanceDataMap.get(identifierName)

    if (!instanceData) {
      throw new Error(`No instance registered for '${identifierName}'`)
    }

    if (!instanceData.instance) {
      // eslint-disable-next-line new-cap
      instanceData.instance = new identifier()
    }

    return instanceData.instance
  }
}
