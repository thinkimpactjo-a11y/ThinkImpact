import { getBannerData } from "@/app/models/db/lib/services/banners";
import { getAllClients } from "@/app/models/db/lib/services/clients";
import { newBanner } from "@/types";
import type { Metadata } from "next"
import { PAGE_METADATA, createMetadata } from "@/lib/constants/metadata"
export const metadata: Metadata = createMetadata(PAGE_METADATA.about)

import BannerSection from "@/components/banner/BannerSection";
import IntroSection from "@/components/IntroSection/IntroSection";
import MissionVisionValues from "@/components/MissionVisionValues/MissionVisionValues";
import ClientsCarousel from "@/components/ClientsCarousel/ClientsCarousel";
import OurMethodology from "@/components/OurMethodology/OurMethodology";

type Client = {
  id?: string;
  name: string;
  logo: string;
  created_at?: Date;
};

interface PageProps {
  params:Promise< {
    locale: string;
  }>;
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  const banners: newBanner[] = await getBannerData();
  const clients: Client[] = await getAllClients();

  return (
    <>

      <main className="flex flex-col items-center">
        <BannerSection banners={banners} locale={locale} />
        <IntroSection locale={locale} />
        <MissionVisionValues locale={locale} />
        <ClientsCarousel clients={clients} locale={locale} />
        <OurMethodology locale={locale} />
      </main>
    </>
  );
}
