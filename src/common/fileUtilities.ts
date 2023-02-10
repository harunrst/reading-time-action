import { promisify } from 'util'
import { readFile, writeFile, readdir } from 'fs'
import prependFile from 'prepend-file'
import { ignoredPaths } from './constants'

const readAsync = promisify(readFile)
const writeAsync = promisify(writeFile)
export const readdirAsync = promisify(readdir)

export const readFileAsync = async (filePath: string): Promise<Buffer> =>
  await readAsync(filePath)

export const writeFileAsync = async (
  filePath: string,
  content: string
): Promise<void> => await writeAsync(filePath, content)

export const prependFileAsync = async (
  filePath: string,
  text: string
): Promise<void> => {
  await prependFile(filePath, text)
}

export const findFileCaseInsensitiveAsync = async (
  root: string,
  fileName: string
): Promise<string | undefined> => {
  const files = await readdirAsync(root)
  const file = files.find(f => f.toLowerCase() === fileName.toLowerCase())
  return file
}

export const traverseDirectories = async (dir: string): Promise<string[]> => {
  const list = await readdirAsync(dir, { withFileTypes: true })

  let markdownList = list
    .filter(l => l.isFile() && isMarkdownFile(l.name))
    .map(l => getAbsolutePath(dir, l.name))

  const subDirectories = list
    .filter(l => l.isDirectory() && !isIgnoredPath(l.name))
    .map(l => l.name)

  await Promise.all(
    subDirectories.map(async subDir => {
      const list = await traverseDirectories(getAbsolutePath(dir, subDir))
      markdownList = markdownList.concat(list)
    })
  )

  return markdownList
}

export const getContentByPath = async (path: string): Promise<string> => {
  const content = (await readFileAsync(path)).toString()
  return content
}

const getAbsolutePath = (root: string, path: string): string =>
  `${root}/${path}`

const isMarkdownFile = (path: string): boolean => path.endsWith('.md')

const isIgnoredPath = (path: string): boolean =>
  ignoredPaths.some(ignoredPath => path.includes(ignoredPath))
