import { base64Decode } from './base64';
import testsJson from './testsJson.json';
import { stringify } from 'json-custom-numbers';

type TestKey = keyof typeof testsJson;

const textDec = new TextDecoder();
for (const key in testsJson) testsJson[key as TestKey] = textDec.decode(base64Decode(testsJson[key as TestKey]));

const depth = 5e4;
// @ts-ignore
testsJson.y_very_deep = '['.repeat(depth) + ']'.repeat(depth);

export { testsJson };

export function testParse(parse: (json: string) => any, json: string) {
  let trueErr = undefined;
  let trueResult = undefined;
  try { trueResult = JSON.parse(json); }
  catch (err) { trueErr = err; }

  let testErr = undefined;
  let testResult = undefined;
  try { testResult = parse(json); }
  catch (err) { testErr = err; }

  if (!!testErr !== !!trueErr) {
    const description = `JSON.parse ${trueErr ? 'throws error' : 'parses'}, custom function ${testErr ? 'throws error' : 'parses'}`;
    return { description, error: trueErr ? (trueErr as Error).message : (testErr as Error).message };
  }

  const trueResultJson = stringify(trueResult, undefined, undefined, undefined, depth);
  const testResultJson = stringify(testResult, undefined, undefined, undefined, depth);
  if (trueResultJson !== testResultJson) {
    const description = 'Parse result mismatch';
    return { description, expected: trueResultJson, actual: testResultJson };
  }
}

export function testParseAll(parse: (json: string) => any) {
  let matchedOutcomes = [];
  let validJSONUnexpectedErrors = [];
  let validJSONDifferentResults = [];
  let invalidJSONUnexpectedSuccesses = [];
  let indeterminateJSONDifferentOutcomes = [];

  for (const key in testsJson) {
    const json = testsJson[key as TestKey];
    const result = testParse(parse, json);
    const details = { key, json, ...result };

    if (result === undefined) {
      matchedOutcomes.push(details);
      continue;
    }

    const prefix = key.match(/^[^_]+/)![0];  // y, n, i, number, object, string

    switch (prefix) {
      case 'n':
        invalidJSONUnexpectedSuccesses.push(details);
        break;

      case 'i':
        indeterminateJSONDifferentOutcomes.push(details);
        break;

      default:
        if (result.error) validJSONUnexpectedErrors.push(details);
        else validJSONDifferentResults.push(details);
    }
  }

  return {
    matchedOutcomes,
    validJSONUnexpectedErrors,
    validJSONDifferentResults,
    invalidJSONUnexpectedSuccesses,
    indeterminateJSONDifferentOutcomes,
  };
}
