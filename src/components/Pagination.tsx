import { cn } from '../utils/classNames';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // 計算要顯示的頁碼範圍
  const getPageNumbers = () => {
    const range = [];
    const displayCount = 5; // 總共顯示的頁碼數量
    const sideCount = Math.floor(displayCount / 2); // 當前頁左右各顯示多少頁
    
    let start = Math.max(currentPage - sideCount, 1);
    const end = Math.min(start + displayCount - 1, totalPages);
    
    if (end - start + 1 < displayCount) {
      start = Math.max(end - displayCount + 1, 1);
    }
    
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    
    return range;
  };
  
  const pageNumbers = getPageNumbers();
  
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex justify-center my-8">
      <div className="flex items-center gap-1">
        {/* 上一頁按鈕 */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "p-2 rounded-md",
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-200'
          )}
          aria-label="上一頁"
        >
          &laquo;
        </button>
        
        {/* 第一頁 */}
        {pageNumbers[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className={cn(
                "p-2 rounded-md hover:bg-gray-200",
                currentPage === 1 ? 'bg-blue-500 text-white' : 'text-gray-700'
              )}
            >
              1
            </button>
            
            {/* 省略號 */}
            {pageNumbers[0] > 2 && (
              <span className="p-1 text-gray-500">...</span>
            )}
          </>
        )}
        
        {/* 頁碼 */}
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={cn(
              "p-2 rounded-md",
              currentPage === number
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            )}
          >
            {number}
          </button>
        ))}
        
        {/* 最後一頁 */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {/* 省略號 */}
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="p-1 text-gray-500">...</span>
            )}
            
            <button
              onClick={() => onPageChange(totalPages)}
              className={cn(
                "p-2 rounded-md hover:bg-gray-200",
                currentPage === totalPages ? 'bg-blue-500 text-white' : 'text-gray-700'
              )}
            >
              {totalPages}
            </button>
          </>
        )}
        
        {/* 下一頁按鈕 */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "p-2 rounded-md",
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-200'
          )}
          aria-label="下一頁"
        >
          &raquo;
        </button>
      </div>
    </div>
  );
} 