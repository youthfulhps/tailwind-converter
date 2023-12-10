export type SizeUnit = 'px' | 'rem' | 'em';

export function convertUnit(value: string, sizeUnit: SizeUnit) {
  switch (sizeUnit) {
    case 'rem':
      return switchSizeUnit({
        value,
        pxCallback: pixelToRem,
        remCallback: (value: string) => value,
        emCallback: emToRem,
      });
    case 'em':
      return switchSizeUnit({
        value,
        pxCallback: pixelToEm,
        remCallback: remToEm,
        emCallback: (value: string) => value,
      });
    case 'px':
      return switchSizeUnit({
        value,
        pxCallback: (value: string) => value,
        remCallback: remToPixel,
        emCallback: emToPixel,
      });
    default:
      return value;
  }
}

type SizeUnitCallback = (value: string) => string;

type SwitchSizeUnitParams = {
  value: string;
  pxCallback: SizeUnitCallback;
  remCallback: SizeUnitCallback;
  emCallback: SizeUnitCallback;
};

function switchSizeUnit({
  value,
  pxCallback,
  remCallback,
  emCallback,
}: SwitchSizeUnitParams) {
  if (value.endsWith('px')) {
    return pxCallback(value);
  }

  if (value.endsWith('rem')) {
    return remCallback(value);
  }

  if (value.endsWith('em')) {
    return emCallback(value);
  }

  return value;
}

function emToPixel(value: string) {
  return `${Number(value.replace('em', '')) * 16}px`;
}

function remToPixel(value: string) {
  return `${Number(value.replace('rem', '')) * 16}px`;
}

function pixelToRem(value: string) {
  const size = parseInt(value.replace('px', ''));

  return (1 / 16) * size + 'rem';
}

function remToEm(value: string) {
  return value.replace('rem', 'em');
}

function pixelToEm(value: string) {
  const size = parseInt(value.replace('px', ''));

  return (1 / 16) * size + 'em';
}

function emToRem(value: string) {
  return value.replace('em', 'rem');
}
