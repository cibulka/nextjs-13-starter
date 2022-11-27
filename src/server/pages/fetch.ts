import { getMdx } from 'src/helpers/getMdx';
import { Locale } from 'src/types';

export function getPage(slug: string, locale: Locale) {
  let path = `db/${locale}/pages/${slug}.mdx`;
  if (slug === 'readme') path = 'readme.md';

  return getMdx(path, '/${locale}/posts/${slug}');
}
