/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import type { JSXAttribute, JSXSpreadAttribute } from 'estree-jsx';

export function generateJSXOpeningElementClassNameAttribute(
  attributes: (JSXAttribute | JSXSpreadAttribute)[],
  attributeValue: string,
): JSXAttribute[] {
  const classNameAttributeIndex = attributes.findIndex(
    (attribute) => 'name' in attribute && attribute.name.name === 'className',
  );

  if (classNameAttributeIndex === -1) {
    const jsxAttribute: JSXAttribute = {
      type: 'JSXAttribute',
      name: {
        type: 'JSXIdentifier',
        name: 'className',
      },
      value: {
        type: 'Literal',
        extra: {
          rawValue: attributeValue,
          raw: `'${attributeValue}'`,
        },
        value: attributeValue,
      },
    };

    attributes = [jsxAttribute];
  } else {
    const draft: JSXAttribute = attributes[classNameAttributeIndex];

    if (draft.value?.type === 'JSXExpressionContainer') {
      const combinedValue = `${draft.value.expression.extra.rawValue} ${attributeValue}`;

      attributes[classNameAttributeIndex] = {
        ...draft,
        value: {
          ...draft.value,
          expression: {
            ...draft.value.expression,
            extra: {
              rawValue: combinedValue,
              raw: `'${combinedValue}'`,
            },
            value: combinedValue,
          },
        },
      };
    } else if (draft.value?.type === 'StringLiteral') {
      const combinedValue = `${draft.value.extra.rawValue} ${attributeValue}`;
      attributes[classNameAttributeIndex] = {
        ...draft,
        value: {
          ...draft.value,
          extra: {
            rawValue: combinedValue,
            raw: `'${combinedValue}'`,
          },
          value: combinedValue,
        },
      };
    }
  }

  return attributes;
}

export function generateConcatenatedCSSTemplateLiteral(quasis: any[]) {
  return quasis.reduce((sum, curr) => {
    if (!curr.tail) {
      const replaced = curr.value.raw.replace(/\n|\s/g, '');
      if (replaced[replaced.length - 1] === ':') {
        return sum + `${curr.value.raw} unset`;
      }

      return sum + curr.value.raw;
    }
    return sum + curr.value.raw;
  }, '');
}
