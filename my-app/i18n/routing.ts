import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ru" , "fr", "ar", "de"],
  defaultLocale: "ru",
  localePrefix: "always",
  localeDetection: true,
  // routingStrategy: "hash",
  // directory: "app/i18n",
  // path: "app/i18n",
  // localeDetection: false,
});

