import { BN } from 'bn.js';

export interface IFormatNumberOptions {
  currency?: string;
  minDigits?: number | ((n: number) => number);
  maxDigits?: number | ((n: number) => number);
}

export const getLocale = (): string => {
  if (typeof window === 'undefined') {
    return 'en-US';
  }
  return window?.navigator?.language || window?.navigator?.languages[0] || 'en-US';
};

const defaultFormatOptions = {
  currency: '',
  minDigits: 0,
  maxDigits: (number) => (number > 100 ? 0 : number > 0.1 ? 2 : 4),
};

// only for smaller numbers
export const formatNumber = (number: number | BN, options: IFormatNumberOptions = {}): string => {
  number = number instanceof BN ? number.toNumber() : Number(number) || 0;

  options = { ...defaultFormatOptions, ...options };

  const minDigits =
    typeof options.minDigits === 'function' ? options.minDigits(number) : options.minDigits;
  const maxDigits =
    typeof options.maxDigits === 'function' ? options.maxDigits(number) : options.maxDigits;

  const formattedNumber = new Intl.NumberFormat(getLocale(), {
    style: options.currency ? 'currency' : 'decimal',
    currency: options.currency ? options.currency : undefined,
    minimumFractionDigits: minDigits,
    maximumFractionDigits: maxDigits > minDigits ? maxDigits : minDigits,
  }).format(number);

  return formattedNumber;
};
