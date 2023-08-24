import { convertUnit } from '~/helpers/preprocessor/unit';

export function preprocessFontWeight(value: string) {
  switch (value) {
    case 'normal':
      return '400';
    case 'bold':
      return '700';
    default:
      return value;
  }
}

export function preprocessFontSize(value: string) {
  return convertUnit(value, 'rem');
}

export function preprocessLineHeight(value: string) {
  return convertUnit(value, 'rem');
}

export function preprocessLetterSpacing(value: string) {
  return convertUnit(value, 'em');
}

export function preprocessFontFamily(value: string) {
  return `'${value.split(',')[0].replace(' ', '_')}'`;
}
