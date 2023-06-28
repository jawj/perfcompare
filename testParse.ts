import { base64Decode } from './base64';
import testsJson from './testsJson.json';

type TestKey = keyof typeof testsJson;

const textDec = new TextDecoder();
for (const key in testsJson) testsJson[key as TestKey] = textDec.decode(base64Decode(testsJson[key as TestKey]));

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
    const description = `JSON.parse ${trueErr ? 'error' : 'OK'}, custom function ${testErr ? 'error' : 'OK'}`;
    return { description, error: trueErr ? (trueErr as Error).message : (testErr as Error).message };
  }

  const trueResultJson = JSON.stringify(trueResult)
  const testResultJson = JSON.stringify(testResult);
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
      case 'y':
        if (result.error) validJSONUnexpectedErrors.push(details);
        else validJSONDifferentResults.push(details);
        break;

      case 'n':
        invalidJSONUnexpectedSuccesses.push(details);
        break;

      default:
        indeterminateJSONDifferentOutcomes.push(details);
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
