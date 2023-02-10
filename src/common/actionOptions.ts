import { StyleOptions } from './styleOptions'

export interface ActionOptions {
  strategy: Strategy
  paths?: string[]
  styleOptions: StyleOptions
}

export enum Strategy {
  All = 'all',
  Readme = 'readme',
  Paths = 'paths'
}
