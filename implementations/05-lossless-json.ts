import { parse as parseOriginal } from 'lossless-json';

export function parse(s: string) {
  return parseOriginal(s, undefined, (s: string) => parseFloat(s));
}
