"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/images/whitelogo.png";
import type { newCategory, newTraining } from "@/types";
import { Mail, Phone } from "lucide-react";
import { SiFacebook, SiLinkedin, SiYoutube, SiInstagram,SiX } from "react-icons/si";
type Props = {
  categories: newCategory[];
  trainingData: newTraining[];
  locale: string;
};

export default function Footer({ categories, trainingData, locale }: Props) {
  const isArabic = locale === "ar";

  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@example.com";
  const contactPhone =
    process.env.NEXT_PUBLIC_CONTACT_PHONE || "+962-0000-0000";
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || "#";
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || "#";
  const twitterUrl = process.env.NEXT_PUBLIC_TWITTER_URL || "#";
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL || "#";
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#";
  const nurembergUrl = process.env.NEXT_PUBLIC_NUREMBERG_URL || "#";

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="relative mt-16 bg-[#125892] text-white z-40"
    >
      <svg
        className="absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-[#125892]"
        preserveAspectRatio="none"
        viewBox="0 0 1440 54"
      >
        <path
          fill="currentColor"
          d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
        />
      </svg>

      <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 bg-[#125892]">
        <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
          <div className="md:max-w-md lg:col-span-2">
            <Link href="/" className="inline-flex items-center">
              <Image src={Logo} alt="logo" width={40} height={40} />
              <span className="ml-2 text-xl font-bold tracking-wide uppercase">
                Think Impact
              </span>
            </Link>
            <div className="mt-4 lg:max-w-sm">
              <p className="text-sm">
                {isArabic
                  ? "نكشف الوضوح وسط التعقيد — ونقدّم رؤى موثوقة وحلولًا مخصصة لتمهيد طريقك نحو المستقبل."
                  : "We uncover clarity within complexity—delivering trusted insights and tailored solutions to guide your path forward."}
              </p>
              <p className="mt-4 text-sm">
                {isArabic
                  ? "رؤيتك وخبرتنا — معًا نصنع الأثر."
                  : "Your vision, our expertise — together, we create impact."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
            <div>
              <p className="font-semibold tracking-wide text-white">
                {isArabic ? "الاستشارات" : "Consulting"}
              </p>
              <ul className="mt-2 space-y-2">
                {(categories || []).map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/Consulting/${item.slug}`}
                      className="transition-colors duration-300 text-white hover:text-gray-300"
                    >
                      {isArabic ? item.category_name_ar : item.category_name_en}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-semibold tracking-wide text-white">
                {isArabic ? "التدريب" : "Training"}
              </p>
              <ul className="mt-2 space-y-2">
                {(trainingData || []).map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/Training/${item.id}`}
                      className="transition-colors duration-300 text-white hover:text-gray-300"
                    >
                      {isArabic ? item.name_ar : item.name_en}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-semibold tracking-wide text-white">
                {isArabic ? "روابط مهمة" : "Quick Links"}
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="transition-colors duration-300 text-white hover:text-gray-300"
                  >
                    {isArabic ? "من نحن" : "About"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ourTeam"
                    className="transition-colors duration-300 text-white hover:text-gray-300"
                  >
                    {isArabic ? "فريق العمل" : "Our Team"}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold tracking-wide text-white">
                {isArabic ? "تواصل معنا" : "Contact Us"}
              </p>
              <ul className="mt-3 space-y-3 text-sm">
                <li className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Mail size={20} className="text-white flex-shrink-0" />
                  <a
                    href={`mailto:${contactEmail}`}
                    className="hover:text-gray-300 transition-colors text-sm"
                  >
                    {contactEmail}
                  </a>
                </li>

                <li className="flex items-center gap-2">
                  <Phone size={20} />
                  <a
                    href={`tel:${contactPhone}`}
                    className="hover:text-gray-300 transition-colors"
                  >
                    {contactPhone}
                  </a>
                </li>
                <li className="flex items-center gap-3 mt-3">
                  <Link
                    href={facebookUrl}
                    target="_blank"
                    className="hover:text-gray-300 transition-colors"
                  >
                    <SiFacebook size={27} />
                  </Link>
                  <Link
                    href={instagramUrl}
                    target="_blank"
                    className="hover:text-gray-300 transition-colors"
                  >
                    <SiInstagram size={27} />
                  </Link>
                  <Link
                    href={linkedinUrl}
                    target="_blank"
                    className="hover:text-gray-300 transition-colors"
                  >
                    <SiLinkedin size={27} />
                  </Link>

                  <Link
                    href={twitterUrl}
                    target="_blank"
                    className="hover:text-gray-300 transition-colors"
                  >
                     <SiX size={27} />
                  </Link>
                  <Link
                    href={youtubeUrl}
                    target="_blank"
                    className="hover:text-gray-300 transition-colors"
                  >
                    <SiYoutube size={27} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

       
          <div className=" text-center  pt-5 pb-10 border-t border-white/20 sm:flex-row ">
            <p className="text-sm text-white">
              {isArabic ? (
                <>
                  © 2025 Think Impact. جميع الحقوق محفوظة. تم الإنشاء بواسطة{" "}
                  <a
                    href={nurembergUrl}
                    target="_blank"
                    className="underline hover:text-gray-300"
                  >
                    Nuremberg Group
                  </a>
                  .
                </>
              ) : (
                <>
                  © 2025 Think Impact. All rights reserved. Made by{" "}
                  <a
                    href={nurembergUrl}
                    target="_blank"
                    className="underline hover:text-gray-300"
                  >
                    Nuremberg Group
                  </a>
                  .
                </>
              )}
            </p>
          </div>

         
        </div>
    </div>
  );
}
