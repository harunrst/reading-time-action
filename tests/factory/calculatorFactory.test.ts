import { expect, test } from '@jest/globals'
import { ActionOptions, Strategy } from '../../src/common/actionOptions'
import {
  StyleOptions,
  TextAlign,
  TextStyle
} from '../../src/common/styleOptions'
import { implementCalculator } from '../../src/factory/calculatorFactory'
import ICalculator from '../../src/factory/ICalculator'
import { PathsCalculator } from '../../src/factory/pathsCalculator'
import { ReadmeCalculator } from '../../src/factory/readmeCalculator'
import { RepositoryCalculator } from '../../src/factory/repositoryCalculator'

test('calculatorFactory - Implements instances correctly', async () => {
  //arrange
  const options: ActionOptions = {
    strategy: Strategy.Readme,
    paths: ['.'],
    styleOptions: {
      textStyle: TextStyle.Bold,
      textAlign: TextAlign.Left
    } as StyleOptions
  }

  //act
  const readmeCalculator: ICalculator = implementCalculator(options)
  options.strategy = Strategy.Paths
  const pathsCalculator: ICalculator = implementCalculator(options)
  options.strategy = Strategy.All
  const respositoryCalculator: ICalculator = implementCalculator(options)

  //assert
  expect(readmeCalculator).toBeInstanceOf(ReadmeCalculator)
  expect(pathsCalculator).toBeInstanceOf(PathsCalculator)
  expect(respositoryCalculator).toBeInstanceOf(RepositoryCalculator)
})
