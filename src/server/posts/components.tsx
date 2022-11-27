import useTranslate from 'src/hooks/useTranslate';
import Page from 'src/components/page/Page';
import { Locale } from 'src/types';

import LayoutLocale from '../layout-locale';

import { getPost } from './fetch';
import { PostPageProps } from './types';
import getContentSerialized from 'src/helpers/getContentSerialized';

export function getPostHead(locale: Locale) {
  function PostHead(p: PostPageProps) {
    const { slug } = p.params;
    const article = getPost(slug, locale);

    const translate = useTranslate(locale);

    return (
      <>
        <title>{article ? article.title : translate('notFound')}</title>
      </>
    );
  }

  return PostHead;
}

export function getPostPage(locale: Locale) {
  async function PostPage(p: PostPageProps) {
    const { slug } = p.params;

    const article = getPost(slug, locale);
    const content = await getContentSerialized(`db/${locale}/posts/${slug}.mdx`);

    return (
      <LayoutLocale locale={locale}>
        <Page article={article} content={content} locale={locale} />
      </LayoutLocale>
    );
  }

  return PostPage;
}
