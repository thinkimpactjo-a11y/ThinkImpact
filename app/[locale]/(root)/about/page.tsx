import { getBannerData } from "@/app/models/db/lib/services/banners";
import { getAllClients } from "@/app/models/db/lib/services/clients";
import type { Metadata } from "next";
import { PAGE_METADATA, createMetadata } from "@/lib/constants/metadata";
export const metadata: Metadata = createMetadata(PAGE_METADATA.about);

import BannerSection from "@/components/banner/BannerSection";
import IntroSection from "@/components/IntroSection/IntroSection";
import MissionVisionValues from "@/components/MissionVisionValues/MissionVisionValues";
import ClientsCarousel from "@/components/ClientsCarousel/ClientsCarousel";
import OurMethodology from "@/components/OurMethodology/OurMethodology";
import { getSettingsData } from "@/app/models/db/lib/services/settings";

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  const [banners, clients, settings] = await Promise.all([
    (await getBannerData()).data,
    (await getAllClients()).data,
    (await getSettingsData()).data,
  ]);

  return (
    <>
      <main className="flex flex-col items-center">
        {banners && <BannerSection banners={banners} locale={locale} />}
        {settings && <IntroSection locale={locale} data={settings} />}
        {settings && (
          <MissionVisionValues locale={locale} settings={settings} />
        )}
        {clients && clients.length > 0 ? (
          <ClientsCarousel clients={clients} locale={locale} />
        ) : null}
        {settings && <OurMethodology locale={locale} settings={settings} />}
      </main>
    </>
  );
}
