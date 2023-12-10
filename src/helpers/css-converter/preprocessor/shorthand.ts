import TAILWINDCLASS from './constants';
import { StyleDeclaration, StyleRule } from '~/types';
import { isColor } from './color';

export function preprocessShorthand(styleRules: StyleRule[]) {
  return styleRules.map((styleRule) => {
    const init: StyleDeclaration[] = [];

    return {
      ...styleRule,
      declarations: styleRule.declarations.reduce((sum, curr) => {
        switch (curr.property) {
          case 'padding':
          case 'margin':
            return [
              ...sum,
              ...preprocessSpacingShorthand(curr.property, curr.value),
            ];
          case 'border':
            return [...sum, ...preprocessBorderShorthand(curr.value)];
          default:
            return [...sum, curr];
        }
      }, init),
    };
  });
}

export function preprocessSpacingShorthand(
  property: string,
  value: string,
): StyleDeclaration[] {
  const values = value.split(' ');

  const propertyX = `${property}-x`;
  const propertyY = `${property}-y`;
  const propertyTop = `${property}-top`;
  const propertyRight = `${property}-right`;
  const propertyBottom = `${property}-bottom`;
  const propertyLeft = `${property}-left`;

  switch (values.length) {
    case 2:
      return [
        {
          type: 'declaration',
          position: null,
          property: propertyY,
          value: values[0],
        },
        {
          type: 'declaration',
          position: null,
          property: propertyX,
          value: values[1],
        },
      ];
    case 3:
      return [
        {
          type: 'declaration',
          position: null,
          property: propertyTop,
          value: values[0],
        },
        {
          type: 'declaration',
          position: null,
          property: propertyX,
          value: values[1],
        },
        {
          type: 'declaration',
          position: null,
          property: propertyBottom,
          value: values[2],
        },
      ];
    case 4:
      return [
        {
          type: 'declaration',
          position: null,
          property: propertyTop,
          value: values[0],
        },
        {
          type: 'declaration',
          position: null,
          property: propertyRight,
          value: values[1],
        },
        {
          type: 'declaration',
          position: null,
          property: propertyBottom,
          value: values[2],
        },
        {
          type: 'declaration',
          position: null,
          property: propertyLeft,
          value: values[3],
        },
      ];
    case 1:
    default:
      return [
        {
          type: 'declaration',
          position: null,
          property,
          value,
        },
      ];
  }
}

function preprocessBorderShorthand(value: string): StyleDeclaration[] {
  const values = value.split(' ');

  const borderStyle = findBorderStyle(values);
  const borderWidth = findBorderWidth(values);
  const borderColor = findBorderColor(values);

  if (!borderStyle) {
    return [];
  }

  const border: StyleDeclaration[] = [
    {
      type: 'declaration',
      position: null,
      property: 'border-style',
      value: borderStyle,
    },
  ];

  if (borderWidth) {
    border.push({
      type: 'declaration',
      position: null,
      property: 'border-width',
      value: borderWidth,
    });
  }

  if (borderColor) {
    border.push({
      type: 'declaration',
      position: null,
      property: 'border-color',
      value: borderColor,
    });
  }

  return border;
}

function findBorderStyle(values: string[]) {
  const borderStyle = values.filter((value) =>
    Object.keys(TAILWINDCLASS['border-style']).includes(value),
  );

  if (!borderStyle.length) {
    return '';
  }

  return borderStyle[borderStyle.length - 1];
}

function findBorderColor(values: string[]) {
  const borderColor = values.filter(
    (value) =>
      Object.keys(TAILWINDCLASS['border-color']).includes(value) &&
      isColor(value),
  );

  if (!borderColor.length) {
    return '';
  }

  return borderColor[borderColor.length - 1];
}

function findBorderWidth(values: string[]) {
  const borderWidth = values.filter(
    (value) =>
      (!Object.keys(TAILWINDCLASS['border-color']).includes(value) &&
        !Object.keys(TAILWINDCLASS['border-style']).includes(value) &&
        !isColor(value)) ||
      value.endsWith('px') ||
      value.endsWith('rem') ||
      value.endsWith('em'),
  );

  if (!borderWidth.length) {
    return '';
  }

  return borderWidth[borderWidth.length - 1];
}
