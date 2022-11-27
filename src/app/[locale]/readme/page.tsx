import Page from 'src/components/page/Page';
import { getMdx } from 'src/fetch/single';
import getContentSerialized from 'src/helpers/getContentSerialized';
import { getPath } from 'src/helpers/getPath';
import LayoutLocale from 'src/server/layout-locale';
import { Locale } from 'src/types';

export default async function PageReadMe(props: { params: { locale: Locale } }) {
  const { locale } = props.params;
  const path = getPath('readme.md');

  const article = getMdx(path, '/readme.md');
  const content = await getContentSerialized(path);

  return (
    <LayoutLocale locale={locale}>
      <Page article={article} content={content} locale={locale} />
    </LayoutLocale>
  );
}
