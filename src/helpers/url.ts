export function createUrl(...args: string[]) {
  return `/${args.map((arg) => arg.replace('/', '')).join('/')}`;
}
