import React from 'react';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

import getArticles from 'src/server/posts/fetch';
import { Locale } from 'src/types';

import MdxClient from './components/MdxClient';

const Mdx = (props: { content: MDXRemoteSerializeResult; locale: Locale }) => {
  const posts = getArticles(props.locale);

  return <MdxClient content={props.content} locale={props.locale} posts={posts} />;
};

export default Mdx;
