import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import config from 'config';
import getLocaleFromHeader from 'src/helpers/getLocaleFromHeaders';
import { createUrl } from 'src/helpers/url';

const ALLOWED_EXT = [
  'css',
  'ico',
  'jpg',
  'png',
  'jpeg',
  'webm',
  'gif',
  'ico',
  'tiff',
  'pdf',
  'xml',
  'rar',
  'zip',
  'woff2',
  'js',
  'json',
  'svg',
];

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const localeFromHeader = getLocaleFromHeader(request.headers.get('accept-language'));
  const pathSplit = url.split('/').filter(Boolean);
  const ext = url.split('.').pop();

  // Skip <= File in public folder
  if (ext && ALLOWED_EXT.includes(ext)) {
    console.log('skipped ext', url);
    return NextResponse.next();
  }
  // Skip <= API route
  if (pathSplit[0] === 'api') return NextResponse.next();
  // Skip <= Build file
  if (pathSplit[0] === '_next') return NextResponse.next();

  /* / => /LOCALE */
  if (request.nextUrl.pathname === '/') {
    console.log(`/ => /${localeFromHeader}`);
    return NextResponse.redirect(new URL(`/${localeFromHeader}`, request.url));
  }

  /* /article => /LOCALE/article */
  const isPathWithLocale = config.locales.includes(pathSplit[0]);
  if (!isPathWithLocale) {
    const newUrl = createUrl(localeFromHeader, url);
    console.log(`${url} => /${newUrl}`);
    return NextResponse.redirect(new URL(`/${newUrl}`, request.url));
  }

  return NextResponse.next();
}
