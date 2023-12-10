import { convertUnit } from './unit';

export function preprocessSpacing(value: string) {
  return convertUnit(value, 'rem');
}
