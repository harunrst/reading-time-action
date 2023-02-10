import { expect, test } from '@jest/globals'
import { readingTimeElementId } from '../../src/common/constants'
import { TextAlign, TextStyle } from '../../src/common/styleOptions'
import { getReadingTimeElement } from '../../src/functions/getReadingTimeElement'

test('getReadingTimeElement - Generates reading time element', async () => {
  //arrange
  const text = '3 min read'
  const text2 = '10 min read'
  const textAlign = TextAlign.Center
  const textAlign2 = TextAlign.Right
  const textStyle = TextStyle.Bold
  const textStyle2 = TextStyle.Default
  const tag = textStyle === TextStyle.Bold ? 'b' : 'p'
  const tag2 = textStyle2 === TextStyle.Default ? 'p' : 'b'
  const expected = `<${tag} id="${readingTimeElementId}" align="${textAlign}">${text}</${tag}>\n\n`
  const expected2 = `<${tag2} id="${readingTimeElementId}" align="${textAlign2}">${text2}</${tag2}>\n\n`

  //act
  const readingTimeElement = getReadingTimeElement(
    text,
    TextStyle.Bold,
    TextAlign.Center
  )

  const readingTimeElement2 = getReadingTimeElement(
    text2,
    textStyle2,
    textAlign2
  )

  //assert
  expect(readingTimeElement).toBe(expected)
  expect(readingTimeElement2).toBe(expected2)
})
