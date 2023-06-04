import { Container } from './containers'

export function Inject<T>(identifier: any): T {
  return Container.resolve(identifier)
}
