import React from 'react';
import Link from 'next/link';

import { Post, Locale } from 'src/types';
import useTranslate from 'src/hooks/useTranslate';

import localization from './PostsList.localization';

const PostsList = (props: { className?: string; locale: Locale; posts: Post[] | null }) => {
  const translate = useTranslate(props.locale, localization);
  return (
    <div
      className={[props.className, 'border-t border-border-main text-sm mt-4 pt-4']
        .filter(Boolean)
        .join(' ')}
    >
      {props.posts && props.posts.length > 0 ? (
        <ul className="flex flex-row-wrap items-center gap-4">
          {props.posts.map((post) => (
            <li key={post.slug}>
              <Link href={post.href} className="text-primary-main underline">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>{translate('empty')}</div>
      )}
    </div>
  );
};

export default PostsList;
