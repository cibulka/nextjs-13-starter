import path from 'path';
import fs from 'fs';

export default function preventPurge(filepath?: string) {
  try {
    const file = filepath || path.join(process.cwd(), 'db', 'keep_me.yaml');
    const data = fs.readFileSync(file, 'utf-8');
    console.log(data);
  } catch (e) {
    console.error(e);
  }
}
