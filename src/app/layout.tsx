import type { Metadata } from "next";
import "@/styles/globals.css";
import SmoothScroller from "@/animation/SmoothScrolling";
import localFont from "next/font/local";
import { ViewTransitions } from "next-view-transitions";

const maisonNeueBlack = localFont({
  src: "../../public/fonts/Maison Neue Black.woff2",
  variable: "--satoshi-font",
  display: "swap",
  weight: '900',
});

const maisonNeueBold = localFont({
  src: "../../public/fonts/Maison Neue Bold.woff2",
  variable: "--cabinetGrotesk-font",
  weight: '500',
  preload: true,
});


const maisonNeueMedium = localFont({
  src: "../../public/fonts/Maison Neue Medium.woff2",
  variable: "--clash-font",
  weight: '400',
  preload: true,
});

export const metadata: Metadata = {
  title: "Zeej Media | زيج",
  description:
    "Zeej Media transforms media production in Saudi Arabia through innovation, visual storytelling, and world-class execution. Trusted by leading brands, we bring ideas to life.",
  keywords: [
    "Zeej Media",
    "زيج",
    "Media Production Saudi",
    "Event Management",
    "Creative Studio",
    "Cinematic Production",
    "Saudi Arabia Media",
    "Visual Storytelling",
    "Digital Experiences"
  ],
  metadataBase: new URL("https://www.zeej.media"),
  openGraph: {
    title: "Zeej Media | زيج",
    description:
      "A creative powerhouse in Saudi Arabia. We craft immersive experiences, cinematic visuals, and high-impact storytelling for the region’s top brands.",
    url: "https://www.zeej.media",
    siteName: "Zeej Media",
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
    title: "Zeej Media | زيج",
    description:
      "Zeej crafts unforgettable stories and experiences for brands across Saudi Arabia and beyond.",
    images: ["/og-cover.jpg"],
    creator: "@zeejmedia", 
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
        <body className={`${maisonNeueBlack.variable} ${maisonNeueBold.variable} ${cabinetGrotesk.variable} zeej`} >

          {children}
          <SmoothScroller />

        </body>
      </ViewTransitions>
    </html>
  );
}
