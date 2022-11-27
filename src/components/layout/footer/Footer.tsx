import React from 'react';
import Link from 'next/link';

import { classNameMono } from 'src/helpers/getFontClassName';
import useTranslate from 'src/hooks/useTranslate';
import { Locale } from 'src/types';

const Footer = (props: { locale: Locale }) => {
  const translate = useTranslate(props.locale);
  return (
    <footer className="flex items-center justify-between p-4 text-xs">
      <Link href={`/${props.locale}/readme`} className="flex items-center">
        <span className="text-2xl mr-1">🥴</span>
        <span className="text-primary-main font-bold underline">Readme.md</span>
      </Link>
      <a
        className={[classNameMono, 'text-primary-main underline'].join(' ')}
        href="https://www.cibulka.codes"
      >
        {translate('web')}
      </a>
    </footer>
  );
};

export default Footer;
