"use client";

import React from "react";
import { newMember } from "@/types";
import { useLocale } from "next-intl";

import MainMemberCard from "./MainMemberCard";
import OtherMemberCard from "./OtherMemberCard";

type Props = {
  members: newMember[];
};

export default function OurTeamPage({ members }: Props) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const mainMembers = members.filter((member) => member.main === true);
  const otherMembers = members.filter((member) => member.main !== true);

  const title = isArabic ? "فريقنا" : "Our Team";

  return (
    <main className="max-w-[1380px] mx-auto my-16 px-6 md:px-12 mt-20">
      {/* Page Title */}
      <h1
        className={`text-4xl md:text-6xl centert font-extrabold text-center text-[#125892] mb-6 leading-tight ${
          isArabic ? "font-almarai" : ""
        }`}
      >
        {title}
      </h1>

      <p className=" text-center text-lg  mb-10">
        {isArabic
          ? "يجمع فريقنا بين خبرات واسعة في التنمية الدولية والمساعدات الإنسانية والمتابعة والتقييم وإدارة المؤسسات. نحن ملتزمون بتقديم حلول مؤثرة وتحقيق تغيير إيجابي في المجتمعات."
          : "Our team brings together expertise in international development, humanitarian assistance, monitoring & evaluation, and organizational management. We are committed to delivering impactful solutions and driving positive change across communities."}
      </p>

      {/* Main Members Section */}
      {mainMembers.length > 0 && (
        <section className="mb-24">
          <h2
            className={`text-2xl centert md:text-4xl font-semibold mb-10 text-center text-[#125892] ${
              isArabic ? "font-almarai" : ""
            }`}
          >
            {isArabic ? "فريق المؤسسين" : "Founding Team"}
          </h2>

          <div className="flex flex-wrap justify-center gap-8">
            {mainMembers.map((member) => (
              <MainMemberCard key={member.id} member={member} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {/* Other Members Section */}
      {otherMembers.length > 0 && (
        <section>
          <h2
            className={`text-2xl centert md:text-4xl font-semibold mb-10 text-center text-[#125892] ${
              isArabic ? "font-almarai" : ""
            }`}
          >
            {isArabic ? "مستشارونا" : "Our Consultants"}
          </h2>

          {/* Use a centered, wrapping flex container.
              Each card is wrapped in a div that controls its width.
              On small screens cards are full width (one per row).
              On md+ they get a fixed width so wrapping + justify-center centers them. */}
         <div className="flex flex-wrap justify-center gap-10">
  {otherMembers.map((member) => (
    <div
      key={member.id}
      className="w-full md:w-[300px] lg:w-[320px] flex justify-center"
    >
      <OtherMemberCard member={member} locale={locale} />
    </div>
  ))}
</div>

        </section>
      )}
    </main>
  );
}