import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '@/components/Pagination';

describe('Pagination 組件', () => {
  const mockOnPageChange = jest.fn();
  
  beforeEach(() => {
    mockOnPageChange.mockClear();
  });
  
  it('在只有一頁時不顯示分頁', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={mockOnPageChange} />
    );
    
    expect(container.firstChild).toBeNull();
  });
  
  it('正確渲染中間分頁', () => {
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} />
    );
    
    // 應該顯示 1, ..., 3, 4, 5, 6, 7, ..., 10
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getAllByText('...').length).toBe(2);
  });
  
  it('正確處理頁面切換', () => {
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} />
    );
    
    // 測試點擊下一頁
    fireEvent.click(screen.getByLabelText('下一頁'));
    expect(mockOnPageChange).toHaveBeenCalledWith(6);
    
    // 測試點擊上一頁
    fireEvent.click(screen.getByLabelText('上一頁'));
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
    
    // 測試點擊特定頁碼
    fireEvent.click(screen.getByText('7'));
    expect(mockOnPageChange).toHaveBeenCalledWith(7);
    
    // 測試點擊第一頁
    fireEvent.click(screen.getByText('1'));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
    
    // 測試點擊最後一頁
    fireEvent.click(screen.getByText('10'));
    expect(mockOnPageChange).toHaveBeenCalledWith(10);
  });
  
  it('在第一頁時禁用上一頁按鈕', () => {
    render(
      <Pagination currentPage={1} totalPages={10} onPageChange={mockOnPageChange} />
    );
    
    const prevButton = screen.getByLabelText('上一頁');
    expect(prevButton).toBeDisabled();
  });
  
  it('在最後一頁時禁用下一頁按鈕', () => {
    render(
      <Pagination currentPage={10} totalPages={10} onPageChange={mockOnPageChange} />
    );
    
    const nextButton = screen.getByLabelText('下一頁');
    expect(nextButton).toBeDisabled();
  });
}); 