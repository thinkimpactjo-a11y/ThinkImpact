import Footer from "@/components/ui/footer";
import Header from "@/components/header";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

import { getAllcategories } from "@/app/models/db/lib/services/consulting";
import { getAllTraining } from "@/app/models/db/lib/services/training";

import { ThemeProvider } from "next-themes";
import FontSwitcher from "@/components/fontswitcher/FontSwitcher";

type Props = {
  children: React.ReactNode;
  // params prop هنا عبارة عن Promise اللي تحل للـ object المطلوب
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const resolvedParams = await params; // استخرج الـ params من الـ Promise
  const { locale } = resolvedParams;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`../../../messages/${locale}.json`)).default;
 const dir = locale === "ar" ? "rtl" : "ltr";
  const [categories, trainingData] = await Promise.all([
    getAllcategories(),
    getAllTraining(),
  ]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <FontSwitcher locale={locale}>
          <div dir={dir} className="flex flex-col min-h-screen ">
            <section
              aria-label="Header"
              className="fixed w-full top-0 left-0 right-0 backdrop-blur-sm z-50 bg-white dark:bg-[#020618]"
            >
              <Header  locale={locale} />
            </section>

            <main className="flex-1">{children}</main>

            <Footer
              categories={categories}
              trainingData={trainingData}
              locale={locale}
            />
          </div>
        </FontSwitcher>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
