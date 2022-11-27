import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

import { removeExcerptFromContent } from 'src/helpers/removeExcerptFromContent';
import { Post } from 'src/types';

function readFile(filepathRelative: string) {
  const fileData = fs.readFileSync(filepathRelative, 'utf-8');
  return matter(fileData);
}

export function getMatterData(filepathRelative: string) {
  const fileData = readFile(filepathRelative);
  return fileData.data;
}

export function getMdxContent(filepathRelative: string, keepExcerpt?: boolean) {
  const fileData = readFile(filepathRelative);
  let content = fileData.content;
  if (!keepExcerpt) {
    content = removeExcerptFromContent(content);
  }
  return content;
}

export function getMdx(filepathRelative: string, href: string): Post {
  const fileData = readFile(filepathRelative);
  const slug = path.basename(filepathRelative, '.mdx');

  return {
    content: fileData.content,
    href,
    slug,
    title: typeof fileData.data.title === 'string' ? fileData.data.title : slug,
  };
}
