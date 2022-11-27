import config from 'config';

const LOCALE_DEFAULT = config.locales[0];

export default function getLocaleFromHeader(h: string | null) {
  if (!h) return LOCALE_DEFAULT;

  const [localeCodePrefered, ...localesWithScores] = h.split(';');

  const localePrefered = localeCodePrefered.split(',')[0].split('-')[0];
  if (config.locales.includes(localePrefered)) return localePrefered;

  const locales = localesWithScores.map((localeWithScore) => localeWithScore.split(',')[1]);
  const localeBest = locales.find((l) => config.locales.includes(l));

  return localeBest || LOCALE_DEFAULT;
}
