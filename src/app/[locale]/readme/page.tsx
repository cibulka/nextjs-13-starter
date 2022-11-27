import fs from 'fs';
import path from 'path';

import Page from 'src/components/page/Page';
import { getMdx } from 'src/fetch/single';
import getContentSerialized from 'src/helpers/getContentSerialized';
import { getPath } from 'src/helpers/getPath';
import LayoutLocale from 'src/server/layout-locale';
import { Locale } from 'src/types';

export default async function PageReadMe(props: { params: { locale: Locale } }) {
  const { locale } = props.params;
  const filepath = getPath('README.md');

  const article = getMdx(filepath, '/readme');
  const content = await getContentSerialized(filepath);

  return (
    <LayoutLocale locale={locale}>
      <Page article={article} content={content} locale={locale} />
    </LayoutLocale>
  );
}
