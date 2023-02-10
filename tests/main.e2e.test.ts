import { expect, test } from '@jest/globals'
import { ActionOptions, Strategy } from '../src/common/actionOptions'
import { readmePath, root } from '../src/common/constants'
import {
  findFileCaseInsensitiveAsync,
  getContentByPath
} from '../src/common/fileUtilities'
import { StyleOptions, TextAlign, TextStyle } from '../src/common/styleOptions'
import { implementCalculator } from '../src/factory/calculatorFactory'
import ICalculator from '../src/factory/ICalculator'
import { clearReadingTimeByPath } from '../src/functions/clearReadingTime'
import { hasReadingTime } from '../src/functions/hasReadingTime'

test('e2e - Readme Strategy', async () => {
  //arrange
  const options: ActionOptions = {
    strategy: Strategy.Readme,
    styleOptions: {
      textStyle: TextStyle.Bold,
      textAlign: TextAlign.Left
    } as StyleOptions
  }
  const path = await findFileCaseInsensitiveAsync(root, readmePath)
  expect(path).not.toBeNull()

  //act
  const calculator: ICalculator = implementCalculator(options)
  await calculator.run()

  //assert
  const contentReadme = await getContentByPath(path!)
  expect(hasReadingTime(contentReadme)).toBeTruthy()

  //cleanup
  await clearReadingTimeByPath(path!)
})

test('e2e - Paths Strategy', async () => {
  //arrange
  const options: ActionOptions = {
    strategy: Strategy.Paths,
    paths: ['mocks'],
    styleOptions: {
      textStyle: TextStyle.Bold,
      textAlign: TextAlign.Left
    } as StyleOptions
  }

  //act
  const calculator: ICalculator = implementCalculator(options)
  await calculator.run()

  //assert
  //make sure README.md don't have reading time
  const path = await findFileCaseInsensitiveAsync(root, readmePath)
  const contentReadme = await getContentByPath(path!)
  expect(hasReadingTime(contentReadme)).toBeFalsy()

  //make sure mock files have reading time
  const testMarkdownPath = 'mocks/testMarkdown.md'
  const contentTestMarkdown = await getContentByPath(testMarkdownPath)
  expect(hasReadingTime(contentTestMarkdown)).toBeTruthy()

  //cleanup
  await clearReadingTimeByPath(path!)
  await clearReadingTimeByPath(testMarkdownPath)
})

test('e2e - Repository Strategy', async () => {
  //arrange
  const options: ActionOptions = {
    strategy: Strategy.All,
    styleOptions: {
      textStyle: TextStyle.Bold,
      textAlign: TextAlign.Left
    } as StyleOptions
  }

  //act
  const calculator: ICalculator = implementCalculator(options)
  await calculator.run()

  //assert
  //make sure README.md don't have reading time
  const path = await findFileCaseInsensitiveAsync(root, readmePath)
  const contentReadme = await getContentByPath(path!)
  expect(hasReadingTime(contentReadme)).toBeTruthy()

  //make sure mock files have reading time
  const testMarkdownPath = 'mocks/testMarkdown.md'
  const contentTestMarkdown = await getContentByPath(testMarkdownPath)
  expect(hasReadingTime(contentTestMarkdown)).toBeTruthy()

  //cleanup
  await clearReadingTimeByPath(path!)
  await clearReadingTimeByPath(testMarkdownPath)
})
