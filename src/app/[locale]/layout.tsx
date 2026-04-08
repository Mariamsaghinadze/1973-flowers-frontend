import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import "./globals.css";
import styles from "./layout.module.css";
import Providers from "./providers";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "1973 Flowers",
  description:
    "1973 Flowers is a flower delivery service based in Tbilisi, Georgia. We offer a wide variety of fresh flowers and bouquets for all occasions, delivered right to your doorstep.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: "en" | "ka" }>;
}>) {
  const { locale } = await params;

  return (
    <html lang="en">
      <head>
        <title>1973 FLOWERS</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta property="og:title" content="1973 Flowers" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://1973flowers.ge" />
        <meta
          property="og:description"
          content="Vet services at your doorstep, currently covering Tbilisi, Georgia."
        />
        <meta property="og:image" content="/banner.jpg" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <NextIntlClientProvider locale={locale}>
            <div className={styles.mainDiv}>
              <Header />
              {children}
              {/* <FooterSection /> */}
            </div>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
