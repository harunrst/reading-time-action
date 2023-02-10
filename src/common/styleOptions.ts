export enum TextStyle {
  Default = 'default',
  Bold = 'bold'
}

export enum TextAlign {
  Left = 'left',
  Center = 'center',
  Right = 'right'
}

export interface StyleOptions {
  textStyle: TextStyle
  textAlign: TextAlign
}
