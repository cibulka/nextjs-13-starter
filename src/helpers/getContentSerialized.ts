import remarkGfm from 'remark-gfm';
import { serialize } from 'next-mdx-remote/serialize';
import { getMdxContent } from 'src/fetch/single';

export default async function getContentSerialized(
  filepathRelative: string,
  keepExcerpt?: boolean,
) {
  const content = getMdxContent(filepathRelative, keepExcerpt);
  if (!content) return null;

  const serialized = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });
  return serialized;
}
