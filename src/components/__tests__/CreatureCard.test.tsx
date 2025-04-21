import React from 'react';
import { render, screen } from '@testing-library/react';
import CreatureCard from '../CreatureCard';
import { Pokemon, Digimon } from '../../types';

// 模擬next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      back: jest.fn(),
    };
  },
  usePathname() {
    return '';
  },
}));

// 模擬next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // 將fill轉為字符串
    const { fill, ...rest } = props;
    return <img {...rest} fill={fill ? "true" : undefined} data-testid="image" />;
  },
}));

// 模擬next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  },
}));

describe('CreatureCard 組件', () => {
  // 測試寶可夢卡片渲染
  it('正確渲染寶可夢資訊', () => {
    const mockPokemon: Pokemon = {
      id: 1,
      name: 'bulbasaur',
      types: [
        { type: { name: 'grass' } },
        { type: { name: 'poison' } },
      ],
      sprites: {
        front_default: 'test-url.jpg',
        other: {
          'official-artwork': {
            front_default: 'test-artwork-url.jpg',
          }
        }
      },
      height: 7,
      weight: 69,
      abilities: [
        { ability: { name: 'overgrow' } },
        { ability: { name: 'chlorophyll' } },
      ],
      stats: [],
    };

    render(<CreatureCard data={mockPokemon} type="pokemon" />);
    
    // 檢查名稱是否正確渲染
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    
    // 檢查ID是否正確格式化
    expect(screen.getByText('#001')).toBeInTheDocument();
    
    // 檢查類型是否正確渲染
    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.getByText('poison')).toBeInTheDocument();
    
    // 檢查圖片是否顯示
    expect(screen.getByTestId('image')).toHaveAttribute('src', 'test-artwork-url.jpg');
  });

  // 測試數碼寶貝卡片渲染
  it('正確渲染數碼寶貝資訊', () => {
    const mockDigimon: Digimon = {
      id: 1,
      name: 'agumon',
      types: [
        { type: 'vaccine' },
      ],
      images: [
        { href: 'test-digimon-url.jpg' },
      ],
      levels: [
        { level: 'rookie' },
      ],
      attributes: [
        { attribute: 'vaccine' },
      ],
      fields: [
        { field: 'dragon', image: '', id: 1 },
      ],
      descriptions: [
        { language: 'en', description: 'A test description' },
      ],
    };

    render(<CreatureCard data={mockDigimon} type="digimon" />);
    
    // 檢查名稱是否正確渲染
    expect(screen.getByText('agumon')).toBeInTheDocument();
    
    // 檢查ID是否正確格式化
    expect(screen.getByText('#001')).toBeInTheDocument();
    
    // 檢查類型是否正確渲染
    expect(screen.getByText('vaccine')).toBeInTheDocument();
    
    // 檢查圖片是否顯示
    expect(screen.getByTestId('image')).toHaveAttribute('src', 'test-digimon-url.jpg');
  });

  // 測試無圖片場景
  it('當沒有圖片時顯示替代文本', () => {
    const mockPokemonNoImage: Pokemon = {
      id: 1,
      name: 'bulbasaur',
      types: [
        { type: { name: 'grass' } },
      ],
      sprites: {
        front_default: '',
        other: {
          'official-artwork': {
            front_default: '',
          }
        }
      },
      height: 7,
      weight: 69,
      abilities: [],
      stats: [],
    };

    render(<CreatureCard data={mockPokemonNoImage} type="pokemon" />);
    
    // 檢查是否顯示無圖片訊息
    expect(screen.getByText('無圖片')).toBeInTheDocument();
  });
}); 