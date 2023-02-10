import { ActionOptions } from '../common/actionOptions'
import { traverseDirectories } from '../common/fileUtilities'
import { CalculatorBase } from './calculatorBase'
import ICalculator from './ICalculator'

export class PathsCalculator extends CalculatorBase implements ICalculator {
  constructor(options: ActionOptions) {
    super(options)
    if (!this.options.paths) {
      throw new Error('PathsCalculator requires paths.')
    }
    console.log('PathsCalculator is initialized.')
  }

  run = async (): Promise<void> => {
    let markdownList: string[] = []

    await Promise.all(
      this.options.paths!.map(async path => {
        const list = await traverseDirectories(path)
        markdownList = markdownList.concat(list)
      })
    )

    await this.calculateList(markdownList)
  }
}
