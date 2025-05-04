import { Suspense } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import CreatureCard from '@/components/CreatureCard';
import Pagination from '@/components/Pagination';
import Loading from '@/components/Loading';
import { Digimon, SimpleDigimon } from '@/types';
import { EnhancedDigimonListItem } from '@/services/digimonService';
import Footer from '@/components/Footer';

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
      throw new Error('加載數碼寶貝數據失敗');
    }
    
    return res.json();
  } catch (error) {
    console.error('獲取數碼寶貝數據時出錯:', error);
    throw error;
  }
}

// 根據數碼寶貝屬性獲取背景顏色
function getAttributeBackgroundColor(digimon: Digimon | SimpleDigimon | EnhancedDigimonListItem) {
  // 檢查是否有增強型屬性
  if ('primaryAttribute' in digimon && digimon.primaryAttribute) {
    const primaryAttribute = digimon.primaryAttribute.toLowerCase();
    const attributeColors: Record<string, string> = {
      vaccine: 'from-blue-100 to-blue-200',
      virus: 'from-purple-100 to-purple-200',
      data: 'from-green-100 to-green-200',
      free: 'from-yellow-50 to-yellow-200',
      unknown: 'from-gray-100 to-gray-200'
    };
    
    return attributeColors[primaryAttribute] || 'from-blue-100 to-blue-200';
  }
  
  // 如果是完整Digimon對象
  if ('attributes' in digimon && digimon.attributes && digimon.attributes.length > 0) {
    const primaryAttribute = digimon.attributes[0].attribute.toLowerCase();
    const attributeColors: Record<string, string> = {
      vaccine: 'from-blue-100 to-blue-200',
      virus: 'from-purple-100 to-purple-200',
      data: 'from-green-100 to-green-200',
      free: 'from-yellow-50 to-yellow-200',
      unknown: 'from-gray-100 to-gray-200'
    };
    
    return attributeColors[primaryAttribute] || 'from-blue-100 to-blue-200';
  }
  
  // 默認顏色
  return 'from-blue-100 to-blue-200';
}

// 獲取圖片URL
function getImageUrl(digimon: Digimon | SimpleDigimon | EnhancedDigimonListItem) {
  if ('image' in digimon && digimon.image) {
    // SimpleDigimon 或 EnhancedDigimonListItem 格式
    return digimon.image;
  } else if ('images' in digimon && digimon.images && digimon.images.length > 0) {
    // 完整 Digimon 格式
    return digimon.images[0]?.href || '';
  }
  return '';
}

// 獲取數碼寶貝的標籤（等級和屬性）
function getDigimonTags(digimon: Digimon | SimpleDigimon | EnhancedDigimonListItem) {
  const tags: string[] = [];
  
  // 檢查增強型列表項的主要等級和屬性
  if ('primaryLevel' in digimon && digimon.primaryLevel) {
    tags.push(digimon.primaryLevel);
  }
  
  if ('primaryAttribute' in digimon && digimon.primaryAttribute) {
    tags.push(digimon.primaryAttribute);
  }
  
  // 檢查完整Digimon對象的等級和屬性
  if ('levels' in digimon && digimon.levels && digimon.levels.length > 0) {
    tags.push(digimon.levels[0].level);
  }
  
  if ('attributes' in digimon && digimon.attributes && digimon.attributes.length > 0) {
    tags.push(digimon.attributes[0].attribute);
  }
  
  // 如果仍然沒有標籤，添加默認值
  if (tags.length === 0) {
    tags.push('數碼寶貝');
  }
  
  return tags;
}

// 數碼寶貝列表組件
function DigimonList({ digimonList, currentPage, totalPages }: { 
  digimonList: EnhancedDigimonListItem[],
  currentPage: number,
  totalPages: number
}) {
  return (
    <>
      <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {digimonList.map(digimon => {
          const backgroundGradient = getAttributeBackgroundColor(digimon);
          const imageUrl = getImageUrl(digimon);
          const types = getDigimonTags(digimon);
          
          return (
            <Link 
              key={digimon.id} 
              href={`/digimon/${digimon.id}`}
              className="block transform transition hover:scale-105"
            >
              <CreatureCard 
                name={digimon.name}
                image={imageUrl}
                types={types}
                id={digimon.id}
                category="數碼寶貝"
                className={`bg-gradient-to-br ${backgroundGradient}`}
                typeColorMap="digimon"
              />
            </Link>
          );
        })}
      </div>
      
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl="/digimon"
      />
    </>
  );
}

// 錯誤顯示組件
function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="text-center text-red-500 p-8 bg-red-50 rounded-lg">
      <p>{message}</p>
      <Link 
        href="/digimon"
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 inline-block"
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
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  
  try {
    // 獲取數碼寶貝數據
    const { digimonList, totalPages } = await getDigimonPageData(currentPage);
    
    if (!digimonList || digimonList.length === 0) {
      return <ErrorDisplay message="無法獲取數碼寶貝數據" />;
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            數碼寶貝圖鑑
          </h1>
          
          <Suspense fallback={<Loading />}>
            <DigimonList 
              digimonList={digimonList} 
              currentPage={currentPage} 
              totalPages={totalPages} 
            />
          </Suspense>
        </main>
        
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('渲染數碼寶貝頁面時出錯:', error);
    return <ErrorDisplay message="加載數碼寶貝數據時出錯" />;
  }
} 