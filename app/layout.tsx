import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fishing Diary | Fishinity Pro - The Ultimate Angling Experience",
  description: "Fishinity Pro is a mobile app company that offers a range of features to enhance your angling experience. Record your fishing diary, share your catches with the community, and engage with fellow anglers.",
  metadataBase: new URL("https://www.fishingdiaries.com/"),
  keywords: ["fishing diary", "angler community", "fishinity pro", "record catches", "fishing logs", "angling experience"],
  openGraph: {
    title: "Fishing Diary | Fishinity Pro",
    description: "Record, share, and comment on fishing diaries. The premier platform for modern anglers.",
    url: "https://www.fishingdiaries.com/",
    siteName: "Fishing Diary",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fishing Diary | Fishinity Pro",
    description: "Enhance your angling experience by recording and sharing your fishing journey.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-slate-50 text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}