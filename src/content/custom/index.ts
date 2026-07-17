import type { Locale } from "@/lib/i18n";
import { en } from "./en";
import { ka } from "./ka";
import type { CustomContent } from "./types";

export const customContent: Record<Locale, CustomContent> = { en, ka };

export function getCustomContent(locale: Locale) {
  return customContent[locale];
}

export type { CustomContent } from "./types";
