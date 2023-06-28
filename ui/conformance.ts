import m from 'mithril';
import { testParseAll, testsJson } from '../testParse';
import { collapsible } from './collapsible';


export function conformanceUI(el: HTMLElement, parse: (json: string) => any, title: string) {
  let results = testParseAll(parse);
  let counts = Object.fromEntries(Object.entries(results).map(([k, v]) => [k, v.length])) as Record<keyof typeof results, number>;
  let allMatched = results.matchedOutcomes.length === Object.keys(testsJson).length;

  m.render(el, m('.conform',
    m('.matched', m('b', (allMatched ? 'All ' : '') + results.matchedOutcomes.length), ' outcomes match JSON.parse'),

    counts.invalidJSONUnexpectedSuccesses > 0 &&
    m('.invalid-accepted', collapsible(
      m('div', m('b', counts.invalidJSONUnexpectedSuccesses), ' invalid documents accepted'),
      m('ul', results.invalidJSONUnexpectedSuccesses.map(ue =>
        m('li', 'test: ', ue.key,
          m('ul.details',
            m('li', 'Input: ', m('span.code', ue.json)),
            m('li', 'Expected error: ', m('span.code', (ue as any).error))
          )
        )
      )),
    )),

    counts.indeterminateJSONDifferentOutcomes > 0 &&
    counts.validJSONDifferentResults > 0 &&
    m('.ambiguous-different', collapsible(
      m('div', m('b', counts.indeterminateJSONDifferentOutcomes), ' ambiguous documents parsed differently'),
      m('ul', results.indeterminateJSONDifferentOutcomes.map(ue =>
        m('li', 'test: ', ue.key,
          m('ul.details',
            (ue as any).description && m('li', (ue as any).description),
            (ue as any).error && m('li', 'Source: ', m('span.code', (ue as any).json)),
            (ue as any).expected && m('li', 'Expected: ', m('span.code', (ue as any).expected)),
            (ue as any).actual && m('li', 'Actual: ', m('span.code', (ue as any).actual)),
            (ue as any).error && m('li', 'Error: ', m('span.code', (ue as any).error)),
          )
        )
      )),
    )),

    counts.validJSONUnexpectedErrors > 0 && m('.valid-throws-error', collapsible(
      m('div', m('b', counts.validJSONUnexpectedErrors), ' errors thrown on valid (or ambiguous) documents'),
      m('ul', results.validJSONUnexpectedErrors.map(ue =>
        m('li', 'test: ', ue.key,
          m('ul.details',
            m('li', 'Input: ', m('span.code', ue.json)),
            m('li', 'Error: ', m('span.code', (ue as any).error))
          )
        )
      ))
    )),

    counts.validJSONDifferentResults > 0 &&
    m('.valid-parsed-wrong', collapsible(
      m('div', m('b', counts.validJSONDifferentResults), ' valid documents parsed wrongly'),
      m('ul', results.validJSONDifferentResults.map(ue =>
        m('li', 'test: ', ue.key,
          m('ul.details',
            m('li', 'Expected: ', m('span.code', (ue as any).expected)),
            m('li', 'Actual: ', m('span.code', (ue as any).actual))
          )
        )
      )),
    )),
  ));
}
