import { expect, test } from '@jest/globals'
import { calculateReadingTime } from '../../src/functions/calculateReadingTime'

test('calculateReadingTime - Calculates reading time correctly', async () => {
  //arrange
  const path = 'mocks/testMarkdown.md'
  const expected = '3 min read'

  //act
  const readingTime = await calculateReadingTime(path)

  //assert
  expect(readingTime).toBe(expected)
})
