export interface Post {
  title: string;
  slug: string;
  href: string;
  content: string;
}

const locales = ['cs', 'en', 'ua'] as const;
export type Locale = typeof locales[number];
