import { ReactNode } from 'react';

import localizationsDefault from 'src/localization';
import { Locale } from 'src/types';

export type Localizations = Record<Locale, Localization>;

export type Localization = Record<string, LocalizationValue>;

type LocalizationValue =
  | string
  | {
      [key: string]: string | LocalizationValue | LocalizationValuePlural;
    };

type LocalizationValuePlural = {
  zero: string;
  one: string;
  few: string;
  many: string;
};

type LocalizationReplacements = Record<string, string | ReactNode>;

export type Translate = (
  value: string,
  replacements?: LocalizationReplacements,
  count?: number,
  fallback?: string,
  localeForced?: Locale,
  isNoticeIfFallbackPresent?: boolean,
) => string | ReactNode;

function isLocalizationValuePlural(value: any): value is LocalizationValuePlural {
  return (
    value &&
    typeof value.zero === 'string' &&
    typeof value.one === 'string' &&
    typeof value.few === 'string' &&
    typeof value.many === 'string'
  );
}

function getValueByDotNotation(key: string, localization: LocalizationValue) {
  return key.split('.').reduce<LocalizationValue | null>((o, i) => {
    if (!o) return null;
    if (typeof o === 'string') return o;
    return o[i];
  }, localization);
}

function handlePlural(v: LocalizationValuePlural, count: number): string {
  if (count === 0) return v.zero;
  if (count === 1) return v.one;
  if (count > 1 && count < 5) return v.few;
  return v.many;
}

function findLocalizationValue(
  key: string,
  localizationDefault: Localization,
  localizationProvided: Localization | null,
) {
  let value: LocalizationValue | null = null;
  if (localizationProvided) {
    value = getValueByDotNotation(key, localizationProvided);
    if (value) return value;
  }

  value = getValueByDotNotation(key, localizationDefault);
  if (value) return value;

  value = getValueByDotNotation(key.replace('common.', ''), localizationDefault);
  if (value) return value;

  return value;
}

export default function useTranslate(localeCurrent: Locale, localizationsProvided?: Localizations) {
  const translate: Translate = (
    key,
    replacements = {},
    count,
    fallback,
    localeForced,
    isNoticeIfFallbackPresent,
  ) => {
    const locale = localeForced || localeCurrent;

    const localizationValue = findLocalizationValue(
      key,
      localizationsDefault[locale],
      localizationsProvided ? localizationsProvided[locale] : null,
    );
    if (!localizationValue) {
      if (!fallback || isNoticeIfFallbackPresent) {
        console.warn(
          `${key} - not translated`,
          localizationsProvided ? localizationsProvided[locale] : null,
          localizationsDefault[locale],
        );
      }
      return fallback || key;
    }

    const pluralValue = isLocalizationValuePlural(localizationValue) ? localizationValue : null;

    /* Handle plural */
    let valueText: string;
    if (typeof localizationValue === 'string') {
      if (typeof count === 'number') console.warn(`${key} - Not plural.`);
      valueText = localizationValue;
    } else if (pluralValue) {
      if (typeof count !== 'number') {
        console.warn(`${key} - is plural, but no count param provided.`);
        valueText = fallback || key;
      } else {
        valueText = handlePlural(pluralValue, count);
      }
    } else {
      console.warn(`${key} - weird value.`, localizationValue);
      valueText = fallback || key;
    }

    if (!replacements) return valueText;

    /* Replace text replacements */
    Object.keys(replacements).map((key) => {
      const v = replacements[key];
      if (typeof v === 'string') {
        valueText = valueText.replace(`%{${key}}`, v);
      }
    });

    if (Object.values(replacements).filter((r) => typeof r !== 'string').length === 0) {
      return valueText;
    }

    /* Replace ReactNodes */
    let result: (string | ReactNode)[] = [valueText];
    for (let i = 0; i < Object.keys(replacements).length; i += 1) {
      const k = Object.keys(replacements)[i];
      const v = replacements[k];
      if (typeof v === 'string') continue;
      result = result
        .map((part) => {
          if (typeof part !== 'string') return part;
          const key = `%{${k}}`;
          if (!part.includes(k)) return part;
          const split = part.split(k);
          return [split[0], replacements[key], split[1]].filter(Boolean);
        })
        .flat();
    }

    return result;
  };
  return translate;
}
