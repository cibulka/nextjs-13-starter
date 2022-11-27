'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLocaleLink = (props: { locale: string; localeNew: string }) => {
  const pathname = usePathname();

  const localePathname = pathname
    ? pathname.replace(`/${props.locale}`, `/${props.localeNew}`)
    : `/${props.localeNew}`;

  let label;
  switch (props.localeNew) {
    case 'cs':
      label = '🇨🇿';
      break;
    case 'en':
      label = '🇬🇧';
      break;
    case 'ua':
      label = '🇺🇦';
      break;
    default:
      throw new Error(`Unknown locale ${props.locale}`);
  }

  return (
    <Link href={localePathname} className="text-2xl">
      {label}
    </Link>
  );
};

export default NavLocaleLink;
