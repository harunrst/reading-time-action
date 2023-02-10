import { prependFileAsync } from '../common/fileUtilities'

export const prependReadingTime = async (
  filePath: string,
  readingTime: string
): Promise<void> => {
  console.log(`Prepending ${filePath} with ${readingTime}.`)
  await prependFileAsync(filePath, readingTime)
}
