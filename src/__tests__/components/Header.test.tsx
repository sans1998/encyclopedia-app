import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';

// 模擬next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      back: jest.fn(),
    };
  },
  usePathname() {
    return '/';
  },
}));

// 模擬next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  },
}));

describe('Header 組件', () => {
  it('顯示正確的標題和導航鏈接', () => {
    render(<Header />);
    
    // 檢查標題
    expect(screen.getByText('寶可夢 × 數碼寶貝圖鑑')).toBeDefined();
    
    // 檢查導航鏈接
    expect(screen.getByText('寶可夢')).toBeDefined();
    expect(screen.getByText('數碼寶貝')).toBeDefined();
    
    // 檢查鏈接的href屬性
    const pokemonLink = screen.getByText('寶可夢').closest('a');
    const digimonLink = screen.getByText('數碼寶貝').closest('a');
    
    expect(pokemonLink).toHaveAttribute('href', '/pokemon');
    expect(digimonLink).toHaveAttribute('href', '/digimon');
  });
}); 