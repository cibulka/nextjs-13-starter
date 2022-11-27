import path from 'path';
import fastGlob from 'fast-glob';

import { Post } from 'src/types';

import { getMdx } from './single';

export function getMdxMultiple(glob: string, getHref: (slug: string) => string) {
  let result: Post[] = [];
  const paths = fastGlob.sync(glob);

  for (let i = 0; i < paths.length; i += 1) {
    const p = paths[i];
    const slug = path.basename(p, '.mdx');
    result = [...result, getMdx(p, getHref(slug))];
  }

  return result;
}
