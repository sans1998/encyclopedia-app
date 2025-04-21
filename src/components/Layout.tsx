import React from 'react';
import { cn } from '../utils/classNames';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  className,
  hideHeader = false,
  hideFooter = false,
}) => {
  return (
    <div className={cn('min-h-screen flex flex-col', className)}>
      {!hideHeader && <Header />}
      <main className="flex-grow">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout; 