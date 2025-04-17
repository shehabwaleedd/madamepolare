import type { Metadata } from "next";
import "@/styles/globals.css";
import SmoothScroller from "@/animation/SmoothScrolling";
import localFont from "next/font/local";
import { ViewTransitions } from "next-view-transitions";
import Navbar from "@/components/navbar";

const maisonNeueBlack = localFont({
  src: "../../public/fonts/CabinetGrotesk-Variable.woff2",
  variable: "--maisonNeueBlack-font",
  display: "swap",
  preload: true,
});

const maisonNeueBold = localFont({
  src: "../../public/fonts/Maison Neue Bold.woff2",
  variable: "--maisonNeueBold-font",
  weight: '700',
  preload: true,
  display: "swap",
});


const maisonNeueMedium = localFont({
  src: "../../public/fonts/Maison Neue Medium.woff2",
  variable: "--maisonNeueMedium-font",
  weight: '400',
  preload: true,
  display: "swap",
});

export const metadata: Metadata = {
  title: "Madamepolare Agency",
  description: "Madamepolare transforms media production in Saudi Arabia through innovation, visual storytelling, and world-class execution. Trusted by leading brands, we bring ideas to life.",
  metadataBase: new URL("https://www.madamepolare.com"),
  openGraph: {
    title: "Madamepolare Agency",
    description:
      "A creative powerhouse in Saudi Arabia. We craft immersive experiences, cinematic visuals, and high-impact storytelling for the region’s top brands.",
    url: "https://www.madamepolare.com",
    siteName: "Madamepolare Agency",
    type: "website",
    images: [
      {
        url: "/og-cover.webp",
        width: 1200,
        height: 630,
        alt: "Zeej Media - Cinematic, Immersive, Unforgettable",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Madamepolare Agency",
    description: "Madamepolare transforms media production in Saudi Arabia through innovation, visual storytelling, and world-class execution. Trusted by leading brands, we bring ideas to life.",
    images: ["/og-cover.jpg"],
    creator: "@madamepolare", 
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <ViewTransitions>
        <body className={`${maisonNeueBlack.variable} ${maisonNeueBold.variable} ${maisonNeueMedium.variable}`} >
          <Navbar />
          {children}

          <SmoothScroller />
        </body>
      </ViewTransitions>
    </html>
  );
}
