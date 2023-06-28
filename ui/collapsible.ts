import m from 'mithril';

export function collapsible(toggle: m.Vnode, content: m.Vnode) {
  return m('.collapsible',
    m('label',
      m('input', { type: 'checkbox' }),
      m('.toggle', toggle),
      m('.content', content)),
  );
}