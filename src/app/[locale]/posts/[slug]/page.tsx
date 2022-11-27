import path from 'path';
import fastGlob from 'fast-glob';

import config from 'config';
import Page from 'src/components/page/Page';
import PostsList from 'src/components/posts-list/PostsList';
import { getMdxMultiple } from 'src/fetch/multiple';
import { getMdx } from 'src/fetch/single';
import getContentSerialized from 'src/helpers/getContentSerialized';
import { getHrefPost } from 'src/helpers/getHref';
import { getPath } from 'src/helpers/getPath';
import LayoutLocale from 'src/server/layout-locale';
import { Locale, PagePostProps } from 'src/types';

function getHref(locale: Locale, slug: string) {
  return `/${locale}/posts/${slug}`;
}

export function generateStaticParams() {
  return config.locales
    .map((locale) => {
      const paths = fastGlob.sync(`db/${locale}/posts/*.mdx`);
      return paths.map((p) => {
        const slug = path.basename(p, '.mdx');
        return { slug, locale };
      });
    })
    .flat();
}

export default async function PostPage(p: PagePostProps) {
  const { locale, slug } = p.params;
  const filePath = getPath(`db/${locale}/posts/${slug}.mdx`);

  const mdx = getMdx(filePath, getHref(locale, slug));
  const content = await getContentSerialized(filePath);

  const posts = getMdxMultiple(`db/${locale}/posts/*.mdx`, (slug) => getHrefPost(locale, slug));
  const otherPosts = posts.filter((s) => s.slug !== slug);

  return (
    <LayoutLocale locale={locale}>
      <Page article={mdx} content={content} locale={locale} />
      <PostsList className="max-w-lg w-full" posts={otherPosts} locale={locale} />
    </LayoutLocale>
  );
}
