import { readingTimeElementId } from '../common/constants'
import { TextAlign, TextStyle } from '../common/styleOptions'

export const getReadingTimeElement = (
  text: string,
  textStyle: TextStyle,
  textAlign: TextAlign
): string => {
  let tag = 'p'
  if (textStyle === TextStyle.Bold) tag = 'b'

  const element = `<${tag} id="${readingTimeElementId}" align="${textAlign}">${text}</${tag}>\n\n`
  return element
}
