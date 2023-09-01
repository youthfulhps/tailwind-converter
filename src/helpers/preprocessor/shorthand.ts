import TAILWINDCLASS from './constants';
import { StyleEntity } from '~/helpers/extractor';
import { isColor } from '~/helpers/preprocessor/color';

export function preprocessShorthand(styles: StyleEntity[]) {
  const init: StyleEntity[] = [];

  return styles.reduce((sum, curr) => {
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
  }, init);
}

export function preprocessSpacingShorthand(
  property: string,
  value: string,
): StyleEntity[] {
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
          property: propertyY,
          value: values[0],
        },
        {
          property: propertyX,
          value: values[1],
        },
      ];
    case 3:
      return [
        {
          property: propertyTop,
          value: values[0],
        },
        {
          property: propertyX,
          value: values[1],
        },
        {
          property: propertyBottom,
          value: values[2],
        },
      ];
    case 4:
      return [
        {
          property: propertyTop,
          value: values[0],
        },
        {
          property: propertyRight,
          value: values[1],
        },
        {
          property: propertyBottom,
          value: values[2],
        },
        {
          property: propertyLeft,
          value: values[3],
        },
      ];
    case 1:
    default:
      return [
        {
          property,
          value,
        },
      ];
  }
}

function preprocessBorderShorthand(value: string): StyleEntity[] {
  const values = value.split(' ');

  const borderStyle = findBorderStyle(values);
  const borderWidth = findBorderWidth(values);
  const borderColor = findBorderColor(values);

  if (!borderStyle) {
    return [];
  }

  const border: StyleEntity[] = [
    {
      property: 'border-style',
      value: borderStyle,
    },
  ];

  if (borderWidth) {
    border.push({
      property: 'border-width',
      value: borderWidth,
    });
  }

  if (borderColor) {
    border.push({
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
