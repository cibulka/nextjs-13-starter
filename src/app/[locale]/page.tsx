import Page from 'src/components/page/Page';
import { getMdx } from 'src/fetch/single';
import getContentSerialized from 'src/helpers/getContentSerialized';
import { getPath } from 'src/helpers/getPath';
import LayoutLocale from 'src/server/layout-locale';
import { PageProps } from 'src/types';

export default async function PageIndex(props: PageProps) {
  const { locale } = props.params;

  const filepath = getPath(`db/${locale}/pages/home.mdx`);

  const article = getMdx(filepath, locale);
  const content = await getContentSerialized(filepath);

  return (
    <LayoutLocale locale={locale}>
      <Page article={article} content={content} locale={locale} />
    </LayoutLocale>
  );
}
