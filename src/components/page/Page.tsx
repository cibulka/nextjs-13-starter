import React from 'react';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

import Mdx from 'src/components/mdx/Mdx';
import useTranslate from 'src/hooks/useTranslate';
import { Post, Locale } from 'src/types';

import localization from './Page.localization';

const Page = (props: {
  article: Post | null;
  content: MDXRemoteSerializeResult | null;
  locale: Locale;
}) => {
  const translate = useTranslate(props.locale, localization);

  return (
    <div className="cib-content max-w-lg">
      {props.article ? (
        <>
          <h1 className="text-3xl font-bold mb-4">{props.article.title}</h1>
          {props.content && <Mdx content={props.content} locale={props.locale} />}
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">{translate('notFound.title')}</h1>
          <p>{translate('notFound.text')}</p>
        </>
      )}
    </div>
  );
};

export default Page;
