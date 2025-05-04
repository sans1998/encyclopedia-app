'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '../utils/classNames';
import Container from './Container';
import Image from 'next/image';

interface HeaderProps {
  className?: string;
}

const SWITCH_OPTIONS = [
  { label: 'Pokemon', path: '/pokemon', logo: '/pokemon_logo.svg', color: 'bg-yellow-500' },
  { label: 'Digimon', path: '/digimon', logo: '/digimon_logo.svg', color: 'bg-blue-500' },
];

const Header: React.FC<HeaderProps> = ({ className }) => {
  const pathname = usePathname() || '';
  const router = useRouter();

  // Determine active index: default to 0
  const activeIndex = SWITCH_OPTIONS.findIndex(opt => pathname.startsWith(opt.path));
  const currentIndex = activeIndex >= 0 ? activeIndex : 0;

  const handleToggle = (index: number) => {
    router.push(SWITCH_OPTIONS[index].path);
  };

  return (
    <header className={cn('bg-gray-400 sticky top-0 z-10 rounded-b-4xl', className)}>
      <Container>
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Link href="/">
                <Image
                  src={SWITCH_OPTIONS[currentIndex].logo}
                  alt={`${SWITCH_OPTIONS[currentIndex].label} Logo`}
                  width={150}
                  height={60}
                  priority
                />
            </Link>
          </div>

          <nav>
            <div className="relative inline-flex items-center p-1 bg-gray-600 rounded-full">
              {SWITCH_OPTIONS.map((option, idx) => (
                <button
                  key={option.label}
                  onClick={() => handleToggle(idx)}
                  className={cn(
                    'relative z-10 flex items-center px-4 py-2 text-sm font-medium rounded-full transition-colors',
                    currentIndex === idx ? 'text-white' : 'text-gray-400'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
