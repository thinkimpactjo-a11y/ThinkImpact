import type { Metadata } from "next";
import "./globals.css";
import { ROOT_METADATA } from "@/lib/constants/metadata"; 
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import NextAuthProviders from "../providers/NextAuthProviders";
import FontSwitcher from "@/components/fontswitcher/FontSwitcher";

export const metadata: Metadata = ROOT_METADATA;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <NextAuthProviders>
          <NextIntlClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <FontSwitcher locale={"en"}>{children}</FontSwitcher>
            </ThemeProvider>
          </NextIntlClientProvider>
        </NextAuthProviders>
      </body>
    </html>
  );
}
