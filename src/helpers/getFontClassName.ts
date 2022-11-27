import { Inconsolata, Open_Sans } from '@next/font/google';

const sans = Open_Sans({
  style: ['normal', 'italic'],
});

const mono = Inconsolata();

export const classNameSans = sans.className;

export const classNameMono = mono.className;
