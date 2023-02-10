import * as core from '@actions/core'
import { ActionOptions, Strategy } from './common/actionOptions'
import { StyleOptions, TextAlign, TextStyle } from './common/styleOptions'
import { implementCalculator } from './factory/calculatorFactory'
import ICalculator from './factory/ICalculator'

async function run(): Promise<void> {
  try {
    const options: ActionOptions = validateInputs()

    console.log('Initializing calculator...')
    const calculator: ICalculator = implementCalculator(options)

    console.log('Running calculator...')
    await calculator.run()
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

function validateInputs(): ActionOptions {
  const strategy = core.getInput('strategy')
  if (!Object.values(Strategy).includes(strategy as Strategy)) {
    throw new Error(`Invalid strategy: ${strategy}`)
  }

  const paths = core.getInput('paths').split('|')
  if (strategy === Strategy.Paths && paths.length === 0) {
    throw new Error('Paths strategy requires at least one path')
  }

  const textStyle = core.getInput('text-style')
  if (!Object.values(TextStyle).includes(textStyle as TextStyle)) {
    throw new Error(`Invalid text style: ${textStyle}`)
  }

  const textAlign = core.getInput('text-align')
  if (!Object.values(TextAlign).includes(textAlign as TextAlign)) {
    throw new Error(`Invalid text align: ${textAlign}`)
  }

  return {
    strategy: strategy as Strategy,
    paths: paths,
    styleOptions: {
      textStyle: textStyle as TextStyle,
      textAlign: textAlign as TextAlign
    } as StyleOptions
  } as ActionOptions
}

run()
