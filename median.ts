export function median(data: number[], destructive = false) {
  if (!destructive) data = [...data];
  const { length } = data;
  data.sort((a, b) => a - b);
  return length % 2 === 1 ?
    data[(length - 1) * .5] :
    .5 * data[length * .5 - 1] + .5 * data[length * .5];
}