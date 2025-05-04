import React from 'react';
import { cn } from '@/utils/classNames';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  bgGradient?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

/**
 * 通用布局組件
 * 支援自定義背景、隱藏頁首頁尾等功能
 */
const Layout: React.FC<LayoutProps> = ({
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

export default Layout; 