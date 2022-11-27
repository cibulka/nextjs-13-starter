import fastGlob from 'fast-glob';
import path from 'path';

export async function generateStaticParamsForArticles(locale: string) {
  const paths = fastGlob.sync(`db/${locale}/posts/*.mdx`);

  return paths.map((p) => {
    const slug = path.basename(p, '.mdx');
    return { slug };
  });
}
