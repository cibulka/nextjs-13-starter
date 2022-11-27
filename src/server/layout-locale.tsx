import React, { ReactNode } from 'react';

import Footer from 'src/components/layout/footer/Footer';
import Nav from 'src/components/layout/nav/Nav';
import { Locale } from 'src/types';

const LayoutLocale = (props: { children: ReactNode; locale: Locale }) => (
  <>
    <Nav locale={props.locale} />
    <div className="flex flex-col flex-1 items-center w-full">
      <div className="flex-1" />
      {props.children}
      <div className="flex-1" />
      <div className="flex-1" />
    </div>
    <Footer locale={props.locale} />
  </>
);

export default LayoutLocale;
