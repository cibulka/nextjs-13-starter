import useTranslate from 'src/hooks/useTranslate';
import Page from 'src/components/page/Page';
import { Locale } from 'src/types';

import LayoutLocale from '../layout-locale';

import { getPage } from './fetch';
import getContentSerialized from 'src/helpers/getContentSerialized';

export function getPageHead(locale: Locale, slug: string) {
  function PageHead() {
    const article = getPage(slug, locale);

    const translate = useTranslate(locale);

    return (
      <>
        <title>{article ? article.title : translate('notFound')}</title>
      </>
    );
  }

  return PageHead;
}

export function getPagePage(locale: Locale, slug: string) {
  async function PagePage() {
    let path = `db/${locale}/pages/${slug}.mdx`;
    if (slug === 'readme') path = 'readme.md';

    const article = getPage(slug, locale);
    const content = await getContentSerialized(path);

    return (
      <LayoutLocale locale={locale}>
        <Page article={article} content={content} locale={locale} />
      </LayoutLocale>
    );
  }

  return PagePage;
}
