import { newBanner } from "@/types";
import { Banner } from "@/components/banner/banner";

type Props = {
  banners: newBanner[];
  locale: string;
};

export default function BannerSection({ banners, locale }: Props) {
  return <Banner banners={banners} locale={locale} />;
}
