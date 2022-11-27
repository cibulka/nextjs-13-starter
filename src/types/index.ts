export interface Post {
  title: string;
  slug: string;
  href: string;
  content: string;
}

const locales = ['cs', 'en', 'ua'] as const;
export type Locale = typeof locales[number];

interface _PageProps<T> {
  params: T & {
    locale: Locale;
  };
}
export type PageProps = _PageProps<{}>;
export type PagePostProps = _PageProps<{ slug: string }>;
