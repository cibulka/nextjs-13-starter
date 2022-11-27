import React from 'react';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

import { getMdxMultiple } from 'src/fetch/multiple';
import { getHrefPost } from 'src/helpers/getHref';
import { Locale } from 'src/types';

import MdxClient from './components/MdxClient';

const Mdx = (props: { content: MDXRemoteSerializeResult; locale: Locale }) => {
  const posts = getMdxMultiple(`db/${props.locale}/posts/*.mdx`, (slug) =>
    getHrefPost(props.locale, slug),
  );

  return <MdxClient content={props.content} locale={props.locale} posts={posts} />;
};

export default Mdx;
