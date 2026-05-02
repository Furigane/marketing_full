"use client";

import { useEffect } from "react";
import { getTextDirection } from "@/lib/text-direction";

type LocaleDocumentAttributesProps = {
  locale: string;
};

export default function LocaleDocumentAttributes({
  locale,
}: LocaleDocumentAttributesProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getTextDirection(locale);
  }, [locale]);

  return null;
}
