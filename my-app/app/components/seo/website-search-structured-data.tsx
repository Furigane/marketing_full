import { headers } from "next/headers";

import { getLocalizedPath } from "@/lib/seo";

function getSiteOrigin(headerList: Headers) {
  const forwardedProto = headerList.get("x-forwarded-proto");
  const forwardedHost = headerList.get("x-forwarded-host");
  const host = forwardedHost ?? headerList.get("host");

  if (!host) {
    return process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? "http://localhost:4000";
  }

  return `${forwardedProto ?? "https"}://${host}`;
}

export default async function WebsiteSearchStructuredData({
  locale,
}: {
  locale: string;
}) {
  const headerList = await headers();
  const origin = getSiteOrigin(headerList);
  const websiteUrl = `${origin}${getLocalizedPath(locale, "/")}`;
  const searchUrlTemplate = `${origin}${getLocalizedPath(locale, "/search")}?q={search_term_string}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Creative Group",
    url: websiteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: searchUrlTemplate,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
