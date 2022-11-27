import path from 'path';

export function getPath(...args: string[]) {
  let result = path.resolve(process.cwd(), ...args);
  result = result.replace(/\\/g, '/'); // bloody windows
  return result;
}
