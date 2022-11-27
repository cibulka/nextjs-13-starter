import fs, { read } from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { Post } from 'src/types';
import { removeExcerptFromContent } from './removeExcerptFromContent';

function readFile(filepathRelative: string) {
  const fileData = fs.readFileSync(filepathRelative, 'utf-8');
  return matter(fileData);
}

export function getMatterData(filepathRelative: string) {
  const fileData = readFile(filepathRelative);
  return fileData.data;
}

export function getContent(filepathRelative: string, keepExcerpt?: boolean) {
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
