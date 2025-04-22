import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { EncyclopediaProvider } from "@/contexts/EncyclopediaContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "寶可夢與數碼寶貝圖鑑",
  description: "探索寶可夢與數碼寶貝的綜合圖鑑",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <EncyclopediaProvider>
          {children}
        </EncyclopediaProvider>
      </body>
    </html>
  );
}
