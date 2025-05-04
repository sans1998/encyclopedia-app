import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { EncyclopediaProvider } from "@/contexts/EncyclopediaContext";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '寶可夢和數碼寶貝百科全書',
  description: '探索寶可夢和數碼寶貝的完整百科全書，包含詳細資料、圖片和技能信息。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        <EncyclopediaProvider>
          {children}
        </EncyclopediaProvider>
      </body>
    </html>
  );
}
