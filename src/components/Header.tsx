import React, { useState } from 'react';
import Link from 'next/link';
import { cn } from '../utils/classNames';
import Container from './Container';
import SearchBar from './SearchBar';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={cn('bg-white shadow-sm sticky top-0 z-10', className)}>
      <Container>
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              百科全書
            </Link>
          </div>

          {/* 桌面導航 */}
          <nav className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  首頁
                </Link>
              </li>
              <li>
                <Link href="/pokemon" className="text-gray-600 hover:text-gray-900">
                  寶可夢
                </Link>
              </li>
              <li>
                <Link href="/digimon" className="text-gray-600 hover:text-gray-900">
                  數碼寶貝
                </Link>
              </li>
            </ul>
            
            {/* 搜索欄 */}
            <div className="ml-4 hidden lg:block">
              <SearchBar className="w-64" placeholder="搜索..." />
            </div>
          </nav>

          {/* 移動端菜單按鈕 */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">打開菜單</span>
              {/* 漢堡菜單圖標 */}
              <svg
                className={cn('h-6 w-6', isMenuOpen ? 'hidden' : 'block')}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* 關閉圖標 */}
              <svg
                className={cn('h-6 w-6', isMenuOpen ? 'block' : 'hidden')}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* 移動端導航菜單 */}
      <div className={cn('md:hidden', isMenuOpen ? 'block' : 'hidden')}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            首頁
          </Link>
          <Link
            href="/pokemon"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            寶可夢
          </Link>
          <Link
            href="/digimon"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            數碼寶貝
          </Link>
          
          {/* 移動端搜索欄 */}
          <div className="px-3 py-2">
            <SearchBar placeholder="搜索寶可夢或數碼寶貝..." />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 