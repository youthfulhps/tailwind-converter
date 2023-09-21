import TAILWINDCLASS from '../preprocessor/constants';
import { StyleDeclaration, StyleRule } from '~/helpers/extractor';
import { preprocessProperty, preprocessValue } from '../preprocessor';
import { preprocessShorthand } from '~/helpers/preprocessor/shorthand';

export function convertStyles(styles: StyleRule[]) {
  const rules = preprocessShorthand(styles);

  return rules.reduce((combinedStyles, rule) => {
    const selectors = convertSelector(rule.selectors);
    const utilities = rule.declarations.map((declaration) =>
      convertCss(declaration),
    );

    return (
      combinedStyles +
      selectors.reduce(
        (combinedSelectors, selector) =>
          combinedSelectors +
          utilities.reduce(
            (combinedUtilities, util) =>
              combinedUtilities + `${selector}${selector ? ':' : ''}${util} `,
            '',
          ),
        '',
      )
    );
  }, '');
}

export function convertSelector(selectors: string[]) {
  return selectors.map((selector) =>
    selector === '_'
      ? ''
      : `[${selector.replace('_', '&').replaceAll(' ', '>')}]`,
  );
}

export function convertCss(styleDeclaration: StyleDeclaration) {
  let { property } = styleDeclaration;
  const { value } = styleDeclaration;

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
