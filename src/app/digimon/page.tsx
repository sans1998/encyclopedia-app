'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import CreatureCard from '@/components/CreatureCard';
import Pagination from '@/components/Pagination';
import Loading from '@/components/Loading';
import { getDigimonList } from '@/services/digimonService';
import { Digimon } from '@/types';

export default function DigimonPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam) : 1;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [digimonList, setDigimonList] = useState<Digimon[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  
  // 處理頁面變更
  const handlePageChange = (page: number) => {
    router.push(`${pathname}?page=${page}`);
  };
  
  useEffect(() => {
    const fetchDigimon = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 獲取數碼寶貝列表，API使用從0開始的頁碼
        const response = await getDigimonList(currentPage - 1);
        
        setDigimonList(response.content);
        setTotalPages(response.pageable.totalPages);
      } catch (err) {
        console.error('獲取數碼寶貝數據時出錯:', err);
        setError('無法加載數碼寶貝數據。請稍後再試。');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDigimon();
  }, [currentPage]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          數碼寶貝圖鑑
        </h1>
        
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center text-red-500 p-8 bg-red-50 rounded-lg">
            <p>{error}</p>
            <button 
              onClick={() => handlePageChange(currentPage)} 
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              重試
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {digimonList.map(digimon => (
                <CreatureCard 
                  key={digimon.id} 
                  data={digimon}
                  type="digimon"
                />
              ))}
            </div>
            
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
    </div>
  );
} 