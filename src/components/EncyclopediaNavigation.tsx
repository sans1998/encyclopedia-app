'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/classNames';
import { encyclopediaTypes, encyclopediaPathMap } from '@/utils/constants';
import { useEncyclopedia } from '@/contexts/EncyclopediaContext';

export default function EncyclopediaNavigation() {
  const pathname = usePathname();
  const { currentType, setCurrentType, resetState } = useEncyclopedia();

  // 確定當前路徑所對應的百科全書類型
  const handleNavigation = (type: string) => {
    setCurrentType(type);
    resetState();
  };

  return (
    <nav className="mb-6">
      <ul className="flex space-x-4 border-b">
        <li>
          <Link 
            href={encyclopediaPathMap[encyclopediaTypes.POKEMON]} 
            className={cn(
              "inline-block px-4 py-2 text-sm font-medium",
              currentType === encyclopediaTypes.POKEMON || pathname.startsWith('/pokemon')
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
            onClick={() => handleNavigation(encyclopediaTypes.POKEMON)}
          >
            寶可夢
          </Link>
        </li>
        <li>
          <Link 
            href={encyclopediaPathMap[encyclopediaTypes.DIGIMON]} 
            className={cn(
              "inline-block px-4 py-2 text-sm font-medium",
              currentType === encyclopediaTypes.DIGIMON || pathname.startsWith('/digimon')
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
            onClick={() => handleNavigation(encyclopediaTypes.DIGIMON)}
          >
            數碼寶貝
          </Link>
        </li>
      </ul>
    </nav>
  );
} 