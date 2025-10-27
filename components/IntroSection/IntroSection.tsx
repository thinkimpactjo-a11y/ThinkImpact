import { getSettingsData } from "@/app/models/db/lib/services/settings";
type Props = {
  locale: string;
};
export default async function IntroSection({locale}:Props) {
  const isArabic= locale==="ar"
  const data= await getSettingsData()
  const aboutText= data.find((ele,i)=>{
    return ele.key_name_en==="about_page_text"
  })

    return (
      <section className="w-3/4 text-center mt-10" dir={isArabic ? "rtl" : "ltr"}>
        <p className="text-gray-700 leading-relaxed text-justify md:text-2xl sm:text-sm mb-16 mt-10 dark:text-white">
           {isArabic? aboutText?.value_ar:aboutText?.value_en}
        </p>
      </section>
    );
  }
  