import { ActionOptions, Strategy } from '../common/actionOptions'
import ICalculator from './ICalculator'
import { PathsCalculator } from './pathsCalculator'
import { ReadmeCalculator } from './readmeCalculator'
import { RepositoryCalculator } from './repositoryCalculator'

export const implementCalculator = (options: ActionOptions): ICalculator => {
  switch (options.strategy) {
    case Strategy.Readme:
      return new ReadmeCalculator(options)

    case Strategy.All:
      return new RepositoryCalculator(options)

    case Strategy.Paths:
      return new PathsCalculator(options)

    default:
      throw new Error('Unknown strategy.')
  }
}
