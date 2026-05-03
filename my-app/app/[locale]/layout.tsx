import {NextIntlClientProvider, hasLocale} from "next-intl";
import {getMessages} from "next-intl/server";
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";
import LocaleDocumentAttributes from "@/app/components/i18n/locale-document-attributes";
import OrganizationStructuredData from "@/app/components/seo/organization-structured-data";
import WebsiteSearchStructuredData from "@/app/components/seo/website-search-structured-data";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({locale});

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleDocumentAttributes locale={locale} />
      <OrganizationStructuredData locale={locale} />
      <WebsiteSearchStructuredData locale={locale} />
      {children}
    </NextIntlClientProvider>
  );
}
