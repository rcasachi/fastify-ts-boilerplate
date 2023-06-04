export class Controller {
  private _providers: any[] = []

  set providers(providers: any) {
    this._providers = providers
  }

  get providers() {
    return this._providers
  }
}
