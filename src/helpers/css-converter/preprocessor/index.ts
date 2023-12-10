import { isColor, preprocessColor } from './color';
import {
  preprocessFontFamily,
  preprocessFontSize,
  preprocessFontWeight,
  preprocessLetterSpacing,
  preprocessLineHeight,
} from './text';
import { preprocessSpacing } from './spacing';
import { preprocessDimension } from './dimension';

export { preprocessShorthand } from './shorthand';
export { default as TAILWINDCLASS } from './constants';

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
    case 'padding':
    case 'margin':
    case 'padding-top':
    case 'padding-left':
    case 'padding-right':
    case 'padding-bottom':
    case 'margin-top':
    case 'margin-left':
    case 'margin-right':
    case 'margin-bottom':
    case 'border-radius':
      return preprocessSpacing(value);
    case 'width':
    case 'height':
      return preprocessDimension(value);
    case 'color':
    case 'background-color':
    case 'border-color':
      return preprocessColor(value);
    default:
      return value;
  }
}
