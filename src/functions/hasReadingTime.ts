import { readingTimeElementId } from '../common/constants'

export const hasReadingTime = (content: string): boolean =>
  content.split(/\r?\n/)[0]?.includes(readingTimeElementId)
