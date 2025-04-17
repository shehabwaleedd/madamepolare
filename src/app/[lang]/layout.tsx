import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { createClient } from "@/prismicio";
import { getFullLocale } from "@/utils/localeUtils";
import { notFound } from "next/navigation";
import SmoothScroller from "@/animation/SmoothScrolling";
import localFont from "next/font/local";
import Navbar from "@/components/navbar";

const maisonNeueBlack = localFont({
  src: "../../../public/fonts/CabinetGrotesk-Variable.woff2",
  variable: "--maisonNeueBlack-font",
  display: "swap",
  preload: true,
});

const maisonNeueBold = localFont({
  src: "../../../public/fonts/Maison Neue Bold.woff2",
  variable: "--maisonNeueBold-font",
  weight: "700",
  preload: true,
  display: "swap",
});

const maisonNeueMedium = localFont({
  src: "../../../public/fonts/Maison Neue Medium.woff2",
  variable: "--maisonNeueMedium-font",
  weight: "400",
  preload: true,
  display: "swap",
});

const maisonNeueLight = localFont({
  src: "../../../public/fonts/Maison Neue Light.woff2",
  variable: "--maisonNeueLight-font",
  weight: "300",
  preload: true,
  display: "swap",
});

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const client = createClient();
  const fullLocale = getFullLocale(params.lang);
  const page = await client.getSingle("home", { lang: fullLocale }).catch(() => null);

  if (!page) return notFound();

  return {
    title: page.data.meta_title || "Madamepolare Agency",
    description: page.data.meta_description || "Default fallback description",
    metadataBase: new URL("https://www.madamepolare.com"),
    openGraph: {
      title: page.data.meta_title || "Madamepolare Agency",
      description: page.data.meta_description || "Default fallback description",
      url: "https://www.madamepolare.com",
      siteName: "Madamepolare Agency",
      type: "website",
      images: [
        {
          url: page.data.meta_image?.url || "/og-cover.webp",
          width: 1200,
          height: 630,
          alt: page.data.meta_title || "Madamepolare",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.data.meta_title || "Madamepolare Agency",
      description: page.data.meta_description || "Default fallback description",
      images: [page.data.meta_image?.url || "/og-cover.jpg"],
      creator: "@madamepolare",
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
      shortcut: "/favicon-32x32.png",
    },
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <ViewTransitions>
        <body
          className={`${maisonNeueBlack.variable} ${maisonNeueBold.variable} ${maisonNeueMedium.variable} ${maisonNeueLight.variable}`}
        >
          <Navbar />
          {children}
          <SmoothScroller />
        </body>
      </ViewTransitions>
    </html>
  );
}
