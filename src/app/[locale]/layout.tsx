import { ReactNode } from 'react';

import config from 'config';
import { classNameSans } from 'src/helpers/getFontClassName';

import 'src/styles/globals.css';
import { Locale } from 'src/types';

export function generateStaticParams() {
  return config.locales.map((locale) => ({ locale }));
}

export default function Layout(props: { children: ReactNode; params: { locale: Locale } }) {
  return (
    <html className={classNameSans} lang={props.params.locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="app">{props.children}</div>
      </body>
    </html>
  );
}
