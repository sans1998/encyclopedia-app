import React from 'react';
import { cn } from '@/utils/classNames';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  bgGradient?: string; // 背景漸變顏色
  hideHeader?: boolean;
  hideFooter?: boolean;
}

/**
 * 主佈局組件
 * 包含頁首、內容區和頁尾
 * 支援自定義背景、隱藏頁首頁尾等功能
 */
const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className,
  bgGradient,
  hideHeader = false,
  hideFooter = false,
}) => {
  // 構建基礎類名
  const baseClassName = cn(
    'min-h-screen flex flex-col',
    // 如果提供了背景漸變，添加相應的類
    bgGradient && `bg-gradient-to-b ${bgGradient}`,
    className
  );

  return (
    <div className={baseClassName}>
      {!hideHeader && <Header />}
      <main className="flex-grow">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default MainLayout; 