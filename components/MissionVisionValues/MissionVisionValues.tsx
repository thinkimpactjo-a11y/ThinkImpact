import { newSetting } from "@/types";
import { FaBullseye, FaEye, FaHeart } from "react-icons/fa";

type Props = {
  locale: string;
  settings: newSetting[];
};

export default function MissionVisionValues({ locale, settings }: Props) {
  /* English And Arabic Vision */
  const englishVisionDescription = settings.find(
    (ele) => ele.key_name_en === "vision_in_about"
  )?.value_en;

  const arabicVisionDescription = settings.find(
    (ele) => ele.key_name_en === "vision_in_about"
  )?.value_ar;

  /* English And Arabic Mission */
  const englishMissionDescription = settings.find(
    (ele) => ele.key_name_en === "mission_in_about"
  )?.value_en;

  const arabicMissionDescription = settings.find(
    (ele) => ele.key_name_en === "mission_in_about"
  )?.value_ar;

  /* English And Arabic Values */
  const englishValueOneDescription = settings.find(
    (ele) => ele.key_name_en === "value_one_in_about"
  )?.value_en;

  const arabicValueOneDescription = settings.find(
    (ele) => ele.key_name_en === "value_one_in_about"
  )?.value_ar;

  const englishValueTwoDescription = settings.find(
    (ele) => ele.key_name_en === "value_two_in_about"
  )?.value_en;

  const arabicValueTwoDescription = settings.find(
    (ele) => ele.key_name_en === "value_two_in_about"
  )?.value_ar;

  const englishValueThreeDescription = settings.find(
    (ele) => ele.key_name_en === "value_three_in_about"
  )?.value_en;

  const arabicValueThreeDescription = settings.find(
    (ele) => ele.key_name_en === "value_three_in_about"
  )?.value_ar;

  const isArabic = locale === "ar";

  const mission = {
    title_en: "Our Mission",
    title_ar: "رسالتنا",
    icon: <FaBullseye className="text-white text-3xl" />,
    description_en: englishMissionDescription,
    description_ar: arabicMissionDescription,
    from: "from-[#125892]",
    to: "to-[#1F6AA5]",
    center: false,
  };

  const vision = {
    title_en: "Our Vision",
    title_ar: "رؤيتنا",
    icon: <FaEye className="text-white text-3xl" />,
    description_en: englishVisionDescription,
    description_ar: arabicVisionDescription,
    from: "from-[#0A3556]",
    to: "to-[#0F4C75]",
    center: true,
  };

  const values = [
    {
      title_en: "Our Values",
      title_ar: "قيمنا",
      icon: <FaHeart className="text-white text-3xl" />,
      description_en: englishValueOneDescription,
      description_ar: arabicValueOneDescription,
      from: "from-[#1B4F72]",
      to: "to-[#2E86C1]",
    },
    {
      title_en: "Our Values",
      title_ar: "قيمنا",
      icon: <FaHeart className="text-white text-3xl" />,
      description_en: englishValueTwoDescription,
      description_ar: arabicValueTwoDescription,
      from: "from-[#1B4F72]",
      to: "to-[#2E86C1]",
       center: true,
    },
    {
      title_en: "Our Values",
      title_ar: "قيمنا",
      icon: <FaHeart className="text-white text-3xl" />,
      description_en: englishValueThreeDescription,
      description_ar: arabicValueThreeDescription,
      from: "from-[#1B4F72]",
      to: "to-[#2E86C1]",
    },
  ];

  return (
    <section
      className="py-20 px-6 md:px-12 bg-gray-50 dark:bg-gray-900 w-full"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <h2 className=" text-3xl md:text-4xl centert font-bold text-center text-[#125892] mb-16">
      {isArabic ? "الرسالة، الرؤية والقيم" : " Mission, Vision & Values"} 
      </h2>

      {/* FIRST ROW — Mission + Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-6 md:mb-16">
        {[mission, vision].map((item, index) => (
          <div
            key={index}
            className={`p-8 rounded-xl bg-gradient-to-br ${item.from} ${item.to}
              text-white shadow-xl transform transition duration-300
              flex flex-col items-center text-center cursor-pointer
              ${
                item.center
                  ? "hover:scale-105 hover:shadow-2xl"
                  : "hover:scale-105 hover:shadow-xl"
              }`}
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 mb-4">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">
              {isArabic ? item.title_ar : item.title_en}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed">
              {isArabic ? item.description_ar : item.description_en}
            </p>
          </div>
        ))}
      </div>

      {/* SECOND ROW — 3 Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {values.map((item, index) => (
          <div
            key={index}
            className={`p-8 rounded-xl bg-gradient-to-br ${item.from} ${item.to}
              text-white shadow-xl transform transition duration-300
              flex flex-col items-center text-center cursor-pointer
               ${
                item.center
                  ? "md:scale-105 md:-translate-y-4 hover:scale-110 hover:shadow-2xl"
                  : "hover:scale-105 hover:shadow-xl"
              }
              hover:scale-105 hover:shadow-xl`}
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 mb-4">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">
              {isArabic ? item.title_ar : item.title_en}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed">
              {isArabic ? item.description_ar : item.description_en}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
