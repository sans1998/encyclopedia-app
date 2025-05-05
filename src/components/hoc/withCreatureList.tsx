import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Pagination, Loading } from '@/components';
import { cssClasses, gridConfig } from '@/utils/constants';

interface ListData {
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

interface WithCreatureListProps<T, D extends ListData> {
  initialData: D;
  initialPage: number;
  apiEndpoint: string;
  dataKey: string; // 例如 'pokemonList' 或 'digimonList'
  renderItem: (item: T) => React.ReactNode;
}

export function withCreatureList<T, D extends ListData>() {
  return function CreatureList({
    initialData,
    initialPage,
    apiEndpoint,
    dataKey,
    renderItem
  }: WithCreatureListProps<T, D>) {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    
    async function handlePageChange(page: number) {
      if (page === data.currentPage) return;
      
      setLoading(true);
      router.push(`${pathname}?page=${page}`);
      
      try {
        const response = await fetch(`${apiEndpoint}?page=${page}`);
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const newData = await response.json();
        setData(newData);
      } catch (error) {
        console.error('頁面加載出錯:', error);
      } finally {
        setLoading(false);
      }
    }
    
    // 使用傳入的 dataKey 獲取實際數據列表
    const items = (data[dataKey as keyof typeof data] as unknown) as T[];
    
    return (
      <div className="relative">
        {loading && (
          <div className={cssClasses.loadingOverlay}>
            <Loading />
          </div>
        )}
        
        <div className={gridConfig.default}>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {renderItem(item)}
            </React.Fragment>
          ))}
        </div>
        
        <Pagination 
          currentPage={parseInt(initialPage.toString())}
          totalPages={data.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    );
  };
} 