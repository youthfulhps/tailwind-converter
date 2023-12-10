import { convertUnit } from './unit';

export function preprocessDimension(value: string) {
  if (value === '0' || value === '0px') {
    return '0';
  }

  return convertUnit(value, 'rem');
}
