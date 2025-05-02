import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailView from '@/components/DetailView';

// 定義 Image 屬性類型
interface ImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  style?: React.CSSProperties;
  className?: string;
  loading?: 'eager' | 'lazy';
  sizes?: string;
  priority?: boolean;
  placeholder?: string;
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

// 模擬 next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('DetailView Component', () => {
  const mockProps = {
    name: '皮卡丘',
    image: '/images/pikachu.png',
    types: ['electric'],
    description: '會釋放電擊的寶可夢',
    stats: [
      { name: '攻擊力', value: 55, maxValue: 100 },
      { name: '防禦力', value: 40, maxValue: 100 },
    ],
    attributes: {
      身高: '0.4 m',
      體重: '6.0 kg',
      特性: '靜電',
    },
  };

  test('renders with required props', () => {
    render(
      <DetailView 
        name={mockProps.name} 
        image={mockProps.image} 
        types={mockProps.types} 
      />
    );
    
    // 檢查必要元素是否存在
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByAltText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText(mockProps.types[0])).toBeInTheDocument();
  });

  test('renders description when provided', () => {
    render(
      <DetailView 
        name={mockProps.name} 
        image={mockProps.image} 
        types={mockProps.types}
        description={mockProps.description}
      />
    );
    
    // 檢查描述是否存在
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });

  test('renders stats when provided', () => {
    render(
      <DetailView 
        name={mockProps.name} 
        image={mockProps.image} 
        types={mockProps.types}
        stats={mockProps.stats}
      />
    );
    
    // 檢查標題和統計數據是否存在
    expect(screen.getByText('數據統計')).toBeInTheDocument();
    expect(screen.getByText(mockProps.stats[0].name)).toBeInTheDocument();
    expect(screen.getByText(`${mockProps.stats[0].value}/${mockProps.stats[0].maxValue}`)).toBeInTheDocument();
    expect(screen.getByText(mockProps.stats[1].name)).toBeInTheDocument();
  });

  test('renders attributes when provided', () => {
    render(
      <DetailView 
        name={mockProps.name} 
        image={mockProps.image} 
        types={mockProps.types}
        attributes={mockProps.attributes}
      />
    );
    
    // 檢查標題和屬性是否存在
    expect(screen.getByText('屬性')).toBeInTheDocument();
    
    // 檢查每個屬性
    Object.entries(mockProps.attributes).forEach(([key, value]) => {
      expect(screen.getByText(key)).toBeInTheDocument();
      expect(screen.getByText(String(value))).toBeInTheDocument();
    });
  });

  test('renders with custom className', () => {
    const customClass = 'custom-detail-class';
    render(
      <DetailView 
        name={mockProps.name} 
        image={mockProps.image} 
        types={mockProps.types}
        className={customClass}
      />
    );
    
    // 由於 Card 包裝了 DetailView，我們需要檢查類名是否被傳遞給了 Card
    const detailViewElement = document.querySelector(`.${customClass}`);
    expect(detailViewElement).toBeInTheDocument();
  });
}); 