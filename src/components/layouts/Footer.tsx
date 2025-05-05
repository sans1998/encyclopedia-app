import React from 'react';
import { cn } from '@/utils/classNames';
import {Container} from '@/components';
interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn('py-6 bg-gray-400 border-t  rounded-t-4xl', className)}>
          <Container className="mx-auto px-4 text-center text-sm">
            <p>寶可夢 × 數碼寶貝圖鑑 &copy; {new Date().getFullYear()}</p>
            <p className="mt-2">
              本網站僅供教育和娛樂目的使用。寶可夢與數碼寶貝及其各自商標和圖像的所有權歸各自所有者所有。
            </p>
          </Container>
    </footer>
  );
};

export default Footer; 