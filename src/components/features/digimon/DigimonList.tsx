'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
// 用絕對路徑引用UI組件
import {Pagination,Loading} from '@/components';
import { Digimon } from '@/types/digimon';
import { 
  digimonLevelGradients, 
  cssClasses,
  gridConfig
} from '@/utils/constants';

// 根據數碼寶貝等級獲取背景顏色
function getLevelBackgroundColor(level: string) {
  if (!level) return '';
  return digimonLevelGradients[level.toLowerCase()] || 'from-gray-100 to-gray-200';
}

interface DigimonListProps {
  initialData: {
    digimonList: Digimon[];
    totalPages: number;
    currentPage: number;
    totalItems: number;
  };
  initialPage: number;
}

export default function DigimonList({ initialData, initialPage }: DigimonListProps) {
  // 使用初始數據初始化狀態
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // 頁面變化處理函數
  async function handlePageChange(page: number) {
    if (page === data.currentPage) return;
    
    setLoading(true);
    // 更新URL (這會觸發頁面重新獲取，但不會刷新整個頁面)
    router.push(`${pathname}?page=${page}`);
    
    try {
      // 客戶端獲取新頁面數據
      const response = await fetch(`/api/digimon/page?page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error('頁面加載出錯:', error);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="relative">
      {/* 加載中指示器 */}
      {loading && (
        <div className={cssClasses.loadingOverlay}>
          <Loading />
        </div>
      )}
      
      <div className={gridConfig.default}>
        {data.digimonList.map((digimon: Digimon) => {
          // 獲取第一個等級（如果有的話）
          const levelObj = digimon.levels && digimon.levels.length > 0 ? digimon.levels[0] : null;
          const levelName = levelObj ? levelObj.level : '未知';
          const levelBackground = getLevelBackgroundColor(levelName);
          
          // 獲取第一個圖片URL（之後會在 CreatureCard 中使用）
          // const imageUrl = digimon.images && digimon.images.length > 0 ? digimon.images[0].href : '';
          
          return (
            <Link 
              key={digimon.id} 
              href={`/digimon/${digimon.id}`}
              className={cssClasses.cardHover}
            >
              {/* 暫時注釋掉 CreatureCard，等待組件重建 */}
              <div 
                className={`rounded-lg p-4 shadow-md bg-gradient-to-br ${levelBackground}`}
              >
                <div className="text-center">
                  <p className="font-semibold">{digimon.name}</p>
                  <p className="text-sm text-gray-600">ID: {digimon.id}</p>
                  <p className={cssClasses.levelBadge}>
                    {levelName}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      <Pagination 
        currentPage={parseInt(initialPage.toString())}
        totalPages={data.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
} 