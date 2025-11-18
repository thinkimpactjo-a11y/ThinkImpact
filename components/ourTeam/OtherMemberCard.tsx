import React from "react";
import { newMember } from "@/types";
import MemberDialog from "./MemberDialog";
import Image from "next/image";

type Props = {
  member: newMember;
  locale: string;
};

export default function OtherMemberCard({ member, locale }: Props) {
  const isArabic = locale === "ar";

  const name = isArabic ? member.name_ar : member.name_en;
  const position = isArabic ? member.position_ar : member.position_en;
  const description = isArabic
    ? member.description_ar || ""
    : member.description_en || "";

  const shortDesc =
    description.length > 150 ? description.slice(0, 150) + "..." : description;
  const hasLongDesc = description.length > 150;

  return (
    <div
      className="flex flex-col items-center text-center bg-gray-100 dark:bg-gray-700  border border-gray-200 rounded-2xl 
                 shadow-sm p-5 w-full  sm:w-[280px] md:w-[300px] lg:w-[320px] 
                 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 cursor-pointer"
    >
      {/* Profile Image */}
      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-md border-2 border-[#125892] mb-4">
       
          <Image  src={member.image}
          alt={name}
          width={400} height={400}
          className="w-full h-full object-cover"/>
      
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-center  px-2">
        <p className="text-lg md:text-xl font-semibold text-[#125892] mb-1 ">
          {name}
        </p>
        <p className="text-gray-600 text-sm md:text-base mb-3 dark:text-gray-200">{position}</p>
        <p className="text-gray-500 text-sm md:text-[15px] leading-snug max-w-xs dark:text-gray-200">
          {shortDesc}{" "}
          {hasLongDesc && <MemberDialog member={member} locale={locale} />}
        </p>
      </div>
    </div>
  );
}