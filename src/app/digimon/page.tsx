import { Suspense } from 'react';
import Link from 'next/link';
import { DigimonList, Loading } from '@/components';
import { errorMessages, cssClasses, encyclopediaPathMap, encyclopediaTypes } from '@/utils/constants';

// 從 API 獲取數碼寶貝數據
async function getDigimonPageData(page: number) {
  try {
    // 修復 URL 解析問題，使用絕對 URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
                   (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
    
    const res = await fetch(`${baseUrl}/api/digimon/page?page=${page}`, {
      // 不緩存數據，確保每次都是最新的
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error(errorMessages.LOAD_DIGIMON_FAILED);
    }
    
    return res.json();
  } catch (error) {
    console.error('獲取數碼寶貝數據時出錯:', error);
    throw error;
  }
}

// 錯誤顯示組件
function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className={cssClasses.errorBox}>
      <p>{message}</p>
      <Link 
        href={encyclopediaPathMap[encyclopediaTypes.DIGIMON]}
        className={cssClasses.returnButton}
      >
        返回主頁
      </Link>
    </div>
  );
}

// 主頁面組件 - 使用 server component
export default async function DigimonPage({
  searchParams
}: {
  searchParams: { page?: string }
}) {
  const {page = '1'} = await searchParams;
  const currentPage = parseInt(page) ;
  
  try {
    // 獲取數碼寶貝數據
    const initialData = await getDigimonPageData(currentPage);
    
    if (!initialData.digimonList || initialData.digimonList.length === 0) {
      return <ErrorDisplay message={errorMessages.NO_DIGIMON_DATA} />;
    }

    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          數碼寶貝圖鑑
        </h1>
        
        <Suspense fallback={<Loading />}>
          <DigimonList 
            initialData={initialData} 
            initialPage={currentPage} 
          />
        </Suspense>
      </main>
    );
  } catch (error) {
    console.error('渲染數碼寶貝頁面時出錯:', error);
    return <ErrorDisplay message={errorMessages.LOAD_DIGIMON_FAILED} />;
  }
} 