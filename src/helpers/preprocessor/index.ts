import { isColor } from './color';
import {
  preprocessFontFamily,
  preprocessFontSize,
  preprocessFontWeight,
  preprocessLetterSpacing,
  preprocessLineHeight,
} from './text';

export type CSSStyleEntity = {
  property: string;
  value: string;
};

export function preprocessProperty({ property, value }: CSSStyleEntity) {
  if (property === 'background') {
    if (isColor(value)) {
      return 'background-color';
    }
    return property;
  }

  return property;
}

export function preprocessValue({ property, value }: CSSStyleEntity) {
  if (
    ['0em', '0ex', '0ch', '0rem', '0vw', '0vh', '0%', '0px'].includes(value)
  ) {
    return '0';
  }

  switch (property) {
    case 'font-weight':
      return preprocessFontWeight(value);
    case 'font-size':
      return preprocessFontSize(value);
    case 'line-height':
      return preprocessLineHeight(value);
    case 'letter-spacing':
      return preprocessLetterSpacing(value);
    case 'font-family':
      return preprocessFontFamily(value);
    default:
      return value;
  }
}
