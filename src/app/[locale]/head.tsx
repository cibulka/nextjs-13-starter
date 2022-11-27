import { getMdx } from 'src/fetch/single';
import { getPath } from 'src/helpers/getPath';
import useTranslate from 'src/hooks/useTranslate';
import { PageProps } from 'src/types';

export default function PageIndexHead(props: PageProps) {
  const { locale } = props.params;

  const path = getPath(`db/${locale}/pages/home.mdx`);
  const article = getMdx(path, locale);
  const translate = useTranslate(locale);

  return (
    <>
      <title>{article ? article.title : translate('notFound')}</title>
    </>
  );
}
