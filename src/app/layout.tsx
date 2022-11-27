import { ReactNode } from 'react';

import { classNameSans } from 'src/helpers/getFontClassName';

import 'src/styles/globals.css';

export default function Layout(props: { children: ReactNode }) {
  return (
    <html className={classNameSans}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="app">{props.children}</div>
      </body>
    </html>
  );
}
