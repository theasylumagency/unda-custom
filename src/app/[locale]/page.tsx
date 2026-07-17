import { OperatorJourney } from "@/components/custom/OperatorJourney";
import { SiteFooter } from "@/components/custom/site/SiteFooter";
import { TopNavigation } from "@/components/custom/site/TopNavigation";
import type { Locale } from "@/lib/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return (
    <>
      <TopNavigation locale={locale} />
      <main>
        <OperatorJourney locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
