import { parse as jbparse } from 'json-bigint';
export const parseConform = (s: string) => jbparse(s, (k, v) => v && v.toNumber ? v.toNumber() : v);
export const parsePerform = jbparse;
