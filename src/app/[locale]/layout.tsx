import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageWrapper } from "@/components/layout/PageWrapper";

const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Great Harvest Ministries",
    default: "Great Harvest Ministries | Where Heaven Meets Earth",
  },
  description: "Spirit-led. Mission-conscious. Kingdom-minded. The official website of Great Harvest Ministries Moscow.",
  metadataBase: new URL("https://ghministries.com"),
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  alternates: {
    languages: {
      'en': '/en',
      'ru': '/ru',
    },
  },
  openGraph: {
    title: "Great Harvest Ministries | Where Heaven Meets Earth",
    description: "Spirit-led. Mission-conscious. Kingdom-minded.",
    url: "https://ghministries.com",
    siteName: "Great Harvest Ministries",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Great Harvest Ministries",
    description: "Spirit-led. Mission-conscious. Kingdom-minded.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface-base text-text-primary font-body">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <PageWrapper>
            {children}
          </PageWrapper>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

