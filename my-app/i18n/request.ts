import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
import { getTranslationOverrideStore } from '@/lib/site-translation-runtime';
 
export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const [messagesModule, overrides] = await Promise.all([
    import(`../messages/${locale}.json`),
    getTranslationOverrideStore(),
  ]);
 
  return {
    locale,
    messages: {
      ...messagesModule.default,
      ...overrides.messages[locale],
    }
  };
});
