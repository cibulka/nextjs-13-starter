import { Locale } from 'src/types';

export function getHrefPost(locale: Locale, slug: string) {
  return `/${locale}/posts/${slug}`;
}
