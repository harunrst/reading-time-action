import { ActionOptions } from '../common/actionOptions'
import { calculateReadingTime } from '../functions/calculateReadingTime'
import { getReadingTimeElement } from '../functions/getReadingTimeElement'
import { prependReadingTime } from '../functions/prependReadingTime'

export class CalculatorBase {
  protected options: ActionOptions

  constructor(options: ActionOptions) {
    this.options = options
    console.log('CalculatorBase is initialized.')
  }

  protected calculate = async (markdown: string): Promise<void> => {
    const readingTimeText = await calculateReadingTime(markdown)
    await prependReadingTime(
      markdown,
      getReadingTimeElement(
        readingTimeText,
        this.options.styleOptions.textStyle,
        this.options.styleOptions.textAlign
      )
    )
  }

  protected calculateList = async (markdowns: string[]): Promise<void> => {
    console.log(`Calculating ${markdowns.length} markdowns.`)
    await Promise.all(
      markdowns.map(async markdown => {
        await this.calculate(markdown)
      })
    )
  }
}
