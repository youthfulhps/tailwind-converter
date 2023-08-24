import { convertUnit } from '~/helpers/preprocessor/unit';

export function preprocessSpacing(value: string) {
  return convertUnit(value, 'rem');
}
