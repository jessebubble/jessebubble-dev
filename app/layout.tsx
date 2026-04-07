import type { Metadata, Viewport } from "next";
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
    "Find your people. Build your future. San Antonio native and software developer bridging creativity and technical execution.",
  keywords: [
    "jessebubble",
    "developer",
    "portfolio",
    "San Antonio",
    "software engineer",
    "web developer",
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
      "Find your people. Build your future. San Antonio native and software developer bridging creativity and technical execution.",
  },
  twitter: {
    card: "summary_large_image",
    title: "jessebubble — Developer Portfolio",
    description:
      "Find your people. Build your future. San Antonio native and software developer bridging creativity and technical execution.",
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
      className={`${GeistMono.variable} ${GeistPixelSquare.variable} ${GeistPixelGrid.variable} ${GeistPixelCircle.variable} ${GeistPixelTriangle.variable} ${GeistPixelLine.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">{children}</body>
    </html>
  );
}
