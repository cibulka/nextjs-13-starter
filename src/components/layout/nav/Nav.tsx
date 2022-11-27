'use client';
import React from 'react';
import Link from 'next/link';

import config from 'config';

import useTranslate from 'src/hooks/useTranslate';
import { Locale } from 'src/types';

import NavLocaleLink from './components/NavLocaleLink';

const Nav = (props: { locale: Locale }) => {
  const translate = useTranslate(props.locale);
  return (
    <nav className="flex justify-between p-4">
      <h1>
        <Link href={`/${props.locale}`} className="flex items-center">
          <span className="text-2xl mr-1">💀</span>
          <span className="font-bold">{translate('appName')}</span>
        </Link>
      </h1>
      <ul className="flex items-center gap-4">
        {config.locales.map((locale) => (
          <li key={locale}>
            <NavLocaleLink locale={props.locale} localeNew={locale} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
