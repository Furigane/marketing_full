const RTL_LOCALES = new Set(["he", "fa", "ur"]);
const LTR_ONLY_LOCALE_ALIASES = new Set(["hy", "am", "armenian", "arm", "ar"]);

function normalizeDirectionLocale(locale: string) {
  return locale.trim().toLowerCase().split("-")[0];
}

export function getTextDirection(locale: string) {
  const normalizedLocale = normalizeDirectionLocale(locale);

  if (LTR_ONLY_LOCALE_ALIASES.has(normalizedLocale)) {
    return "ltr";
  }

  return RTL_LOCALES.has(normalizedLocale) ? "rtl" : "ltr";
}
