import path from 'path';
import fastGlob from 'fast-glob';

import config from 'config';
import Page from 'src/components/page/Page';
import { getMdx } from 'src/fetch/single';
import getContentSerialized from 'src/helpers/getContentSerialized';
import LayoutLocale from 'src/server/layout-locale';
import { Locale, PagePostProps } from 'src/types';
import PostsList from 'src/components/posts-list/PostsList';
import { getMdxMultiple } from 'src/fetch/multiple';
import { getHrefPost } from 'src/helpers/getHref';
import preventPurge from 'src/helpers/preventPurge';

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
  const path = `db/${locale}/posts/${slug}.mdx`;
  preventPurge(path);

  const mdx = getMdx(path, getHref(locale, slug));
  const content = await getContentSerialized(path);

  const posts = getMdxMultiple(`db/${locale}/posts/*.mdx`, (slug) => getHrefPost(locale, slug));
  const otherPosts = posts.filter((s) => s.slug !== slug);

  return (
    <LayoutLocale locale={locale}>
      <Page article={mdx} content={content} locale={locale} />
      <PostsList className="max-w-lg w-full" posts={otherPosts} locale={locale} />
    </LayoutLocale>
  );
}
