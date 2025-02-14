import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AdaWacana - Web3 Commitment Platform",
  description:
    "Transform your goals into charitable impact. Create commitments with ETH stakes - complete them or help charities.",
  keywords: [
    "web3",
    "ethereum",
    "manta",
    "commitment",
    "charity",
    "dapp",
    "goals",
    "self-improvement",
  ],
  authors: [{ name: "emhaihsan" }],
  openGraph: {
    title: "AdaWacana - Web3 Commitment Platform",
    description:
      "Transform your goals into charitable impact. Create commitments with ETH stakes - complete them or help charities.",
    url: "https://adawacana.xyz",
    siteName: "AdaWacana",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AdaWacana - Web3 Commitment Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdaWacana - Web3 Commitment Platform",
    description:
      "Transform your goals into charitable impact. Create commitments with ETH stakes - complete them or help charities.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
