import TAILWINDCLASS from '../preprocessor/constants';
import { StyleEntity } from '~/helpers/extractor';
import {
  preprocessProperty,
  CSSStyleEntity,
  preprocessValue,
} from '../preprocessor';
import { preprocessShorthand } from '~/helpers/preprocessor/shorthand';

export function convertStyles(styles: StyleEntity[]) {
  return preprocessShorthand(styles)
    .map((style) => convertCss({ ...style }))
    .join(' ');
}

export function convertCss({ property, value }: CSSStyleEntity) {
  property = preprocessProperty({ property, value });
  const processedValue = preprocessValue({ property, value });

  if (!TAILWINDCLASS[property]) {
    return '';
  }

  if (!TAILWINDCLASS[property][processedValue]) {
    return `${TAILWINDCLASS[property]['arbitrary']}-[${value}]`;
  }

  return TAILWINDCLASS[property][processedValue].slice(1);
}
