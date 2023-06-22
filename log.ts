
export function log(...args: any[]) {
  console.log(...args);
  // (document.querySelector('#log') as HTMLDivElement).innerText +=
  //   args.map(a => typeof a === 'string' ? a : JSON.stringify(a)).join(' ') + '\n';
}
