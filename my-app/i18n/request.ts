import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
import {
  deepMergeTranslationValue,
  getTranslationOverrideStore,
} from '@/lib/site-translation-runtime';
 
export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const [messagesModule, overrides] = await Promise.all([
    import(`../messages/${locale}.json`),
    getTranslationOverrideStore(),
  ]);

  const baseMessages = messagesModule.default as Record<string, unknown>;
  const overrideMessages = overrides.messages[locale] ?? {};
  const mergedMessages = Object.fromEntries(
    [...new Set([...Object.keys(baseMessages), ...Object.keys(overrideMessages)])].map(
      (namespace) => {
        const baseValue = baseMessages[namespace];
        return [
          namespace,
          baseValue === undefined
            ? overrideMessages[namespace]
            : deepMergeTranslationValue(
                baseValue as Record<string, unknown>,
                overrideMessages[namespace]
              ),
        ];
      }
    )
  );
 
  return {
    locale,
    messages: mergedMessages,
  };
});
