import formatForDisplay from './format-for-display';

export type SmallDisplayMagnitude = 'short' | 'medium';

export interface SmallUnitValue {
  value: number;
  magnitude: string;
  prefix: string;
}

export default function smallDisplay(
  value: number,
  magnitude: SmallDisplayMagnitude = 'short'
): SmallUnitValue {
  const rounded = Math.round(value);
  const positive = Math.abs(rounded);
  const stringValue = String(positive);
  let prefix;
  if (rounded > 0) {
    prefix = '+';
  } else if (rounded < 0) {
    prefix = '-';
  } else {
    prefix = '';
  }

  const isShortMagnitude = magnitude === 'short';

  if (stringValue.length <= 3) {
    return {
      value: Number(
        formatForDisplay(positive, {
          digits: 0,
          includeDollarSign: false,
        })
      ),
      magnitude: '',
      prefix,
    };
  } else if (stringValue.length === 4) {
    return {
      value: Number(stringValue.slice(0, -2)) / 10,
      magnitude: isShortMagnitude ? 'k' : 'k',
      prefix,
    };
  } else if (stringValue.length <= 6) {
    return {
      value: Number(stringValue.slice(0, -3)),
      magnitude: isShortMagnitude ? 'k' : 'k',
      prefix,
    };
  } else if (stringValue.length === 7) {
    return {
      value: Number(stringValue.slice(0, -5)) / 10,
      magnitude: isShortMagnitude ? 'mil' : 'million',
      prefix,
    };
  } else if (stringValue.length <= 9) {
    return {
      value: Number(stringValue.slice(0, -6)),
      magnitude: isShortMagnitude ? 'mil' : 'million',
      prefix,
    };
  } else if (stringValue.length === 10) {
    return {
      value: Number(stringValue.slice(0, -8)) / 10,
      magnitude: isShortMagnitude ? 'bil' : 'billion',
      prefix,
    };
  } else if (stringValue.length <= 12) {
    return {
      value: Number(stringValue.slice(0, -9)),
      magnitude: isShortMagnitude ? 'bil' : 'billion',
      prefix,
    };
  } else {
    return {
      value: Number(stringValue.slice(0, -12)),
      magnitude: '…',
      prefix,
    };
  }
}
