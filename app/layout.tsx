import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare, GeistPixelGrid, GeistPixelCircle, GeistPixelTriangle, GeistPixelLine } from 'geist/font/pixel';
import "./globals.css";

const siteUrl = "https://jessebubble.dev";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "jessebubble — Developer Portfolio",
    template: "%s | jessebubble",
  },
  description:
    "Jesse Hernandez (jessebubble), a full-stack web developer in San Antonio, TX. Designs and builds production Next.js platforms end to end. Founder of DEVSA.",
  keywords: [
    "jessebubble",
    "developer",
    "portfolio",
    "San Antonio",
    "software engineer",
    "web developer",
    "full-stack developer",
    "freelance",
    "React",
    "Next.js",
  ],
  authors: [{ name: "jessebubble", url: siteUrl }],
  creator: "jessebubble",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "jessebubble",
    title: "jessebubble — Developer Portfolio",
    description:
      "Jesse Hernandez (jessebubble), a full-stack web developer in San Antonio, TX. Designs and builds production Next.js platforms end to end. Founder of DEVSA.",
  },
  twitter: {
    card: "summary_large_image",
    title: "jessebubble — Developer Portfolio",
    description:
      "Jesse Hernandez (jessebubble), a full-stack web developer in San Antonio, TX. Designs and builds production Next.js platforms end to end. Founder of DEVSA.",
    creator: "@jessebubble",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{ colorScheme: 'light' }}
      className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} ${GeistPixelGrid.variable} ${GeistPixelCircle.variable} ${GeistPixelTriangle.variable} ${GeistPixelLine.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">{children}</body>
    </html>
  );
}
