import type { Metadata } from "next";
import { env } from "process";

export const AppName = env.NEXT_PUBLIC_APP_NAME || "Think Impact";

export const APP_DESCRIPTION =env.NEXT_PUBLIC_APP_DESCRIPTION
;

const SERVER_URL = env.NEXT_PUBLIC_APP_URL || "http://thinkimpactjo.com";

// Common keywords that appear across multiple pages
export const COMMON_KEYWORDS = [
  "Thinkimpact",
  "استشارات أعمال",
  "business consulting",
  "استشارات إدارية",
  "management consulting",
  "استشارات استراتيجية",
  "strategy consulting",
  "مراقبة الأداء",
  "performance monitoring",
  "تحليل السوق",
  "market analysis",
  "تحسين العمليات",
  "process improvement",
  "التحول الرقمي",
  "digital transformation",
  "نمو الشركات",
  "business growth",
  "استشارات مالية",
  "financial consulting",
  "إدارة المشاريع",
  "project management",
  "استشارات المخاطر",
  "risk management",
  "استشارات الاستدامة",
  "sustainability consulting",
  "استشارات الموارد البشرية",
  "HR consulting",
  "رؤى استراتيجية",
  "strategic insights",
  "شريك استشاري موثوق",
  "trusted consulting partner",
  "خدمات استشارية في منطقة مينا",
  "consulting services in MENA",
  "شركة استشارات في الشرق الأوسط",
  "consulting firm in the Middle East",
  "استشارات مينا",
  "MENA consulting",
  "استشارات الخليج",
  "GCC consulting",
  "Middle East consulting services",
] as const;

// Page-specific metadata configurations
export const PAGE_METADATA: Record<string, Metadata> = {
  home: {
    title: "Think Impact - Consulting, Monitoring & Professional Training | MENA",
    description:
      "Think Impact provides trusted consulting, performance monitoring, and professional training services to empower organizations across the MENA region.",
    keywords: COMMON_KEYWORDS.join(", "),
    openGraph: {
      title: "Think Impact - Consulting & Training",
      description:
        "Think Impact provides trusted consulting, performance monitoring, and professional training services across the MENA region.",
      type: "website",
      images: [
        { url: "/images/home-og.jpg", width: 1200, height: 630, alt: "Think Impact Home" },
      ],
    },
  },

  about: {
    title: "About Think Impact - Research, Evaluation & Development Consulting",
    description:
      "Think Impact Co. is a multidisciplinary consulting and training firm in Amman, Jordan, specializing in research, evaluation, and MEL frameworks for development and humanitarian programs.",
    keywords: [...COMMON_KEYWORDS, "About Think Impact", "development consulting", "humanitarian consulting"].join(", "),
    openGraph: {
      title: "About Think Impact",
      description:
        "A multidisciplinary consulting and training firm in Jordan specializing in research, evaluation, and MEL frameworks.",
      type: "website",
      images: [
        { url: "/images/about-og.jpg", width: 1200, height: 630, alt: "About Think Impact" },
      ],
    },
  },

  ourTeam: {
    title: "Our Team - Think Impact | Experts in Research & Development",
    description:
      "Meet the Think Impact team — a group of dedicated consultants, researchers, and trainers based in Amman, Jordan, specializing in development and humanitarian projects.",
    keywords: [...COMMON_KEYWORDS, "Think Impact team", "consulting team", "research team Jordan"].join(", "),
    openGraph: {
      title: "Our Team - Think Impact",
      description:
        "Meet our multidisciplinary experts focusing on research, evaluation, and MEL frameworks for sustainable impact in MENA.",
      type: "website",
      images: [
        { url: "/images/team-og.jpg", width: 1200, height: 630, alt: "Think Impact Team" },
      ],
    },
  },

  joinOurTeam: {
    title: "Join Our Team - Think Impact | Careers in Consulting & Development",
    description:
      "Join Think Impact and be part of a multidisciplinary team driving sustainable development and humanitarian impact across the MENA region.",
    keywords: [...COMMON_KEYWORDS, "Think Impact careers", "join our team", "careers in consulting"].join(", "),
    openGraph: {
      title: "Careers at Think Impact",
      description:
        "Explore career opportunities at Think Impact and contribute to development and humanitarian impact in the MENA region.",
      type: "website",
      images: [
        { url: "/images/careers-og.jpg", width: 1200, height: 630, alt: "Think Impact Careers" },
      ],
    },
  },
};

// Dynamic metadata generators for Think Impact
export const generateDynamicMetadata = {
  page: (page: {
    type: "consulting" | "training";
    name: string;
    description?: string;
    slug: string;
    parent?: string;
  }): Metadata => {
    const defaultDescriptions: Record<string, string> = {
      consulting: `Explore ${page.name} consulting services by Think Impact in MENA region.`,
      training: `Discover ${page.name} training programs by Think Impact for professional growth.`,
    };

    const description = page.description || defaultDescriptions[page.type];

    const keywords: string[] = [
      "Think Impact",
      page.name,
      `${page.name} ${page.type}`,
      page.type === "consulting" ? "development consulting" : "professional training",
      "MENA region",
      "Jordan",
      "sustainable development",
      "humanitarian programs",
    ];

    if (page.type === "consulting") {
      keywords.push(
        "استشارات أعمال",
        "استشارات إدارية",
        "استشارات استراتيجية",
        "خدمات استشارية في منطقة مينا",
        "شركة استشارات في الشرق الأوسط"
      );
    } else {
      keywords.push(
        "تدريب احترافي",
        "برامج تدريبية",
        "تطوير مهارات",
        "التنمية المستدامة",
        "برامج إنسانية"
      );
    }

    return {
      title: `${page.name} | ${page.type === "consulting" ? "Consulting" : "Training"} - Think Impact`,
      description,
      keywords: keywords.join(", "),
      openGraph: {
        title: `${page.name} | Think Impact`,
        description,
        type: "website",
        siteName: "Think Impact",
        images: [
          { url: `/images/${page.slug}-og.jpg`, width: 1200, height: 630, alt: page.name },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${page.name} | Think Impact`,
        description,
        images: [`/images/${page.slug}-og.jpg`],
      },
    };
  },
};

// Base metadata configuration
export const baseMetadata: Metadata = {
  metadataBase: new URL(SERVER_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Think Impact",
    images: [{ url: "/images/base-og.jpg", width: 1200, height: 630, alt: "Think Impact" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ThinkImpact",
    creator: "@ThinkImpact",
    images: ["/images/base-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: {
    google: "PUT-YOUR-GOOGLE-VERIFICATION-CODE-HERE",
  },
};

// Helper to merge metadata
export const createMetadata = (pageMetadata: Metadata): Metadata => {
  const merged: Metadata = { ...baseMetadata, ...pageMetadata };
  if (merged.openGraph) {
    merged.openGraph = { ...merged.openGraph, siteName: "Think Impact" };
  }
  return merged;
};

export const ROOT_METADATA: Metadata = {
    title: { default: AppName, template: `%s - ${AppName}` },
    description: APP_DESCRIPTION,
    metadataBase: new URL(SERVER_URL),
    icons: {
      icon: "/favicon.ico",           
      shortcut: "/favicon.ico", 
      apple: "/favicon.ico", 
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      title: AppName,
      description: APP_DESCRIPTION,
      siteName: "Think Impact",
      url: SERVER_URL,
      images: [{ url: "/logo-open-graph.png", width: 1200, height: 630, alt: "Think Impact" }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ThinkImpact",
      creator: "@ThinkImpact",
      title: AppName,
      description: APP_DESCRIPTION,
      images: ["logo-Twitter.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
  