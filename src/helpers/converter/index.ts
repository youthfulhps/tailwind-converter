import TAILWINDCLASS from '../preprocessor/constants';
import { StyleEntity } from '~/helpers/extractor';
import {
  preprocessProperty,
  CSSStyleEntity,
  preprocessValue,
} from '../preprocessor';

export function convertStyles(styles: StyleEntity[]) {
  return styles.map((style) => convertCss({ ...style })).join(' ');
}

export function convertCss({ property, value }: CSSStyleEntity) {
  property = preprocessProperty({ property, value });
  const processedValue = preprocessValue({ property, value });

  if (!TAILWINDCLASS[property]) {
    throw new Error('스타일 속성 없음');
  }

  if (!TAILWINDCLASS[property][processedValue]) {
    return `${TAILWINDCLASS[property]['arbitrary']}-[${value}]`;
  }

  return TAILWINDCLASS[property][processedValue].slice(1);
}
