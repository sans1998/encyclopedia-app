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
        {children}
        
        {/* 頁腳 */}
        <footer className="py-6 bg-gray-800 text-gray-300">
          <div className="container mx-auto px-4 text-center text-sm">
            <p>寶可夢 × 數碼寶貝圖鑑 &copy; {new Date().getFullYear()}</p>
            <p className="mt-2">
              本網站僅供教育和娛樂目的使用。寶可夢與數碼寶貝及其各自商標和圖像的所有權歸各自所有者所有。
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
