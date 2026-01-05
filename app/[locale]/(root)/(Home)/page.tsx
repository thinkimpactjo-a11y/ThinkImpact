import type { Metadata } from "next";

import CounterSection from "@/components/CounterSection";
import VideoSection from "@/components/video-section";
import ConsultingCards from "@/components/ConsultingCards/ConsultingCards";
import { getAllcategories } from "@/app/models/db/lib/services/consulting";
import InteractiveMap from "@/components/mapsection/map-section";
import Poster from "@/components/poster/poster";
import PosterTwo from "@/components/poster/posterTwo";
import { PAGE_METADATA, createMetadata } from "@/lib/constants/metadata";

import { getSettingsData } from "@/app/models/db/lib/services/settings";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/models/db/authOptions";

export const revalidate = 3600;

export const metadata: Metadata = createMetadata(PAGE_METADATA.home);

export default async function Home() {
  const user=  await getServerSession(authOptions)
  console.log("user: ",user);
  
  const categories = await getAllcategories();
  const data = await getSettingsData();

  return (
    <>
      <main className="relative">
        <header className="w-full h-screen">
          <div className="mt-20">
            <VideoSection data={data} />
          </div>
        </header>

        <section className="relative z-10 w-full">
          <CounterSection />
        </section>

        <section className="relative z-10 w-full">
          <Poster data={data} />
        </section>

        <section className="relative  z-10 w-full">
          <InteractiveMap />
        </section>

        <section className="relative z-10 w-full">
          <PosterTwo data={data} />
        </section>

        <section className="bg-white dark:bg-[#020618] py-10">
          <ConsultingCards categories={categories} />
        </section>
      </main>
    </>
  );
}
