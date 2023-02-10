import { getContentByPath, writeFileAsync } from '../common/fileUtilities'
import { hasReadingTime } from './hasReadingTime'

export const clearReadingTime = async (
  path: string,
  content: string
): Promise<void> => {
  const containsReadingTime: boolean = hasReadingTime(content)
  if (containsReadingTime) {
    //slice(2) because there is extra empty line
    const modifiedContent = content.split('\n').slice(2).join('\n')
    await writeFileAsync(path, modifiedContent)
  }
}

export const clearReadingTimeByPath = async (path: string): Promise<void> => {
  const content = await getContentByPath(path)
  const containsReadingTime: boolean = hasReadingTime(content)
  if (containsReadingTime) {
    //slice(2) because there is extra empty line
    const modifiedContent = content.split('\n').slice(2).join('\n')
    await writeFileAsync(path, modifiedContent)
  }
}
