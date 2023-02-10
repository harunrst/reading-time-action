import { expect, test } from '@jest/globals'
import { getContentByPath } from '../../src/common/fileUtilities'
import { TextAlign, TextStyle } from '../../src/common/styleOptions'
import { getReadingTimeElement } from '../../src/functions/getReadingTimeElement'
import { hasReadingTime } from '../../src/functions/hasReadingTime'
import { prependReadingTime } from '../../src/functions/prependReadingTime'
import { clearReadingTimeByPath } from '../../src/functions/clearReadingTime'

test('prependReadingTime - Prepends reading time', async () => {
  //arrange
  const path = 'mocks/testMarkdown.md'
  const readingTimeElement = getReadingTimeElement(
    '3 min read',
    TextStyle.Bold,
    TextAlign.Center
  )

  //assert
  const initialContent = await getContentByPath(path)
  expect(hasReadingTime(initialContent)).toBeFalsy()

  await prependReadingTime(path, readingTimeElement)
  const content = await getContentByPath(path)
  expect(hasReadingTime(content)).toBeTruthy()

  //cleanup
  await clearReadingTimeByPath(path)
})
