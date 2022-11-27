import Page from 'src/components/page/Page';
import { getMdx } from 'src/fetch/single';
import getContentSerialized from 'src/helpers/getContentSerialized';
import preventPurge from 'src/helpers/preventPurge';
import LayoutLocale from 'src/server/layout-locale';
import { PageProps } from 'src/types';

export default async function PageIndex(props: PageProps) {
  const { locale } = props.params;

  const path = `db/${locale}/pages/home.mdx`;
  preventPurge(path);

  const article = getMdx(path, locale);
  const content = await getContentSerialized(path);

  return (
    <LayoutLocale locale={locale}>
      <Page article={article} content={content} locale={locale} />
    </LayoutLocale>
  );
}
