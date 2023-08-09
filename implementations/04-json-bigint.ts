import { parse as jbparse } from 'json-bigint';
export const parse = (s: string) => jbparse(s, (k, v) => v && v.toNumber ? v.toNumber() : v);
