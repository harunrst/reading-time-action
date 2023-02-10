import { root } from '../common/constants'
import ICalculator from './ICalculator'
import { ActionOptions } from '../common/actionOptions'
import { traverseDirectories } from '../common/fileUtilities'
import { CalculatorBase } from './calculatorBase'

export class RepositoryCalculator
  extends CalculatorBase
  implements ICalculator
{
  constructor(options: ActionOptions) {
    super(options)
    console.log('RepositoryCalculator is initialized.')
  }

  run = async (): Promise<void> => {
    const markdownList = await traverseDirectories(root)
    await this.calculateList(markdownList)
  }
}
