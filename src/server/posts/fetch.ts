import path from 'path';
import fastGlob from 'fast-glob';

import { getMdx } from 'src/helpers/getMdx';
import { Post, Locale } from 'src/types';

function getHref(locale: Locale, slug: string) {
  return `/${locale}/posts/${slug}`;
}

export function getPost(slug: string, locale: Locale) {
  const path = `db/${locale}/posts/${slug}.mdx`;
  return getMdx(path, getHref(locale, slug));
}

export default function getPosts(locale: Locale) {
  let result: Post[] = [];
  const paths = fastGlob.sync(`db/${locale}/posts/*.mdx`);

  for (let i = 0; i < paths.length; i += 1) {
    const p = paths[i];
    const slug = path.basename(p, '.mdx');
    const post = getMdx(p, getHref(locale, slug));
    if (post) result = [...result, post];
  }

  return result;
}
