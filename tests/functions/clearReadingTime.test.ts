import { expect, test } from '@jest/globals'
import { getContentByPath } from '../../src/common/fileUtilities'
import { TextAlign, TextStyle } from '../../src/common/styleOptions'
import { clearReadingTimeByPath } from '../../src/functions/clearReadingTime'
import { getReadingTimeElement } from '../../src/functions/getReadingTimeElement'
import { hasReadingTime } from '../../src/functions/hasReadingTime'
import { prependReadingTime } from '../../src/functions/prependReadingTime'

test('clearReadingTime - Clears reading time', async () => {
  //arrange
  const path = 'mocks/testMarkdown.md'
  const readingTimeElement = getReadingTimeElement(
    '3 min read',
    TextStyle.Bold,
    TextAlign.Center
  )
  const initialContent = await getContentByPath(path)
  expect(hasReadingTime(initialContent)).toBeFalsy()

  await prependReadingTime(path, readingTimeElement)
  const content = await getContentByPath(path)
  expect(hasReadingTime(content)).toBeTruthy()

  //act
  await clearReadingTimeByPath(path)

  //assert
  const lastContent = await getContentByPath(path)
  expect(hasReadingTime(lastContent)).toBeFalsy()
  expect(lastContent).toBe(initialContent)
})
