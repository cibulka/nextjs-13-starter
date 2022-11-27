'use client';
import React from 'react';
import Link from 'next/link';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import PostsList from 'src/components/posts-list/PostsList';
import { Post, Locale } from 'src/types';

const MdxClient = (props: { content: MDXRemoteSerializeResult; locale: Locale; posts: Post[] }) => (
  <MDXRemote
    {...props.content}
    components={{
      // Components
      PostsList: (p: { className?: string }) => (
        <PostsList className={p.className} locale={props.locale} posts={props.posts} />
      ),
      // Elements
      a: (props) => {
        return <Link href={props.href || '/'}>{props.children}</Link>;
      },
    }}
  />
);

export default MdxClient;
