import { getMdx } from 'src/fetch/single';
import useTranslate from 'src/hooks/useTranslate';
import { PageProps } from 'src/types';

export default function PageIndexHead(props: PageProps) {
  const { locale } = props.params;
  const article = getMdx(`db/${locale}/pages/home.mdx`, locale);
  const translate = useTranslate(locale);

  return (
    <>
      <title>{article ? article.title : translate('notFound')}</title>
    </>
  );
}
