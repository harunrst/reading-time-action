import { ActionOptions } from '../common/actionOptions'
import { readmePath, root } from '../common/constants'
import { findFileCaseInsensitiveAsync } from '../common/fileUtilities'
import { CalculatorBase } from './calculatorBase'
import ICalculator from './ICalculator'

export class ReadmeCalculator extends CalculatorBase implements ICalculator {
  constructor(options: ActionOptions) {
    super(options)
    console.log('ReadmeCalculator is initialized.')
  }

  run = async (): Promise<void> => {
    const path = await findFileCaseInsensitiveAsync(root, readmePath)
    if (!path) {
      throw new Error('Readme could not found.')
    }
    await this.calculate(path)
  }
}
