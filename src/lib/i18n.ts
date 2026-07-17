export const locales = ["en", "ka"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getRequestCountry(request: Request): string | null {
  const headers = request.headers;
  const country =
    headers.get("x-vercel-ip-country") ??
    headers.get("cf-ipcountry") ??
    headers.get("cloudfront-viewer-country") ??
    headers.get("x-country-code");

  return country?.trim().toUpperCase() || null;
}

export function getBrowserLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const languages = acceptLanguage
    .split(",")
    .map((part) => part.trim().split(";")[0]?.toLowerCase())
    .filter(Boolean);

  return languages.some((language) => language === "ka" || language?.startsWith("ka-"))
    ? "ka"
    : defaultLocale;
}
