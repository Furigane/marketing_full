import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";

import { getDocumentDirection, getDocumentLocale, getSiteOrigin, SITE_NAME } from "@/lib/seo";

import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Marketing services, specialists, case studies, and SEO-focused business content.",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const locale = getDocumentLocale(headerList.get("x-current-locale"));
  const direction = getDocumentDirection(locale);

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
