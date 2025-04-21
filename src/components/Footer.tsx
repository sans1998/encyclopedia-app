import React from 'react';
import Link from 'next/link';
import { cn } from '../utils/classNames';
import Container from './Container';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn('py-6 bg-gray-100 border-t border-gray-200', className)}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">百科全書應用</h3>
            <p className="text-gray-600">
              這是一個展示寶可夢和數碼寶貝資訊的應用，使用 Next.js 和 Tailwind CSS 構建。
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">導航連結</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-600 hover:underline">
                  首頁
                </Link>
              </li>
              <li>
                <Link href="/pokemon" className="text-blue-600 hover:underline">
                  寶可夢
                </Link>
              </li>
              <li>
                <Link href="/digimon" className="text-blue-600 hover:underline">
                  數碼寶貝
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">關於我們</h3>
            <p className="text-gray-600">
              這是一個示範項目，展示如何使用現代前端技術構建一個響應式網站。
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} 百科全書應用。保留所有權利。</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 