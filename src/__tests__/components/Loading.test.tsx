import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '@/components/Loading';

describe('Loading Component', () => {
  test('renders loading component with default props', () => {
    render(<Loading />);
    
    // 檢查是否有一個帶有 'animate-spin' 類的元素
    const spinnerElement = document.querySelector('.animate-spin');
    expect(spinnerElement).toBeInTheDocument();
  });

  test('renders with custom size', () => {
    render(<Loading size="large" />);
    
    // 檢查是否有一個帶有 'w-12 h-12' 類的元素 (large size)
    const largeSpinnerElement = document.querySelector('.w-12.h-12');
    expect(largeSpinnerElement).toBeInTheDocument();
  });

  test('renders with custom variant', () => {
    render(<Loading variant="secondary" />);
    
    // 檢查是否有一個帶有 'border-gray-300' 類的元素 (secondary variant)
    const secondarySpinnerElement = document.querySelector('.border-gray-300');
    expect(secondarySpinnerElement).toBeInTheDocument();
  });

  test('renders with custom className', () => {
    const customClass = 'custom-loading-class';
    render(<Loading className={customClass} />);
    
    // 檢查是否有一個帶有自訂類的元素
    const customSpinnerElement = document.querySelector(`.${customClass}`);
    expect(customSpinnerElement).toBeInTheDocument();
  });

  test('renders full page loading overlay', () => {
    render(<Loading fullPage />);
    
    // 檢查是否有一個帶有 'fixed inset-0' 類的元素，表示全頁面覆蓋
    const overlayElement = document.querySelector('.fixed.inset-0');
    expect(overlayElement).toBeInTheDocument();
  });

  test('renders with loading text', () => {
    const loadingText = '載入中...';
    render(<Loading text={loadingText} />);
    
    // 檢查文字是否正確顯示
    expect(screen.getByText(loadingText)).toBeInTheDocument();
  });
}); 