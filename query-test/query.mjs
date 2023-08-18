import { types } from '@neondatabase/serverless';  // or from 'pg'
import { parse } from 'json-custom-numbers';

// this leaves most values as ordinary numbers, using BigInt for large integers only
function parseJSONWithBigInts(str) {
  return parse(str, undefined, function (k, str) {
    const n = +str;
    const safe = n >= Number.MIN_SAFE_INTEGER && n <= Number.MAX_SAFE_INTEGER;
    return safe || /[.eE]/.test(str) ? n : BigInt(str);
  });
}

types.setTypeParser(types.builtins.JSON, parseJSONWithBigInts);
types.setTypeParser(types.builtins.JSONB, parseJSONWithBigInts);


import { neon } from '@neondatabase/serverless';  // or from 'pg'

const sql = neon(process.env.DATABASE_URL);

sql`SELECT to_json((1e15)::bigint) AS big`
  .then(x => console.log('number:', x));

sql`SELECT to_json((1e16 + 1)::bigint) AS big`
  .then(x => console.log('BigInt:', x));
