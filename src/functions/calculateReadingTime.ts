import { getContentByPath } from '../common/fileUtilities'
import readingTime from 'reading-time'
import { clearReadingTime } from './clearReadingTime'

export const calculateReadingTime = async (path: string): Promise<string> => {
  console.log(`Calculating reading time for ${path}...`)
  // 1. Read the file content
  const content = await getContentByPath(path)

  // 2. Clear existing reading time
  await clearReadingTime(path, content)

  // 3. Calculate the reading time
  const readingTimeText = readingTime(content).text

  console.log(`Reading time for ${path} is ${readingTimeText}.`)

  return readingTimeText
}
