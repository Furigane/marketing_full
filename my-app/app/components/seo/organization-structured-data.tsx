import { getSiteOrigin, getLocalizedPath } from "@/lib/seo";

export default function OrganizationStructuredData({
  locale,
}: {
  locale: string;
}) {
  const origin = getSiteOrigin();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Creative Group",
    url: `${origin}${getLocalizedPath(locale, "/")}`,
    logo: `${origin}/svg/logo.svg`,
    email: "mailmailmy@gmail.com",
    sameAs: [
      "https://instagram.com",
      "https://t.me",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "mailmailmy@gmail.com",
        availableLanguage: ["ru", "en", "fr", "de", "ar"],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
