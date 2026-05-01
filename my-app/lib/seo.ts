export function isRussianLocale(locale: string) {
  return locale.toLowerCase().startsWith("ru");
}

export function clampMeta(value: string, maxLength: number) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }

  const sliced = normalized.slice(0, maxLength).trim();
  const lastSpace = sliced.lastIndexOf(" ");
  return (lastSpace > 30 ? sliced.slice(0, lastSpace) : sliced).trim();
}

export function buildMetaTitle(title: string, suffix?: string) {
  return clampMeta(suffix ? `${title} | ${suffix}` : title, 60);
}

export function buildMetaDescription(description: string) {
  return clampMeta(description, 155);
}
