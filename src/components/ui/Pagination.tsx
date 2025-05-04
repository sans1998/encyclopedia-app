'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/classNames';

interface PaginationProps {
  className?: string;
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  baseUrl?: string;
  disabled?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  className,
  currentPage,
  totalPages,
  onPageChange,
  baseUrl,
  disabled = false,
}) => {
  const router = useRouter();

  // 如果只有一頁，則不顯示分頁
  if (totalPages <= 1) {
    return null;
  }

  // 處理頁面變更
  const handlePageChange = (page: number) => {
    if (disabled) return;
    
    if (baseUrl) {
      // 如果提供了 baseUrl，使用路由導航
      router.push(`${baseUrl}?page=${page}`);
    } else if (onPageChange) {
      // 否則使用回調函數
      onPageChange(page);
    }
  };

  // 計算要顯示的頁碼範圍
  const getPageNumbers = () => {
    // 始終顯示當前頁碼和其前後兩頁
    const range = 2;
    const pages = [];

    // 起始頁碼
    let start = Math.max(1, currentPage - range);
    // 結束頁碼
    let end = Math.min(totalPages, currentPage + range);

    // 調整起始頁碼，保證顯示足夠的頁碼
    if (currentPage - range < 1) {
      end = Math.min(totalPages, end + (1 - (currentPage - range)));
    }

    // 調整結束頁碼，保證顯示足夠的頁碼
    if (currentPage + range > totalPages) {
      start = Math.max(1, start - ((currentPage + range) - totalPages));
    }

    // 添加頁碼
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // 頁碼按鈕樣式
  const pageButtonClass = (page: number) => cn(
    'inline-flex items-center justify-center w-9 h-9 rounded-md text-sm',
    'transition-colors duration-200',
    page === currentPage ? 'bg-blue-500 text-white hover:bg-blue-600' : '',
    page !== currentPage && !disabled ? 'bg-white text-gray-700 hover:bg-gray-100' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  );

  // 上一頁/下一頁按鈕樣式
  const navButtonClass = cn(
    'inline-flex items-center justify-center px-3 h-9 rounded-md text-sm',
    'transition-colors duration-200',
    !disabled ? 'bg-white text-gray-700 hover:bg-gray-100' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  );

  return (
    <div className={cn('flex items-center justify-center space-x-2 mt-12 mb-16', className)}>
      {/* 上一頁按鈕 */}
      <button
        aria-label="上一頁"
        className={navButtonClass}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1 || disabled}
      >
        {"<"}
      </button>

      {/* 第一頁（如果不在顯示範圍內） */}
      {pageNumbers[0] > 1 && (
        <>
          <button
            className={pageButtonClass(1)}
            onClick={() => handlePageChange(1)}
            disabled={disabled}
          >
            1
          </button>
          {pageNumbers[0] > 2 && <span className="text-gray-500">...</span>}
        </>
      )}

      {/* 頁碼按鈕 */}
      {pageNumbers.map(page => (
        <button
          key={page}
          className={pageButtonClass(page)}
          onClick={() => handlePageChange(page)}
          disabled={disabled}
        >
          {page}
        </button>
      ))}

      {/* 最後一頁（如果不在顯示範圍內） */}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="text-gray-500">...</span>
          )}
          <button
            className={pageButtonClass(totalPages)}
            onClick={() => handlePageChange(totalPages)}
            disabled={disabled}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* 下一頁按鈕 */}
      <button
        aria-label="下一頁"
        className={navButtonClass}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages || disabled}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination; 