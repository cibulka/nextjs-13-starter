import fs from 'fs';
import path from 'path';

export default function preventPurge(...args: string[]) {
  const p = path.join(process.cwd(), ...args);
  console.log(fs.existsSync(p) ? `${p} exists` : `${p} does not exist`);
}
